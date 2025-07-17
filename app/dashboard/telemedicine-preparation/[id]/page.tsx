// app/consultation-prep/[id]/page.tsx
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { getConsultationPrepById } from "@/actions/consultationPrep.action";

interface ConsultationPrepDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ConsultationPrepDetailPage({
  params,
}: ConsultationPrepDetailPageProps) {
  const consultationPrep = await getConsultationPrepById(params.id);

  if (!consultationPrep) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 w-full min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/telemedicine-preparation">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <Badge variant="secondary">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(consultationPrep.createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Badge>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Detail Persiapan Konsultasi
        </h1>
        <p className="text-gray-600">
          Pertanyaan dan follow-up yang disarankan untuk konsultasi dengan
          dokter
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ringkasan Gejala
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {consultationPrep.symptomsSummary ||
                  "Tidak ada ringkasan gejala"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Pertanyaan yang Disarankan
              <Badge variant="secondary" className="ml-2">
                {consultationPrep.suggestedQuestions.length} pertanyaan
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultationPrep.suggestedQuestions.map(
                (question: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[32px] text-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{question}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Tanyakan hal ini untuk membantu dokter memahami kondisi
                        Anda
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Follow-up yang Disarankan
              <Badge variant="secondary" className="ml-2">
                {consultationPrep.followUpItems.length} item
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultationPrep.followUpItems.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-green-50 rounded-lg"
                  >
                    <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full min-w-[32px] text-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{item}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Lakukan ini setelah konsultasi untuk memastikan
                        perawatan optimal
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Tips Konsultasi</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>• Bawa catatan gejala yang telah Anda alami</li>
              <li>• Siapkan daftar obat yang sedang dikonsumsi</li>
              <li>• Jangan ragu untuk bertanya jika ada yang tidak jelas</li>
              <li>• Catat jawaban dokter untuk referensi di masa depan</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: ConsultationPrepDetailPageProps) {
  const consultationPrep = await getConsultationPrepById(params.id);

  if (!consultationPrep) {
    return {
      title: "Persiapan Konsultasi Tidak Ditemukan",
    };
  }

  return {
    title: `Persiapan Konsultasi - ${new Date(
      consultationPrep.createdAt
    ).toLocaleDateString("id-ID")}`,
    description: `Detail persiapan konsultasi dengan ${consultationPrep.suggestedQuestions.length} pertanyaan dan ${consultationPrep.followUpItems.length} follow-up item`,
  };
}
