"use server";

import { analyzeRisk } from "@/lib/actions/gemini";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const riskAnalysis = async (reportId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const report = await prisma.medicalReport.findUnique({
      where: {
        id: reportId,
      },
      select: {
        explanation: true,
      },
    });

    if (!report) throw new Error("Report not found");

    const analyzeGemini = await analyzeRisk(report.explanation || "");

    const analyze = await prisma.riskAnalysis.create({
      data: {
        reportId,
        ...analyzeGemini,
      },
    });
    revalidatePath("/dashboard/health-risk");
    return analyze;
  } catch (error) {
    console.log(error);
  }
};

export const getAnalyzeRisk = async (reportId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const analyze = await prisma.riskAnalysis.findUnique({
      where: {
        reportId,
      },
    });
    revalidatePath("/dashboard/health-risk");
    return analyze;
  } catch (error) {
    console.log(error);
  }
};
