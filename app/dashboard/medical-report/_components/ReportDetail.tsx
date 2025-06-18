"use client";

import { useMemo } from "react";
import MarkdownIt from "markdown-it";

const ReportDetail = ({ report }: { report: any }) => {
  const md = useMemo(
    () =>
      new MarkdownIt({
        html: true, // Praktik bagus untuk mengizinkan tag HTML jika ada
        breaks: false, // <-- UBAH INI MENJADI FALSE
        typographer: true,
        linkify: true,
      }),
    []
  );

  const htmlContent = useMemo(() => {
    return report.explanation ? md.render(report.explanation) : "";
  }, [report.explanation, md]);

  return (
    <div
      className="prose dark:prose-invert max-w-full"
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
};

export default ReportDetail;
