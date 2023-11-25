import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";

export const getHistory = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return {};
  }

  const currentUser = await prismadb.userImages.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!currentUser) {
    return {};
  } else {
    const history = await prismadb.history.findFirst({
      where: {
        userImagesId: currentUser.id,
      },
    });

    return history;
  }
};
