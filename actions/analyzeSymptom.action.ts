"use server";

import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";
import { getDBUserId } from "./user.action";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const analyzeSymptom = async (symptoms: string) => {
  try {
    const userId = await getDBUserId();

    if (!userId) {
      console.error("User not logged in");
      throw new Error("User not logged in");
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found");
      throw new Error("API key not configured");
    }

    const prompt = `Berikut adalah gejala yang dialami oleh pasien:

"${symptoms}"

Tentukan dua hal berikut berdasarkan gejala tersebut:
1. **recommendedSpecialist**: Berikan rekomendasi jenis spesialis yang paling tepat untuk menangani kasus ini. Contoh: Dokter Spesialis Jantung, Dokter Spesialis Kulit, Dokter Umum, Psikiater, dll.
2. **urgencyLevel**: Klasifikasikan tingkat urgensi menjadi salah satu dari tiga kategori berikut:
   - emergency → jika kondisi ini harus segera ditangani (darurat, bisa mengancam jiwa).
   - urgent → jika sebaiknya segera diperiksa dalam waktu dekat, tapi tidak mengancam jiwa.
   - routine → jika bisa ditangani dalam pemeriksaan rutin, tidak mendesak.

Format jawaban HARUS dalam format JSON. JANGAN sertakan markdown seperti \`\`\`json atau penjelasan apapun di luar objek JSON itu sendiri.

Contoh format jawaban yang benar:
{
  "recommendedSpecialist": "Dokter Spesialis THT",
  "urgencyLevel": "urgent"
}
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = response.text;

    if (!result) {
      console.error("No response received from AI model");
      throw new Error("No response received from AI model");
    }

    let data;
    try {
      data = JSON.parse(result);
      console.log("JSON parsed successfully:", data);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      console.error("Raw response that failed to parse:", result);
      throw new Error("Failed to parse AI response");
    }

    if (!data.recommendedSpecialist || !data.urgencyLevel) {
      console.error("Invalid response structure:", data);
      throw new Error("Invalid response structure from AI");
    }

    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      throw new Error("Database connection failed");
    }

    const entry = await prisma.symptomEntry.create({
      data: {
        userId,
        symptoms,
        recommendedSpecialist: data.recommendedSpecialist,
        urgencyLevel: data.urgencyLevel,
      },
    });

    revalidatePath("/dashboard/symptom-matcher");
    return { success: true, entry };
  } catch (error) {
    console.error("analyzeSymptom ERROR:", error);

    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    throw error;
  }
};

export const getAllSymptoms = async () => {
  try {
    const userId = await getDBUserId();
    if (!userId) throw new Error("Unauthorized");

    const entries = await prisma.symptomEntry.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return entries;
  } catch (error) {
    console.error("getAllSymptoms ERROR:", error);
    throw error;
  }
};

export const deleteSymptomEntry = async (id: string) => {
  try {
    const userId = await getDBUserId();
    if (!userId) throw new Error("Unauthorized");

    const entry = await prisma.symptomEntry.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/symptom-matcher");
    return { success: true, entry };
  } catch (error) {
    return { success: false, error };
  }
};
