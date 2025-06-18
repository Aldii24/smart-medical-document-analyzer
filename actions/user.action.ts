"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export const syncUser = async () => {
  try {
    const { userId: clerkId } = await auth();
    const user = await currentUser();
    if (!clerkId) return null;
    if (!user) return null;

    const result = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (result) return result;

    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error("Failed to sync user.");
  }
};

export const getDBUserId = async () => {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) return null;

    const result = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    return result?.id;
  } catch (error) {
    console.log(error);
  }
};
