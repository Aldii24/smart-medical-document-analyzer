"use client";

import { Badge } from "@/components/ui/badge";
import FeatureList from "./FeatureList";

const KeyFeatures = () => {
  return (
    <div id="fitur" className="flex flex-col gap-10 pt-[75px]">
      <div className="flex flex-col justify-center items-center gap-4">
        <Badge
          variant="secondary"
          className="rounded-full px-5 py-1 shadow-md bg-colprimary text-[15px] font-light text-white"
        >
          Fitur Utama
        </Badge>
        <h3 className="md:text-5xl text-3xl font-semibold text-center">
          Jelajahi Fitur-Fitur Kami Yang Lengkap
        </h3>
        <p className="text-muted-foreground w-[300px] text-center text-sm">
          Maksimalkan Fitur-Fitur Kami Untuk Keperluan Anda Dalam Memahami Dunia
          Medis
        </p>
      </div>
      <FeatureList />
    </div>
  );
};

export default KeyFeatures;
