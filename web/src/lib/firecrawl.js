"use server";

import FirecrawlApp from "@mendable/firecrawl-js";
import { createCapture } from "@/db/fetch";
import { getCurrentUser } from "@/db/fetch";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API });

const mimeMap = {
  // Documents
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "doc",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xls",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "ppt",

  // Images (all condensed to jpg for previews)
  "image/jpeg": "jpg",
  "image/png": "jpg",
  "image/gif": "jpg",
  "image/webp": "jpg",
  "image/bmp": "jpg",
  "image/tiff": "jpg",
  "image/svg+xml": "jpg",

  // Plain / structured text
  "text/plain": "txt",
  "text/csv": "txt",
  "text/markdown": "txt",
  "application/json": "txt",
  "application/xml": "txt",
  "text/xml": "txt",
  "text/html": "webpage", // Will be handled separately
  "application/xhtml+xml": "webpage",

  // Archives
  "application/zip": "zip",
  "application/x-rar-compressed": "rar",
  "application/x-7z-compressed": "zip",
  "application/x-tar": "zip",
  "application/gzip": "zip",

  // Audio (all condensed to mp3 for previews)
  "audio/mpeg": "mp3",
  "audio/wav": "mp3",
  "audio/ogg": "mp3",
  "audio/webm": "mp3",
  "audio/aac": "mp3",
  "audio/flac": "mp3",

  // Video (all condensed to mp4 for previews)
  "video/mp4": "mp4",
  "video/webm": "mp4",
  "video/ogg": "mp4",
  "video/x-msvideo": "mp4",
  "video/quicktime": "mp4",
};

const webpageTypes = ["text/html", "application/xhtml+xml", "application/xml"];

function cleanJsonString(str) {
  // Remove ```json ... ``` or ``` ... ```
  return str
    .replace(/```json?/, "")
    .replace(/```$/, "")
    .trim();
}

async function getMimeType(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    let type = res.headers.get("content-type");
    if (!type) return "misc";

    type = type.split(";")[0].trim().toLowerCase();

    if (webpageTypes.includes(type)) {
      return "webpage";
    }

    return mimeMap[type] || "misc";
  } catch (err) {
    console.error("Error fetching MIME type:", err);
    return "misc";
  }
}

export async function addCaptureFromUrl(url, projectId) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  if (!url || !projectId) throw new Error("Missing URL or projectId");

  const filetype = await getMimeType(url);

  let screenshotUrl = null;
  let pageTitle = null;
  let notes = null;
  let favicon = null;

  if (filetype === "webpage") {
    const scrapeResult = await app.scrapeUrl(url, { formats: [] });
    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    screenshotUrl = scrapeResult.metadata?.ogImage || null;
    pageTitle = scrapeResult.metadata?.ogTitle || null;
    notes = scrapeResult.metadata?.ogDescription || null;
    favicon = scrapeResult.metadata?.favicon || null;
  } else {
    // Non-webpage: use Gemini to analyze the file URL
    const model = google("gemini-2.5-flash", {
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const prompt = `
You are a content extractor. Given this file URL: ${url} please analyze it and return ONLY a JSON object with the following keys:

{
  "title": "The document title (mandatory)",
  "description": "Short description or empty string (optional)"
}

Do NOT include any explanations, code, or anything else. ONLY output valid JSON.
    `;

    const { text } = await generateText({
      model,
      prompt,
      maxTokens: 256,
      temperature: 0,
    });

    try {
      const cleanText = cleanJsonString(text);
      const parsed = JSON.parse(cleanText);
      pageTitle = parsed.title || null;
      notes = parsed.description || null;
    } catch {
      pageTitle = text.trim();
    }

    screenshotUrl = `/preview/${filetype}.png`;
  }

  // Save capture to DB
  const capture = await createCapture({
    projectId,
    url,
    screenshotUrl,
    pageTitle,
    notes,
    favicon,
    filetype,
  });

  return capture;
}
