// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismadb from "@/lib/prismadb";
import { History } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<History[]>
) {
  const allHistory = await prismadb.history.findMany();
  res.status(200).json(allHistory);
}
