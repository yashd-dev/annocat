"use server";

import FirecrawlApp from "@mendable/firecrawl-js";
import { createCapture } from "@/db/fetch";
import { getCurrentUser } from "@/db/fetch";

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API });

export async function addCaptureFromUrl(url, projectId) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  if (!url || !projectId) throw new Error("Missing URL or projectId");

  // Scrape the website
  const scrapeResult = await app.scrapeUrl(url, {
    formats: [],
  });
  if (!scrapeResult.success) {
    throw new Error(`Failed to scrape: ${scrapeResult.error}`);
  }
  console.log(scrapeResult);

  // Save capture to DB
  const capture = await createCapture({
    projectId,
    url,
    screenshotUrl: scrapeResult.metadata.ogImage,
    pageTitle: scrapeResult.metadata.ogTitle,
    notes: scrapeResult.metadata.ogDescription,
  });

  return capture;
}
