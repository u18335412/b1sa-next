import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Error occurred while fetching.");
  }

  return resp.json();
};
