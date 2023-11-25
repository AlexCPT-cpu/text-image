import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";

export const updateHistory = async (
  twoD: string,
  threeD: string,
  req: NextApiRequest
) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return false;
  }

  const currentUser = await prismadb.userImages.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!currentUser) {
    const createdUser = await prismadb.userImages.create({
      data: {
        userId: userId,
      },
    });

    const history = await prismadb.history.create({
      data: { userId: createdUser.userId, userImagesId: createdUser.id },
    });
    const createdPicture = await prismadb.pic.create({
      data: {
        twoDImage: twoD,
        threeDImage: threeD,
        historyId: history.id,
      },
    });
    const updatedHistory = await prismadb.history.update({
      where: { id: history?.id },
      data: {
        pictures: {
          connect: {
            id: createdPicture.id,
          },
        },
      },
    });

    const updatedUser = await prismadb.userImages.update({
      where: {
        id: createdUser.id,
      },
      data: {
        history: {
          connect: {
            id: updatedHistory.id,
          },
        },
      },
    });

    return updatedUser;
  } else {
    const history = await prismadb.history.findUnique({
      where: { userId: currentUser.userId },
    });
    const createdPicture = await prismadb.pic.create({
      data: {
        twoDImage: twoD,
        threeDImage: threeD,
        historyId: history?.id,
      },
    });

    const updatedHistory = await prismadb.history.update({
      where: { id: history?.id },
      data: {
        pictures: {
          connect: {
            id: createdPicture.id,
          },
        },
      },
    });
    return updatedHistory;
  }
};
