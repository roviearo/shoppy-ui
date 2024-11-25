import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

const getHeaders = async () => {
  const cookiesList = await cookies();

  return {
    Cookie: cookiesList.toString(),
  };
};

export const post = async (path: string, formData: FormData) => {
  const headers = await getHeaders();

  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
};

export const get = async <T>(path: string) => {
  const headers = await getHeaders();

  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...headers },
  });
  return res.json() as T;
};
