"use server"

import { API_URL, WEB_APP_PATH, WEB_SITE_URL } from "@repo/shared";
import { getCurrentUser } from "./users.action"
import { TProject, TProjectWithAPI } from "@/lib/types";
import { revalidatePath } from "next/cache";


// Get all configs of the current user
export async function createProject({ projectName, projectDesc }: { projectName: string, projectDesc: string }) {
  const { id: userId } = await getCurrentUser();

  if (!userId) {
    throw new Error("Unauthorized !!")
  }

  const response = await fetch(`${API_URL}/projects/create`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name: projectName, description: projectDesc }),
    headers: {
      "Content-Type": "application/json",
      "authorization": userId,
    }
  })

  const jsonResponse = await response.json();

  if (response.status !== 200) {
    throw new Error(jsonResponse.error);
  }

  revalidatePath(WEB_APP_PATH.dashboard + "/projects");
  return jsonResponse as TProjectWithAPI;
}


// Get user's all Projects
export async function getAllProjectsOfUser() {
  const { id: userId } = await getCurrentUser();

  if (!userId) {
    throw new Error("Unauthorized !!");
  }

  const response = await fetch(`${API_URL}/projects/get-all-projects`, {
    headers: {
      "authorization": userId,
    }
  });
  const jsonResponse = await response.json();

  if (response.status !== 200) {
    throw new Error(jsonResponse.error);
  }

  return jsonResponse as Omit<TProject, "userId">[];
}