// components/ConsultationPrepForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { generateConsultationPrep } from "@/actions/consultationPrep.action";

interface ConsultationPrepData {
  id: string;
  symptomsSummary: string;
  suggestedQuestions: string[];
  followUpItems: string[];
  createdAt: Date;
}

export default function ConsultationPrepForm() {
  const [symptomsSummary, setSymptomsSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!symptomsSummary.trim()) {
      setError("Mohon masukkan ringkasan gejala");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await generateConsultationPrep(symptomsSummary);

      if (response.success) {
        setSuccess(true);
        setSymptomsSummary(""); // Clear form

        // Redirect to detail page after short delay
        setTimeout(() => {
          router.push(`/consultation-prep/${response.data?.id}`);
        }, 1500);
      } else {
        setError(response.error || "Terjadi kesalahan saat memproses");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memproses permintaan");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Persiapan Konsultasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="symptoms"
                className="block text-sm font-medium mb-2"
              >
                Ringkasan Gejala
              </label>
              <Textarea
                id="symptoms"
                placeholder="Masukkan ringkasan gejala yang ingin Anda konsultasikan dengan dokter..."
                value={symptomsSummary}
                onChange={(e) => setSymptomsSummary(e.target.value)}
                className="min-h-[120px]"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Jelaskan gejala yang Anda alami secara detail untuk mendapatkan
                saran pertanyaan yang tepat.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !symptomsSummary.trim()}
              className="bg-colprimary rounded-full cursor-pointer hover:bg-colprimary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <h3 className="text-white">Generate Persiapan Konsultasi </h3>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Display */}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Persiapan konsultasi berhasil dibuat! Mengalihkan ke halaman
            detail...
          </AlertDescription>
        </Alert>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
