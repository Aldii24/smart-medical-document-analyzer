"use client";

import { analyzeSymptom } from "@/actions/analyzeSymptom.action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const SymptomForm = () => {
  const [symptom, setSymptom] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with symptom:", symptom);

    setIsLoading(true);
    try {
      console.log("Calling analyzeSymptom...");
      const result = await analyzeSymptom(symptom);
      console.log("Result received:", result);

      if (result.success) {
        toast.success("Berhasil menganalisis gejala!");
        setSymptom("");
      } else {
        toast.error("Gagal menganalisis gejala");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      if (error instanceof Error) {
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });

        toast.error(`Gagal: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        toast.error("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        placeholder="Masukkan gejala kamu..."
        className="min-h-[200px] resize-none bg-background placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm sm:leading-6"
      />
      <Button
        type="submit"
        disabled={isLoading || symptom.trim() === ""}
        className="mt-4 bg-colprimary rounded-full p-5 hover:bg-colprimary/90 cursor-pointer w-full disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
            Menganalisis...
          </>
        ) : (
          <h3 className="text-white">Cek Gejala</h3>
        )}
      </Button>
    </form>
  );
};

export default SymptomForm;
