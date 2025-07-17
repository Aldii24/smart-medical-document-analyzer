"use server";

import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getDBUserId } from "./user.action";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const analyzeSymptom = async (symptoms: string) => {
  console.log("analyzeSymptom called with:", symptoms);

  try {
    console.log("Checking authentication...");
    const userId = await getDBUserId();
    console.log("User ID:", userId);

    if (!userId) {
      console.error("❌ User not logged in");
      throw new Error("User not logged in");
    }

    console.log("Checking API key...");
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not found");
      throw new Error("API key not configured");
    }
    console.log("API key exists");

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

    console.log("Prompt prepared, length:", prompt.length);

    console.log("Calling AI model...");
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    console.log("📡 AI response received");
    const result = response.text;
    console.log("🔍 AI Raw Response:", result);

    if (!result) {
      console.error("❌ No response received from AI model");
      throw new Error("No response received from AI model");
    }

    console.log("📊 Parsing JSON...");
    let data;
    try {
      data = JSON.parse(result);
      console.log("✅ JSON parsed successfully:", data);
    } catch (parseError) {
      console.error("❌ JSON parsing failed:", parseError);
      console.error("Raw response that failed to parse:", result);
      throw new Error("Failed to parse AI response");
    }

    console.log("🔍 Validating response structure...");
    if (!data.recommendedSpecialist || !data.urgencyLevel) {
      console.error("❌ Invalid response structure:", data);
      throw new Error("Invalid response structure from AI");
    }

    console.log("🗄️  Checking database connection...");
    try {
      await prisma.$connect();
      console.log("✅ Database connected");
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError);
      throw new Error("Database connection failed");
    }

    console.log("💾 Saving to database...");
    const entry = await prisma.symptomEntry.create({
      data: {
        userId,
        symptoms,
        recommendedSpecialist: data.recommendedSpecialist,
        urgencyLevel: data.urgencyLevel,
      },
    });

    console.log("✅ Entry created successfully:", entry.id);
    revalidatePath("/dashboard/symptom-matcher");
    return { success: true, entry };
  } catch (error) {
    console.error("💥 analyzeSymptom ERROR:", error);

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
    });

    return entries;
  } catch (error) {
    console.error("💥 getAllSymptoms ERROR:", error);
    throw error;
  }
};
