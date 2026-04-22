"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import type { TUser } from "@/lib/types"
import { API_URL, WEB_APP_PATH, AUTH_COOKIE_TOKEN } from "@repo/shared"


// Is Session present ?
export const isSession = async () => {
  const token = (await cookies()).get(AUTH_COOKIE_TOKEN)?.value;
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/auth/check-session`, {
    headers,
  })
  return response.status === 200;
}


// Get current user
export const getCurrentUser = async () => {
  const token = (await cookies()).get(AUTH_COOKIE_TOKEN)?.value;
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/auth/get-user`, {
    credentials: "include",
    headers,
  })

  const jsonResponse = await response.json();

  if (response.status !== 200) {
    console.log(jsonResponse);
    throw new Error(jsonResponse.error);
  }

  return jsonResponse as TUser;
}


// To signup a new user
export const signUpUser = async ({ email, name, password, username }: { email: string, password: string, name: string, username: string }) => {
  const response = await fetch(`${API_URL}/auth/create-user`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      name,
      username,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })

  const jsonResponse = await response.json();

  if (response.status !== 200) {
    throw new Error(jsonResponse.error);
  }

  (await cookies()).set(AUTH_COOKIE_TOKEN, jsonResponse.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // expires: 7 * 24 * 3600,  // 7 days
  });

  redirect(WEB_APP_PATH.dashboard);
}


// To login a user with Email
export const loginUser = async ({ email, password }: { email: string, password: string }) => {
  const response = await fetch(`${API_URL}/auth/login-user`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })

  const jsonResponse = await response.json();

  if (response.status !== 200) {
    console.log(jsonResponse);
    throw new Error(jsonResponse.error);
  }

  (await cookies()).set(AUTH_COOKIE_TOKEN, jsonResponse.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // expires: 7 * 24 * 3600,  // 7 days
  });

  redirect(WEB_APP_PATH.dashboard);
}


// To logout a user
export const signoutUser = async () => {
  const token = (await cookies()).get(AUTH_COOKIE_TOKEN)?.value;
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers,
  });

  if (response.status !== 200) {
    const jsonResponse = await response.json();
    throw new Error(jsonResponse.error);
  }

  // Clear the local auth cookie
  (await cookies()).delete(AUTH_COOKIE_TOKEN);

  redirect(WEB_APP_PATH.login);
}