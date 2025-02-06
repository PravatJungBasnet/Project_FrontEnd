"use server";
import { cookies } from "next/headers";

export async function setTokenCookie(token: string, name: string) {
  (await cookies()).set(`${name}`, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function deleteCookie(name: string) {
  (await cookies()).delete(name);
}

export async function getCookie(name: string) {
  return (await cookies()).get(name)?.value;
}
