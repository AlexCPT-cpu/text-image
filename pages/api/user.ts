import { clerkClient } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId } = await req.body;

      const user = await clerkClient.users.getUser(userId)
     if(user) {
      res.status(200).json(user);
     } else  {
        res.status(400).json({
            error: "no user"
        });
     }
  }
}
