// components/ConsultationPrepList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Trash2,
  Calendar,
  ChevronRight,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { deleteConsultationPrep } from "@/actions/consultationPrep.action";

interface ConsultationPrepItem {
  id: string;
  symptomsSummary: string | null;
  suggestedQuestions: string[];
  followUpItems: string[];
  createdAt: Date;
}

interface ConsultationPrepListProps {
  consultationPreps: ConsultationPrepItem[];
}

export default function ConsultationPrepList({
  consultationPreps,
}: ConsultationPrepListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("consultationPreps", consultationPreps);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError(null);

    try {
      const result = await deleteConsultationPrep(id);

      if (!result.success) {
        setError(result.error || "Gagal menghapus persiapan konsultasi");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus");
      console.error("Error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (consultationPreps.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Belum ada persiapan konsultasi yang dibuat
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Buat persiapan konsultasi pertama Anda untuk mendapatkan saran
            pertanyaan yang tepat
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {consultationPreps.map((prep) => (
        <Card key={prep.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">
                  Persiapan Konsultasi
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {new Date(prep.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/dashboard/telemedicine-preparation/${prep.id}`}>
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat Detail
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(prep.id)}
                  disabled={deletingId === prep.id}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-4">
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                Ringkasan Gejala
              </h4>
              <p className="text-gray-600 text-sm line-clamp-2">
                {prep.symptomsSummary || "Tidak ada ringkasan gejala"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Badge variant="secondary" className="text-xs">
                  {prep.suggestedQuestions.length} Pertanyaan
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {prep.followUpItems.length} Follow-up
                </Badge>
              </div>

              <Link href={`/consultation-prep/${prep.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Selengkapnya
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
