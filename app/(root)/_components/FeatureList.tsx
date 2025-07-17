"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "next-themes";

const FeatureList = () => {
  const { theme } = useTheme();
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
      <Card className="p-0 max-w-lg w-full h-max mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="/images/f1.png"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px]"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Medical Report Translator & Explainer</h3>
            <p className="text-muted-foreground text-sm text-center">
              Upload foto hasil lab, rontgen, medical report Gemini translate
              istilah medis ke bahasa awam Indonesia Penjelasan detail tentang
              setiap parameter dan artinya
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
      <Card className="p-0 max-w-lg w-full h-max mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="/images/f2.png"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px]"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Health Risk Assessment</h3>
            <p className="text-muted-foreground text-sm text-center">
              Analisis hasil lab untuk deteksi early warning signs Risk scoring
              untuk diabetes, hipertensi, kolesterol, dll Rekomendasi lifestyle
              changes berdasarkan hasil
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
      <Card className="p-0 max-w-lg w-full h-max mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="/images/f3.png"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px]"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Symptom-to-Specialist Matcher</h3>
            <p className="text-muted-foreground text-sm text-center">
              Input gejala dalam bahasa Indonesia AI recommend spesialis yang
              tepat untuk dikunjungi Estimasi urgency level (emergency, urgent,
              routine
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
      <Card className="p-0 max-w-lg w-full  h-max mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="/images/f4.png"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px]"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Medication Guide & Interaction Checker</h3>
            <p className="text-muted-foreground text-sm text-center">
              Scan foto obat untuk info lengkap dalam bahasa Indonesia Check
              interaksi antar obat yang sedang dikonsumsi
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
      <Card className="p-0 max-w-lg w-full h-max mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="/images/f5.png"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px]"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Medical History Timeline</h3>
            <p className="text-muted-foreground text-sm text-center">
              Digital health record yang mudah diakses Timeline visual dari
              semua medical documents Export summary untuk dokter baru
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
};

export default FeatureList;
