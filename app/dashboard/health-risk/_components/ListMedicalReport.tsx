"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
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

  const fetchedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const fetchAllRisks = async () => {
      for (const report of medicalReports || []) {
        if (!fetchedIds.current.has(report.id)) {
          const data = await getAnalyzeRisk(report.id);
          if (data) {
            setRiskAnalysMap((prev) => ({ ...prev, [report.id]: data }));
          }
          fetchedIds.current.add(report.id);
        }
      }
    };

    if (medicalReports?.length > 0) {
      fetchAllRisks();
    }
  }, [medicalReports]);

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
        const htmlContent = md.render(report.explanation);
        const riskResult = riskAnalysMap[report.id];

        return (
          <Card key={report.id} className="bg-background">
            <CardHeader className="w-full flex justify-between items-center gap-2">
              <CardTitle className="w-1/2 text-xs tracking-widest line-clamp-1">
                {report.title}
              </CardTitle>
              <span className="w-1/2 text-muted-foreground text-xs text-right">
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
                className="w-full md:h-[200px] h-[150px] rounded-md object-cover"
              />

              <div
                className="prose dark:prose-invert text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: htmlContent.slice(0, 50) + "...",
                }}
              />

              {riskResult ? (
                <Link
                  href={`/dashboard/health-risk/${riskResult.id}`}
                  className="rounded-full bg-colprimary text-white hover:bg-colprimary px-4 py-2 text-center text-sm tracking-widest"
                >
                  Lihat hasil
                </Link>
              ) : (
                <Button
                  onClick={() => handleCreateRiskAnalysis(report.id)}
                  disabled={loadingReportId === report.id && riskResult}
                  type="submit"
                  className="rounded-full bg-colprimary text-white hover:bg-colprimary tracking-widest disabled:bg-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  {loadingReportId === report.id ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    "Analisis"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default ListMedicalReport;
