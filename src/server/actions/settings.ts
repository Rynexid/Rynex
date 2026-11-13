"use server";

import { eq, desc, and, count } from "drizzle-orm";

import { db } from "@lib/db";
import { customerProfiles, workspaces, apiKeys } from "@lib/db";
import { auth } from "@lib/auth";

export interface SettingsResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function getUserProfile(): Promise<SettingsResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const profile = await db
      .select()
      .from(customerProfiles)
      .where(eq(customerProfiles.userId, session.user.id))
      .limit(1);

    const userWorkspaces = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.userId, session.user.id))
      .orderBy(desc(workspaces.createdAt));

    const userApiKeys = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.userId, session.user.id))
      .orderBy(desc(apiKeys.createdAt));

    return {
      success: true,
      data: {
        profile: profile[0] || null,
        workspaces: userWorkspaces,
        apiKeys: userApiKeys,
      },
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, error: "Failed to fetch user profile" };
  }
}

export async function updateUserProfile(data: {
  company?: string;
  phone?: string;
  timezone?: string;
  preferredLanguage?: string;
}): Promise<SettingsResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const existing = await db
      .select()
      .from(customerProfiles)
      .where(eq(customerProfiles.userId, session.user.id))
      .limit(1);

    if (existing[0]) {
      const updated = await db
        .update(customerProfiles)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(customerProfiles.userId, session.user.id))
        .returning();
      return { success: true, data: updated[0] };
    } else {
      const created = await db
        .insert(customerProfiles)
        .values({ userId: session.user.id, ...data })
        .returning();
      return { success: true, data: created[0] };
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Failed to update user profile" };
  }
}

export interface WorkspaceResult {
  success: boolean;
  data?: any[];
  error?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export async function getWorkspaces(
  page = 1,
  pageSize = 10,
): Promise<WorkspaceResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const [allWorkspaces, totalResult] = await Promise.all([
      db
        .select()
        .from(workspaces)
        .where(eq(workspaces.userId, session.user.id))
        .orderBy(desc(workspaces.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db
        .select({ count: count() })
        .from(workspaces)
        .where(eq(workspaces.userId, session.user.id)),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allWorkspaces,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return { success: false, error: "Failed to fetch workspaces" };
  }
}

export async function createWorkspace(data: {
  name: string;
}): Promise<WorkspaceResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const newWorkspace = await db
      .insert(workspaces)
      .values({
        userId: session.user.id,
        name: data.name,
      } as any)
      .returning();
    return { success: true, data: newWorkspace };
  } catch (error) {
    console.error("Error creating workspace:", error);
    return { success: false, error: "Failed to create workspace" };
  }
}

export async function updateWorkspace(
  id: number,
  data: Partial<{
    name: string;
  }>,
): Promise<WorkspaceResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const updatedWorkspace = await db
      .update(workspaces)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(workspaces.id, id), eq(workspaces.userId, session.user.id)))
      .returning();
    if (!updatedWorkspace[0]) {
      return { success: false, error: "Workspace not found" };
    }
    return { success: true, data: updatedWorkspace };
  } catch (error) {
    console.error("Error updating workspace:", error);
    return { success: false, error: "Failed to update workspace" };
  }
}

export async function deleteWorkspace(id: number): Promise<WorkspaceResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await db
      .delete(workspaces)
      .where(
        and(eq(workspaces.id, id), eq(workspaces.userId, session.user.id)),
      );
    return { success: true };
  } catch (error) {
    console.error("Error deleting workspace:", error);
    return { success: false, error: "Failed to delete workspace" };
  }
}

export interface ApiKeyResult {
  success: boolean;
  data?: any[];
  error?: string;
}

export async function getApiKeys(): Promise<ApiKeyResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const keys = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.userId, session.user.id))
      .orderBy(desc(apiKeys.createdAt));
    return { success: true, data: keys };
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return { success: false, error: "Failed to fetch API keys" };
  }
}

export async function createApiKey(data: {
  name: string;
}): Promise<ApiKeyResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Generate a simple API key
    const key = `ryk_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const keyPrefix = key.substring(0, 8);
    // In production, you'd hash the key
    const keyHash = key; // Placeholder - should be hashed

    const newKey = await db
      .insert(apiKeys)
      .values({
        userId: session.user.id,
        name: data.name,
        keyHash: keyHash,
        keyPrefix: keyPrefix,
      })
      .returning();
    return { success: true, data: newKey };
  } catch (error) {
    console.error("Error creating API key:", error);
    return { success: false, error: "Failed to create API key" };
  }
}

export async function revokeApiKey(id: number): Promise<ApiKeyResult> {
  try {
    const session = await auth.api.getSession();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await db
      .delete(apiKeys)
      .where(and(eq(apiKeys.id, id), eq(apiKeys.userId, session.user.id)));
    return { success: true };
  } catch (error) {
    console.error("Error revoking API key:", error);
    return { success: false, error: "Failed to revoke API key" };
  }
}
