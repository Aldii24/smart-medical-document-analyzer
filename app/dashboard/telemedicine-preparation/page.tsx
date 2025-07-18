import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ConsultationPrepList from "./_components/ListConsultation";
import { getConsultationPreps } from "@/actions/consultationPrep.action";
import ConsultationPrepForm from "./_components/ConsultationPrep";

async function ConsultationPrepsContent() {
  const consultationPreps = await getConsultationPreps();

  return <ConsultationPrepList consultationPreps={consultationPreps} />;
}

function ConsultationPrepsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ConsultationPrepPage() {
  return (
    <div className="container mx-auto px-4 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold  mb-2">Persiapan Konsultasi</h1>
        <p className="text-muted-foreground">
          Dapatkan saran pertanyaan yang tepat untuk konsultasi dengan dokter
          berdasarkan gejala yang Anda alami
        </p>
      </div>

      <div className="space-y-8">
        <ConsultationPrepForm />

        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-6">
            Riwayat Persiapan Konsultasi
          </h2>

          <Suspense fallback={<ConsultationPrepsLoading />}>
            <ConsultationPrepsContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Metadata untuk SEO
export const metadata = {
  title: "Persiapan Konsultasi | Medical Assistant",
  description:
    "Dapatkan saran pertanyaan yang tepat untuk konsultasi dengan dokter",
};
