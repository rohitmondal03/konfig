"use server"

import { API_URL, WEB_APP_PATH, AUTH_COOKIE_TOKEN } from "@repo/shared"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"


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
    throw new Error(jsonResponse.error);
  }

  (await cookies()).set(AUTH_COOKIE_TOKEN, jsonResponse.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect(WEB_APP_PATH.dashboard);
}

// To login a user with Username
