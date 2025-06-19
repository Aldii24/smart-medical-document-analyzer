"use client";

import { useMemo } from "react";
import MarkdownIt from "markdown-it";

const ReportDetail = ({ report }: { report: any }) => {
  const md = useMemo(
    () =>
      new MarkdownIt({
        html: true,
        breaks: true,
        typographer: true,
        linkify: true,
        langPrefix: "language-",
        quotes: "“”‘’",
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
