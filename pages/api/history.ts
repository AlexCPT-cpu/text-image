// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getHistory } from "@/lib/getHistory";
import { History } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<History| any>
) {
  const history = await getHistory(req);
  res.status(200).json(history);
}
