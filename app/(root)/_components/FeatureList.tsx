"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "next-themes";

const FeatureList = () => {
  const { theme } = useTheme();
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
      <Card className="p-0 max-w-sm w-full mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/ed/b0/e2/edb0e2b3a9539803ed646387a68eb1fb.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[350px] object-cover"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Medical Report Translator & Explainer</h3>
            <p className="text-muted-foreground text-sm text-center">
              Upload foto/PDF hasil lab, rontgen, medical report Gemini
              translate istilah medis ke bahasa awam Indonesia Penjelasan detail
              tentang setiap parameter dan artinya
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
      <Card className="p-0 max-w-sm w-full mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/6a/48/16/6a4816b4db7a5dc1a5ad3610259d9d86.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[350px] object-cover"
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
      <Card className="p-0 max-w-sm w-full mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/ae/9c/7f/ae9c7f6506efe53d00fe3a86f60de319.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[350px] object-cover"
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
      <Card className="p-0 max-w-sm w-full h-[498px] mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/2c/9f/79/2c9f7935e91f35d136348a8ac03a27f1.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[350px] object-cover"
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
      <Card className="p-0 max-w-sm w-full mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/41/fe/a6/41fea6da5ed6e8fa9d515a1950865d78.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[350px] object-cover"
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
      <Card className="p-0 max-w-sm w-full mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/ca/bb/5e/cabb5e8ec8ff03e89ed3f57af9ebd600.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[350px] object-cover"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Telemedicine Preparation Assistant</h3>
            <p className="text-muted-foreground text-sm text-center">
              Generate pertanyaan yang tepat sebelum konsultasi dokter Summary
              gejala dan medical history untuk dibawa ke dokter
              Post-consultation action items tracker
            </p>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
};

export default FeatureList;
