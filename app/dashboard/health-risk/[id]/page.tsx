import { getRiskAnalysisById } from "@/actions/riskAnalysis.action";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import RecommendationLifestyle from "../_components/RecommendationLifestyle";

const DetailRiskAnalysis = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const riskAnalysis = await getRiskAnalysisById(id);

  return (
    <div className="flex flex-col px-4 py-10">
      <h1 className="pb-4">
        Berdasarkan Hasil Dari Analisis Resiko Didapatkan Beberapa Resiko dengan
        Nilai yang Bisa Dilihat di Bawah Ini!
      </h1>
      <Separator className="mb-4" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3>Resiko Diabetes</h3>
          <Progress value={riskAnalysis?.diabetesRisk} />
        </div>
        <div className="flex flex-col gap-2">
          <h3>Resiko Hipertensi</h3>
          <Progress value={riskAnalysis?.hypertensionRisk} />
        </div>
        <div className="flex flex-col gap-2">
          <h3>Resiko Kolestrol</h3>
          <Progress value={riskAnalysis?.cholesterolRisk} />
        </div>
        <div className="flex flex-col gap-2">
          <h3>Resiko Gagal Ginjal</h3>
          <Progress value={riskAnalysis?.kidneyFailure} />
        </div>
        <div className="flex flex-col gap-2">
          <h3>Resiko Stroke</h3>
          <Progress value={riskAnalysis?.strokeRisk} />
        </div>
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col gap-5">
        <h3 className="text-3xl">Adapun Rekomendasi Dari Sistem Kami Adalah</h3>
        <RecommendationLifestyle riskAnalysis={riskAnalysis} />
      </div>
    </div>
  );
};

export default DetailRiskAnalysis;
