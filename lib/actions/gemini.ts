import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const explainMedicalText = async (text: string): Promise<any> => {
  const prompt = `Berikan penjelasan medis dalam Bahasa Indonesia yang mudah dipahami dari hasil lab berikut:

${text}

NOTE:
- Jawaban harus menggunakan format markdown agar bisa ditampilkan rapi di web.
- Gunakan heading, bullet, atau tabel jika diperlukan.
- Jangan awali jawaban dengan kata "Tentu", "Berikut penjelasannya", atau sejenisnya. Langsung mulai dengan isi utama.`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
