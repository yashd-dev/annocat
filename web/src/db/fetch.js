"use server";
import { db } from "./index";
import { auth } from "@/lib/auth";
import { project, capture, user } from "./schema";
import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { url } from "inspector";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers:
      typeof window !== "undefined"
        ? {}
        : await import("next/headers").then((m) => m.headers()),
  });

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  return session.user;
};

/**
 * Fetch all projects for the authenticated user
 * @returns {Promise<Array>} Array of user's projects
 */

export const fetchUserProjects = async () => {
  try {
    const currentUser = await getCurrentUser();

    const projects = await db
      .select({
        id: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        userId: project.userId,
      })
      .from(project)
      .where(eq(project.userId, currentUser.id))
      .orderBy(desc(project.updatedAt));

    return projects;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};

/**
 * Fetch project details by ID with associated captures
 * @param {string} projectId - The ID of the project to fetch
 * @returns {Promise<Object>} Project details with associated captures
 */

export const fetchProjectDetailsById = async (projectId) => {
  try {
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const currentUser = await getCurrentUser();

    // Fetch project details
    const projectDetails = await db
      .select()
      .from(project)
      .where(and(eq(project.id, projectId), eq(project.userId, currentUser.id)))
      .limit(1);

    if (!projectDetails.length) {
      throw new Error("Project not found or access denied");
    }

    // Fetch associated captures
    const captures = await db
      .select()
      .from(capture)
      .where(eq(capture.projectId, projectId))
      .orderBy(desc(capture.createdAt));

    return {
      ...projectDetails[0],
      captures,
    };
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

/**
 * Create a new project
 * @param {Object} projectData - Project data
 * @param {string} projectData.name - Project name
 * @param {string} [projectData.description] - Project description
 * @returns {Promise<Object>} Created project
 */
export const createProject = async (projectData) => {
  try {
    const { name, description } = projectData;

    if (!name || name.trim() === "") {
      throw new Error("Project name is required");
    }

    const currentUser = await getCurrentUser();
    const projectId = nanoid();
    const now = new Date();

    const newProject = {
      id: projectId,
      name: name.trim(),
      description: description?.trim() || null,
      userId: currentUser.id,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(project).values(newProject);

    return newProject;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

/**
 * Update an existing project
 * @param {string} projectId - The ID of the project to update
 * @param {Object} updateData - Data to update
 * @param {string} [updateData.name] - New project name
 * @param {string} [updateData.description] - New project description
 * @returns {Promise<Object>} Updated project
 */
export const updateProject = async (projectId, updateData) => {
  try {
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const currentUser = await getCurrentUser();
    const { name, description } = updateData;
    const payload = { updatedAt: new Date() };

    if (name !== undefined) {
      if (name.trim() === "") {
        throw new Error("Project name cannot be empty");
      }
      payload.name = name.trim();
    }

    if (description !== undefined) {
      payload.description = description?.trim() || null;
    }

    if (Object.keys(payload).length === 1) {
      // Only updatedAt
      throw new Error("No update data provided");
    }

    const result = await db
      .update(project)
      .set(payload)
      .where(and(eq(project.id, projectId), eq(project.userId, currentUser.id)))
      .returning();

    if (!result.length) {
      throw new Error("Project not found or access denied");
    }

    return result[0];
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

/**
 * Delete a project and all associated captures
 * @param {string} projectId - The ID of the project to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteProject = async (projectId) => {
  try {
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const currentUser = await getCurrentUser();

    // Delete project (captures will be deleted automatically due to cascade)
    const result = await db
      .delete(project)
      .where(and(eq(project.id, projectId), eq(project.userId, currentUser.id)))
      .returning();

    if (!result.length) {
      throw new Error("Project not found or access denied");
    }

    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// ==================== CAPTURE OPERATIONS ====================

/**
 * Create a new capture
 * @param {Object} captureData - Capture data
 * @param {string} captureData.projectId - Project ID
 * @param {string} captureData.url - Page URL
 * @param {string} captureData.screenshotUrl - Screenshot URL
 * @param {string} [captureData.pageTitle] - Page title
 * @param {string} [captureData.selector] - CSS selector
 * @param {string} [captureData.notes] - Notes
 * @returns {Promise<Object>} Created capture
 */

export const createCapture = async (captureData) => {
  try {
    const {
      projectId,
      url,
      screenshotUrl,
      pageTitle,
      selector,
      notes,
      favicon,
      filetype,
    } = captureData;

    if (!projectId || !url || !screenshotUrl) {
      throw new Error("Project ID, URL, and screenshot URL are required");
    }

    const currentUser = await getCurrentUser();

    // Verify project ownership
    const projectExists = await db
      .select({ id: project.id })
      .from(project)
      .where(and(eq(project.id, projectId), eq(project.userId, currentUser.id)))
      .limit(1);

    if (!projectExists.length) {
      throw new Error("Project not found or access denied");
    }

    const captureId = nanoid();
    const now = new Date();

    const newCapture = {
      id: captureId,
      projectId,
      url: url.trim(),
      screenshotUrl: screenshotUrl.trim(),
      pageTitle: pageTitle?.trim() || null,
      notes: notes?.trim() || null,
      favicon: favicon?.trim() || null,
      filetype: filetype?.trim() || null,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(capture).values(newCapture);

    return newCapture;
  } catch (error) {
    console.error("Error creating capture:", error);
    throw error;
  }
};

/**
 * Update an existing capture
 * @param {string} captureId - The ID of the capture to update
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated capture
 */
export const updateCapture = async (captureId, updateData) => {
  try {
    if (!captureId) {
      throw new Error("Capture ID is required");
    }

    const currentUser = await getCurrentUser();
    const { url, screenshotUrl, pageTitle, selector, notes } = updateData;
    const payload = { updatedAt: new Date() };

    if (url !== undefined) {
      if (url.trim() === "") {
        throw new Error("URL cannot be empty");
      }
      payload.url = url.trim();
    }

    if (screenshotUrl !== undefined) {
      if (screenshotUrl.trim() === "") {
        throw new Error("Screenshot URL cannot be empty");
      }
      payload.screenshotUrl = screenshotUrl.trim();
    }

    if (pageTitle !== undefined) {
      payload.pageTitle = pageTitle?.trim() || null;
    }

    if (selector !== undefined) {
      payload.selector = selector?.trim() || null;
    }

    if (notes !== undefined) {
      payload.notes = notes?.trim() || null;
    }

    if (Object.keys(payload).length === 1) {
      // Only updatedAt
      throw new Error("No update data provided");
    }

    // Verify capture ownership through project
    const result = await db
      .update(capture)
      .set(payload)
      .where(eq(capture.id, captureId))
      .returning();

    if (!result.length) {
      throw new Error("Capture not found");
    }

    // Verify project ownership
    const projectExists = await db
      .select({ id: project.id })
      .from(project)
      .where(
        and(
          eq(project.id, result[0].projectId),
          eq(project.userId, currentUser.id)
        )
      )
      .limit(1);

    if (!projectExists.length) {
      throw new Error("Access denied");
    }

    return result[0];
  } catch (error) {
    console.error("Error updating capture:", error);
    throw error;
  }
};

/**
 * Delete a capture
 * @param {string} captureId - The ID of the capture to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteCapture = async (captureId) => {
  try {
    if (!captureId) {
      throw new Error("Capture ID is required");
    }

    const currentUser = await getCurrentUser();

    // First get the capture to verify project ownership
    const captureToDelete = await db
      .select({ projectId: capture.projectId })
      .from(capture)
      .where(eq(capture.id, captureId))
      .limit(1);

    if (!captureToDelete.length) {
      throw new Error("Capture not found");
    }

    // Verify project ownership
    const projectExists = await db
      .select({ id: project.id })
      .from(project)
      .where(
        and(
          eq(project.id, captureToDelete[0].projectId),
          eq(project.userId, currentUser.id)
        )
      )
      .limit(1);

    if (!projectExists.length) {
      throw new Error("Access denied");
    }

    // Delete the capture
    const result = await db
      .delete(capture)
      .where(eq(capture.id, captureId))
      .returning();

    if (!result.length) {
      throw new Error("Capture not found");
    }

    return true;
  } catch (error) {
    console.error("Error deleting capture:", error);
    throw error;
  }
};

// ==================== ADDITIONAL UTILITY FUNCTIONS ====================

/**
 * Get captures for a specific project
 * @param {string} projectId - The ID of the project
 * @returns {Promise<Array>} Array of captures
 */
export const fetchCapturesByProjectId = async (projectId) => {
  try {
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const currentUser = await getCurrentUser();

    // Verify project ownership
    const projectExists = await db
      .select({ id: project.id })
      .from(project)
      .where(and(eq(project.id, projectId), eq(project.userId, currentUser.id)))
      .limit(1);

    if (!projectExists.length) {
      throw new Error("Project not found or access denied");
    }

    const captures = await db
      .select()
      .from(capture)
      .where(eq(capture.projectId, projectId))
      .orderBy(desc(capture.createdAt));

    return captures;
  } catch (error) {
    console.error("Error fetching captures:", error);
    throw error;
  }
};

/**
 * Get all captures for all projects of the current user
 * @returns {Promise<Array>} Array of captures with project info
 */
export const fetchAllCapturesForUser = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      throw new Error("User not authenticated");
    }

    // Get all projects for this user
    const userProjects = await db
      .select({ id: project.id, name: project.name })
      .from(project)
      .where(eq(project.userId, currentUser.id));

    if (!userProjects.length) {
      return [];
    }

    const projectIds = userProjects.map((p) => p.id);

    // Get all captures for these projects
    const allCaptures = await db
      .select({
        id: capture.id,
        url: capture.url,
        pageTitle: capture.pageTitle,
        screenshotUrl: capture.screenshotUrl,
        notes: capture.notes,
        url: capture.url,
        favicon: capture.favicon,
        filetype: capture.filetype,
        createdAt: capture.createdAt,
        projectId: capture.projectId,
        projectName: project.name,
      })
      .from(capture)
      .innerJoin(project, eq(capture.projectId, project.id))
      .where(eq(project.userId, currentUser.id))
      .orderBy(desc(capture.createdAt));

    return allCaptures;
  } catch (error) {
    console.error("Error fetching all captures for user:", error);
    throw error;
  }
};
