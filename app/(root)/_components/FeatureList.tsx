"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "next-themes";

const FeatureList = () => {
  const { theme } = useTheme();
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4">
      <Card className="p-0 max-w-sm w-full mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/4e/d9/5b/4ed95b2b9337286618ed691bddcced5d.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px] object-cover"
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
              src="https://i.pinimg.com/1200x/0f/64/10/0f6410189f66d9e3b5ff32a08a04151a.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px] object-cover"
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
              src="https://i.pinimg.com/1200x/5d/90/72/5d9072fd6ad8286aec3c0ecd39d5b9cb.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px] object-cover"
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
      <Card className="p-0 max-w-sm w-full mx-auto shadow-md border-none">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardContent className="p-4">
            <Image
              src="https://i.pinimg.com/1200x/44/05/27/440527486d5835c218f8521465dfc29b.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px] object-cover"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-4 border-t border-border [.border-t]:pt-4">
            <h3 className="text-xl">Medication Guide & Interaction Checker</h3>
            <p className="text-muted-foreground text-sm text-center">
              Scan foto obat untuk info lengkap dalam bahasa Indonesia Check
              interaksi antar obat yang sedang dikonsumsi Reminder schedule dan
              side effects warning
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
              src="https://i.pinimg.com/1200x/7f/98/ca/7f98caa136db977af03946d288440dae.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px] object-cover"
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
              src="https://i.pinimg.com/1200x/de/25/17/de25172a1d67b88b368103bcfea3fe12.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-md w-[450px] h-[250px] object-cover"
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
