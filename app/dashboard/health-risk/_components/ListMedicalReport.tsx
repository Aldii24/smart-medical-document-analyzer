"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getAnalyzeRisk, riskAnalysis } from "@/actions/riskAnalysis.action";
import Link from "next/link";

const ListMedicalReport = ({ medicalReports }: { medicalReports: any }) => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  const [loadingReportId, setLoadingReportId] = useState<string | null>(null);
  const [riskAnalysMap, setRiskAnalysMap] = useState<{ [key: string]: any }>(
    {}
  );

  const handleCreateRiskAnalysis = async (reportId: string) => {
    setLoadingReportId(reportId);
    try {
      await riskAnalysis(reportId);
      toast.success("Penjelasan medis berhasil ditambahkan.");

      const updatedData = await getAnalyzeRisk(reportId);

      if (updatedData) {
        setRiskAnalysMap((prev) => ({ ...prev, [reportId]: updatedData }));
      }
    } catch (error) {
      toast.error("Gagal menambahkan penjelasan medis.");
    } finally {
      setLoadingReportId(null);
    }
  };

  return (
    <>
      {medicalReports?.map((report: any) => {
        useEffect(() => {
          const getRisk = async () => {
            const data = await getAnalyzeRisk(report.id);
            if (data) {
              setRiskAnalysMap((prev) => ({ ...prev, [report.id]: data }));
            }
          };
          getRisk();
        }, []);

        const htmlContent = md.render(report.explanation);

        return (
          <Card key={report.id} className="bg-background">
            <CardHeader className="w-full flex justify-between items-center gap-2">
              <CardTitle className="w-1/2 text-xs tracking-widest line-clamp-1">
                {report.title}
              </CardTitle>
              <span className="w-1/2 text-muted-foreground text-xs">
                {new Date(report.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Image
                src={report.fileUrl}
                alt={report.title}
                width={500}
                height={500}
                className="w-full md:h-[200px] h-[150px] rounded-md"
              />
              <div
                className="prose dark:prose-invert text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: htmlContent.slice(0, 50) + "...",
                }}
              />
              <Button
                onClick={() => handleCreateRiskAnalysis(report.id)}
                disabled={loadingReportId === report.id}
                type="submit"
                className="rounded-full bg-colprimary text-white hover:bg-colprimary cursor-pointer tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingReportId === report.id ? (
                  <div className="flex gap-1 items-center">
                    <Loader2 className="animate-spin" />
                    Sedang menganalisis
                  </div>
                ) : riskAnalysMap[report.id] ? (
                  <Link href="/">Lihat hasil</Link>
                ) : (
                  "Analisis"
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default ListMedicalReport;
