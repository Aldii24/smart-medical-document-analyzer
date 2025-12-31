import { GoogleGenAI } from "@google/genai";

type RiskAnalysisData = {
  diabetesRisk: number | null;
  hypertensionRisk: number | null;
  cholesterolRisk: number | null;
  strokeRisk: number | null;
  kidneyFailure: number | null;
  lifestyleTips: string;
};

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const explainMedicalText = async (text: string): Promise<any> => {
  const prompt = `Berikan penjelasan medis profesional dalam Bahasa Indonesia yang mudah dipahami dari hasil lab berikut:

${text}

NOTE:
- Jelaskan secara ringkas dan dengan bahasa yang mudah dimengerti arti dari setiap nilai rujukan. Misal: Nilai Rujukan: L: 13-18 g/dL; P: 12-16 g/dL, maka rentang itu artinya apa.
- Jawaban harus menggunakan format markdown agar bisa ditampilkan rapi di web.
- Gunakan heading, bullet, atau tabel jika diperlukan.
- Jangan awali jawaban dengan kata "Tentu", "Berikut penjelasannya", atau sejenisnya. Langsung mulai dengan isi utama.
- Dan berikan rekomendasi lebih lanjut sesuai dengan kondisi kesehatan pasien.
`;
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text;
};

export const analyzeRisk = async (
  explanationText: string
): Promise<RiskAnalysisData> => {
  try {
    const prompt = `
      Anda adalah seorang analis risiko kesehatan AI yang canggih. Tugas Anda adalah membaca penjelasan laporan medis dan mengubahnya menjadi data risiko terstruktur dalam format JSON.

      **Penjelasan Laporan Medis untuk Dianalisis:**
      """
      ${explanationText}
      """

      **Instruksi:**
      Berdasarkan teks penjelasan di atas, lakukan tugas berikut:
      1.  **diabetesRisk**: Estimasi persentase risiko Diabetes dari 0 hingga 100. Kembalikan sebagai ANGKA (integer). Jika tidak bisa ditentukan, berikan nilai null.
      2.  **hypertensionRisk**: Estimasi persentase risiko Hipertensi dari 0 hingga 100. Kembalikan sebagai ANGKA (integer). Jika tidak bisa ditentukan, berikan nilai null.
      3.  **cholesterolRisk**: Estimasi persentase risiko Kolesterol Tinggi dari 0 hingga 100. Kembalikan sebagai ANGKA (integer). Jika tidak bisa ditentukan, berikan nilai null.
      4.  **strokeRisk**: Estimasi persentase risiko Stroke dari 0 hingga 100. Kembalikan sebagai ANGKA (integer). Jika tidak bisa ditentukan, berikan nilai null.
      5.  **kidneyFailure**: Estimasi persentase risiko Gagal Ginjal dari 0 hingga 100. Kembalikan sebagai ANGKA (integer). Jika tidak bisa ditentukan, berikan nilai null.
      6.  **lifestyleTips**: Buat daftar 5 saran gaya hidup praktis dalam bahasa Indonesia yang relevan. Pisahkan setiap saran dengan karakter newline (\\n). Kembalikan sebagai STRING.

      **Format JSON yang WAJIB Diikuti:**
      {
        "diabetesRisk": <number | null>,
        "hypertensionRisk": <number | null>,
        "cholesterolRisk": <number | null>,
        "strokeRisk": <number | null>,
        "kidneyFailure": <number | null>,
        "lifestyleTips": "saran 1\\nsaran 2\\nsaran 3\\nsaran 4\\nsaran 5"
      }

      Hanya kembalikan JSON yang valid, tanpa teks tambahan apapun.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = response.text;

    if (!result) {
      throw new Error("No response received from AI model");
    }

    const data: RiskAnalysisData = JSON.parse(result);

    if (!isValidRiskAnalysisData(data)) {
      throw new Error("Invalid response structure from AI model");
    }

    return data;
  } catch (error) {
    console.error("Error in analyzeRisk:", error);

    return {
      diabetesRisk: null,
      hypertensionRisk: null,
      cholesterolRisk: null,
      strokeRisk: null,
      kidneyFailure: null,
      lifestyleTips:
        "Konsultasikan dengan dokter untuk saran yang lebih spesifik\nMaintain pola makan sehat\nRutin berolahraga\nCukup istirahat\nHindari stress berlebihan",
    };
  }
};

function isValidRiskAnalysisData(data: any): data is RiskAnalysisData {
  return (
    typeof data === "object" &&
    data !== null &&
    (typeof data.diabetesRisk === "number" || data.diabetesRisk === null) &&
    (typeof data.hypertensionRisk === "number" ||
      data.hypertensionRisk === null) &&
    (typeof data.cholesterolRisk === "number" ||
      data.cholesterolRisk === null) &&
    (typeof data.strokeRisk === "number" || data.strokeRisk === null) &&
    (typeof data.kidneyFailure === "number" || data.kidneyFailure === null) &&
    typeof data.lifestyleTips === "string"
  );
}
