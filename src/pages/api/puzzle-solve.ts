import type { NextApiRequest, NextApiResponse } from "next";

const SOLVE_PUZZLE_API_URL =
  "https://numberwordgenerator20240927020628.azurewebsites.net/api/PuzzleSolver";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { wordSequence } = req.body;

      const response = await fetch(SOLVE_PUZZLE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wordSequence: wordSequence,
        }),
      });

      if (!response.ok) {
        throw new Error("Error occurred while fetching data.");
      }

      res.status(200).json({
        wordSequence,
        answer: await response.json(),
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } else {
    res.status(405);
  }
}
