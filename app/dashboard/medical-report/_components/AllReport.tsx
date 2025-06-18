"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import Image from "next/image";

const AllReport = ({ medicalReports }: { medicalReports: any }) => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  if (medicalReports.length === 0) {
    return <div className="pt-10 text-center">Tidak ada laporan kesehatan</div>;
  }

  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="">
        {medicalReports
          ? medicalReports.length > 0 && (
              <h2 className="text-2xl border-b w-max pb-2">
                <span className="font-bold text-colprimary border rounded-full px-3 py-1">
                  {medicalReports.length}
                </span>{" "}
                Laporan Kesehatan
              </h2>
            )
          : null}
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {medicalReports.map((report: any) => {
          const htmlContent = md.render(report.explanation);

          return (
            <div key={report.id}>
              <Card className="bg-background shadow-md">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-sm tracking-widest">
                    {report.title}
                  </CardTitle>
                  <span className="text-muted-foreground text-xs">
                    {new Date(report.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <Image
                      src={report.fileUrl}
                      alt={report.title}
                      width={500}
                      height={500}
                      className="w-full h-[200px] rounded-md"
                    />
                    <div
                      className="prose text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: htmlContent.slice(0, 50) + "...",
                      }}
                    />
                    <div className="underline">
                      <Link
                        href={`/dashboard/medical-report/report-detail/${report.id}`}
                        className="text-colprimary"
                      >
                        Selengkapnya
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllReport;
