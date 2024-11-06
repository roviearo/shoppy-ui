"use server";

import API_URL from "../constants/api";
import { getErrorMessage } from "./errors";
import { cookies } from "next/headers";

const getHeaders = async () =>
  await {
    Cookie: cookies().toString(),
  };

export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: await { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    console.log(parsedRes);
    return { error: getErrorMessage(parsedRes) };
  }
};

export const get = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: await { ...getHeaders() },
  });
  return res.json();
};
