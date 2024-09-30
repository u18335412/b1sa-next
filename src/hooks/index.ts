import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useState, useEffect } from "react";

export const useGetRandomString = () => {
  return useSWR("/api/random", () => fetcher("/api/generate"), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
  });
};

async function solvePuzzle(_: string, { arg }: { arg: string }) {
  const res = await fetch("api/puzzle-solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wordSequence: arg,
    }),
  });

  if (!res.ok) throw new Error("Error occurred while solving puzzle.");

  return res.json();
}

export const useSolvePuzzleMutation = (input: string) => {
  return useSWRMutation(`/api/solve-puzzle/${input}`, solvePuzzle, {});
};

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
