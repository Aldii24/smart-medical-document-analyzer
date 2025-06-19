"use server";

import { explainMedicalText } from "@/lib/actions/gemini"; // Pastikan path ini benar
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getDBUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export const saveMedicalReport = async ({
  title,
  fileUrl,
  extractedText,
}: {
  title: string;
  fileUrl: string;
  extractedText: string;
}) => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "User not authenticated" };

  const userIdentity = await getDBUserId();

  if (!userIdentity) {
    return { success: false, error: "User not found" };
  }

  if (!extractedText) {
    return { success: false, error: "Extracted text is empty." };
  }

  try {
    const explanation = await explainMedicalText(extractedText);

    const report = await prisma.medicalReport.create({
      data: {
        userId: userIdentity,
        title,
        fileUrl,
        extractedText,
        explanation,
      },
    });

    revalidatePath("/dashboard/medical-report");
    return { success: true, reportId: report.id };
  } catch (error) {
    console.error("Error in saveMedicalReport:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
};

export const getAllMedicalReports = async () => {
  try {
    const userId = await getDBUserId();
    if (!userId) return null;

    const reports = await prisma.medicalReport.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reports;
  } catch (error) {
    console.log(error);
  }
};

export const getMedicalReportDetail = async (id: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const report = await prisma.medicalReport.findUnique({
      where: {
        id,
      },
    });

    return report;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMedicalReport = async (id: string) => {
  try {
    const userId = await getDBUserId();
    if (!userId) throw new Error("Unauthorized");

    await prisma.medicalReport.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/medical-report");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
