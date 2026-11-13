"use server";

import { eq, desc, and, or, ilike, count } from "drizzle-orm";

import { db } from "@lib/db";
import { projects, teamMembers } from "@lib/db";

export interface ProjectResult {
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

export async function getProjects(
  page = 1,
  pageSize = 10,
  search = "",
  statusFilter = "all",
): Promise<ProjectResult> {
  try {
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(projects.name, `%${search}%`),
          ilike(projects.description || "", `%${search}%`),
        ),
      );
    }

    if (statusFilter !== "all") {
      conditions.push(eq(projects.status, statusFilter));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [allProjects, totalResult] = await Promise.all([
      db
        .select()
        .from(projects)
        .where(whereClause)
        .orderBy(desc(projects.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      db.select({ count: count() }).from(projects).where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      success: true,
      data: allProjects,
      pagination: { page, pageSize, total, totalPages },
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function getProjectById(id: number): Promise<ProjectResult> {
  try {
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    if (!project[0]) {
      return { success: false, error: "Project not found" };
    }
    return { success: true, data: [project[0]] };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { success: false, error: "Failed to fetch project" };
  }
}

export async function createProject(data: {
  name: string;
  description?: string;
  status?: string;
}): Promise<ProjectResult> {
  try {
    const newProject = await db
      .insert(projects)
      .values({
        name: data.name,
        description: data.description || null,
        status: data.status || "active",
      })
      .returning();
    return { success: true, data: newProject };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(
  id: number,
  data: Partial<{
    name: string;
    description: string;
    status: string;
  }>,
): Promise<ProjectResult> {
  try {
    const updatedProject = await db
      .update(projects)
      .set(data)
      .where(eq(projects.id, id))
      .returning();
    return { success: true, data: updatedProject };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: number): Promise<ProjectResult> {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

export interface TeamMemberResult {
  success: boolean;
  data?: any[];
  error?: string;
}

export async function getTeamMembers(): Promise<TeamMemberResult> {
  try {
    const allMembers = await db
      .select()
      .from(teamMembers)
      .orderBy(desc(teamMembers.createdAt));
    return { success: true, data: allMembers };
  } catch (error) {
    console.error("Error fetching team members:", error);
    return { success: false, error: "Failed to fetch team members" };
  }
}

export async function createTeamMember(data: {
  name: string;
  role?: string;
  email?: string;
}): Promise<TeamMemberResult> {
  try {
    const newMember = await db
      .insert(teamMembers)
      .values({
        name: data.name,
        role: data.role || null,
        email: data.email || null,
      })
      .returning();
    return { success: true, data: newMember };
  } catch (error) {
    console.error("Error creating team member:", error);
    return { success: false, error: "Failed to create team member" };
  }
}

export async function updateTeamMember(
  id: number,
  data: Partial<{ name: string; role: string; email: string }>,
): Promise<TeamMemberResult> {
  try {
    const updatedMember = await db
      .update(teamMembers)
      .set(data)
      .where(eq(teamMembers.id, id))
      .returning();
    return { success: true, data: updatedMember };
  } catch (error) {
    console.error("Error updating team member:", error);
    return { success: false, error: "Failed to update team member" };
  }
}

export async function deleteTeamMember(id: number): Promise<TeamMemberResult> {
  try {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { success: false, error: "Failed to delete team member" };
  }
}
