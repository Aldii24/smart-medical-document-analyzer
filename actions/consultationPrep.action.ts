// lib/actions/consultation-prep.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { revalidatePath } from "next/cache";
import { getDBUserId } from "./user.action";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

interface ConsultationPrepResult {
  suggestedQuestions: string[];
  followUpItems: string[];
}

export async function generateConsultationPrep(symptomsSummary: string) {
  try {
    const userId = await getDBUserId();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!symptomsSummary || symptomsSummary.trim() === "") {
      throw new Error("Symptoms summary is required");
    }

    // Create prompt for Gemini AI
    const prompt = `
      Berdasarkan ringkasan gejala berikut, buat data persiapan konsultasi:
      
      Ringkasan Gejala: "${symptomsSummary}"
      
      Harap berikan respons JSON dengan struktur berikut:
      {
        "suggestedQuestions": [
          "Pertanyaan 1 yang harus ditanyakan pasien kepada dokter",
          "Pertanyaan 2 yang harus ditanyakan pasien kepada dokter",
          "Pertanyaan 3 yang harus ditanyakan pasien kepada dokter"
        ],
        "followUpItems": [
          "Titik tindak lanjut 1 untuk setelah konsultasi",
          "Titik tindak lanjut 2 untuk setelah konsultasi",
          "Titik tindak lanjut 3 untuk setelah konsultasi"
        ]
      }
      
      Pedoman:
      - Buat 5-8 pertanyaan relevan berdasarkan gejala
      - Pertanyaan harus spesifik dan membantu dokter memahami kondisi pasien dengan lebih baik
      - Sertakan pertanyaan tentang durasi, tingkat keparahan, pemicu, dan dampaknya pada kehidupan sehari-hari
      - Tindak lanjut harus berupa langkah-langkah praktis yang dapat diambil pasien setelah konsultasi
      - Buat pertanyaan dan tindak lanjut yang sesuai dengan konteks layanan kesehatan di Indonesia
      - Gunakan bahasa yang jelas dan sederhana agar mudah dipahami pasien
      - Fokus pada aspek terpenting dari gejala yang dijelaskan
    `;

    // Generate AI response
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = response.text;

    if (!result) {
      throw new Error("No response received from AI model");
    }

    const data: ConsultationPrepResult = JSON.parse(result);

    // Validate the response structure
    if (!data.suggestedQuestions || !data.followUpItems) {
      throw new Error("Invalid response structure from AI model");
    }

    if (
      !Array.isArray(data.suggestedQuestions) ||
      !Array.isArray(data.followUpItems)
    ) {
      throw new Error("Invalid response format from AI model");
    }

    // Save to database
    const consultationPrep = await prisma.consultationPrep.create({
      data: {
        userId,
        symptomsSummary: symptomsSummary,
        suggestedQuestions: JSON.stringify(data.suggestedQuestions),
        followUpItems: JSON.stringify(data.followUpItems),
      },
    });

    // Revalidate the consultation prep page
    revalidatePath("/dashboard/telemedicine-preparation");

    return {
      success: true,
      data: {
        id: consultationPrep.id,
        symptomsSummary: consultationPrep.symptomsSummary,
        suggestedQuestions: data.suggestedQuestions,
        followUpItems: data.followUpItems,
        createdAt: consultationPrep.createdAt,
      },
    };
  } catch (error) {
    console.error("Error generating consultation prep:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate consultation preparation",
    };
  }
}

export async function getConsultationPreps() {
  try {
    const userId = await getDBUserId();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const consultationPreps = await prisma.consultationPrep.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return consultationPreps.map((prep: any) => ({
      id: prep.id,
      symptomsSummary: prep.symptomsSummary,
      suggestedQuestions: prep.suggestedQuestions
        ? JSON.parse(prep.suggestedQuestions)
        : [],
      followUpItems: prep.followUpItems ? JSON.parse(prep.followUpItems) : [],
      createdAt: prep.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching consultation preps:", error);
    throw new Error("Failed to fetch consultation preparations");
  }
}

export async function deleteConsultationPrep(id: string) {
  try {
    const userId = await getDBUserId();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Verify ownership
    const consultationPrep = await prisma.consultationPrep.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!consultationPrep || consultationPrep.userId !== userId) {
      throw new Error("Consultation preparation not found or unauthorized");
    }

    await prisma.consultationPrep.delete({
      where: { id },
    });

    revalidatePath("/dashboard/telemedicine-preparation");

    return { success: true };
  } catch (error) {
    console.error("Error deleting consultation prep:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete consultation preparation",
    };
  }
}

export async function getConsultationPrepById(id: string) {
  try {
    const userId = await getDBUserId();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const consultationPrep = await prisma.consultationPrep.findUnique({
      where: {
        id,
        userId, // Ensure user can only access their own data
      },
    });

    if (!consultationPrep) {
      return null;
    }

    return {
      id: consultationPrep.id,
      symptomsSummary: consultationPrep.symptomsSummary,
      suggestedQuestions: consultationPrep.suggestedQuestions
        ? JSON.parse(consultationPrep.suggestedQuestions)
        : [],
      followUpItems: consultationPrep.followUpItems
        ? JSON.parse(consultationPrep.followUpItems)
        : [],
      createdAt: consultationPrep.createdAt,
    };
  } catch (error) {
    console.error("Error fetching consultation prep:", error);
    return null;
  }
}
