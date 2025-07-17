"use client";

import { useMemo } from "react";
import MarkdownIt from "markdown-it";
const RecommendationLifestyle = ({ riskAnalysis }: { riskAnalysis: any }) => {
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
    return riskAnalysis.lifestyleTips
      ? md.render(riskAnalysis.lifestyleTips)
      : "";
  }, [riskAnalysis.lifestyleTips, md]);

  return (
    <div
      className="prose dark:prose-invert max-w-full"
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
};

export default RecommendationLifestyle;
