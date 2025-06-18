"use client";

import React, { FormEvent, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { toast } from "sonner";
import { saveMedicalReport } from "@/actions/medicalreport.action";
import { uploadFiles } from "@/utils/uploadthing";
import { runOCR } from "@/lib/actions/ocr";
import { Loader2 } from "lucide-react";

const FileUploader = () => {
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("✨ Translate");
  const handleChangeImage = (files: File[]) => {
    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Mohon unggah gambar terlebih dahulu!");
      return;
    }
    setIsLoading(true);

    try {
      setLoadingMessage("Mengekstrak teks...");
      const extractedText = await runOCR(file);
      if (!extractedText.trim()) {
        toast.error("Tidak ada teks yang dapat diekstrak dari gambar.");
        throw new Error("OCR failed to extract text.");
      }

      setLoadingMessage("Mengunggah file...");
      const res = await uploadFiles("imageUploader", {
        files: [file],
      });

      const fileUrl = res[0]?.ufsUrl;
      if (!fileUrl) {
        toast.error("Gagal mengunggah gambar.");
        throw new Error("Failed to upload image");
      }

      setLoadingMessage("AI sedang menganalisis...");
      const result = await saveMedicalReport({
        title: file.name || "Laporan Tanpa Nama",
        fileUrl: fileUrl,
        extractedText: extractedText,
      });

      if (result?.success) {
        toast.success("Laporan medis berhasil diproses!");
        setFile(undefined);
      } else {
        toast.error(result.error || "Terjadi kesalahan di server.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat memproses laporan medis.";
      toast.error(errorMessage);
      console.error("An error occurred during the process:", error);
    } finally {
      setIsLoading(false);
      setLoadingMessage("✨ Translate");
    }
  };

  return (
    <div className="w-full flex lg:flex-row flex-col gap-5">
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-5 lg:max-w-2xl min-h-96"
      >
        <div className=" border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg shadow-">
          <FileUpload onChange={handleChangeImage} />
        </div>
        <ShinyButton className="rounded-full py-4 shadow-md">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin mr-2" /> {loadingMessage}
            </div>
          ) : (
            "✨ Translate"
          )}
        </ShinyButton>
      </form>
      <Card className="lg:w-1/2 w-full bg-background">
        <CardHeader className="px-8">✨ Cara penggunaan</CardHeader>
        <Separator />
        <CardContent>
          {" "}
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm">
              1. Pilih file gambar hasil pemeriksaan medis. Usahakan gambar
              terlihat jelas dan tidak buram.
            </p>
            <p className="text-muted-foreground text-sm">
              2. Klik tombol <span className="text-colprimary">Translate</span>{" "}
              untuk memulai proses.
            </p>
            <p className="text-muted-foreground text-sm">
              3. Aplikasi akan mengekstrak teks, mengunggah file, dan
              menganalisisnya dengan AI.
            </p>
            <p className="text-muted-foreground text-sm">
              4. Tunggu beberapa saat hingga muncul notifikasi sukses atau
              gagal.
            </p>
            <p className="text-muted-foreground text-sm">
              5. Hasil akan ditampilkan di bawah halaman ini.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploader;
