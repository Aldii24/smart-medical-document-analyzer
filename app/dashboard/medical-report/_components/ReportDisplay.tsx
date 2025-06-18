"use client";

import { useMemo } from "react";
import MarkdownIt from "markdown-it";

interface ReportDisplayProps {
  content: string;
}

const ReportDisplay = ({ content }: ReportDisplayProps) => {
  const md = useMemo(() => new MarkdownIt(), []);

  const htmlContent = useMemo(() => {
    return content ? md.render(content) : "";
  }, [content, md]);

  if (!htmlContent) {
    return <p className="text-muted-foreground">Penjelasan tidak tersedia.</p>;
  }

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-full"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default ReportDisplay;
