"use server"

import type { TConfigs } from "@/lib/types";
import { API_URL, WEB_APP_PATH } from "@repo/shared"
import { revalidatePath } from "next/cache";


// To get configs of a project
export async function getProjectsConfig({ projectId }: { projectId: string }) {
  const response = await fetch(`${API_URL}/configs/get/${projectId}`, {
    credentials: "include",
  });

  const jsonResponse = await response.json();

  if (response.status !== 200) {
    throw new Error(jsonResponse.error);
  }

  return jsonResponse as TConfigs[];
}


// Create config of a project
export async function createNewConfig({ projectId, env, key, value }: {
  projectId: string,
  env: "development" | "production",
  key: string,
  value: string,
}) {
  const resp = await fetch(`${API_URL}/configs/create`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ projectId, key, value, env, }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const jsonResponse = await resp.json();

  if (resp.status !== 200) {
    throw new Error(jsonResponse.error);
  }

  revalidatePath(WEB_APP_PATH.project);
  return jsonResponse as TConfigs;
}