// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const RANDOM_STRING_API_URL =
  "https://numberwordgenerator20240927020628.azurewebsites.net/api/PuzzleGenerator/minLength";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const randomMinimum = Math.floor(Math.random() * 500) + 3;
    try {
      const resp = await fetch(`${RANDOM_STRING_API_URL}/${randomMinimum}`);

      if (!resp.ok) {
        throw new Error("Error occurred while fetching data.");
      }
      res.status(200).json(await resp.json());
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } else {
    res.status(405);
  }
}
