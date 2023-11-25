import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { OpenAI } from "openai";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { updateHistory } from "@/lib/history";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { userId } = getAuth(req);
    const body = await req.body;
    const { inputImage } = body;

    if (!userId) {
      return res.status(401).send("Unauthorized");
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).send("OpenAI API Key not configured.");
    }

    // const response = await openai.images.generate({
    //   model: "dall-e-2",
    //   prompt,
    //   n: parseInt(amount, 10),
    //   size: resolution,
    // });

    const data = await updateHistory(inputImage, inputImage, req);
    return res.status(200).json(data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return res.status(500).send("Internal Error");
  }
}
