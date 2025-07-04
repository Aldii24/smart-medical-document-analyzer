import { getAllMedicalReports } from "@/actions/medicalreport.action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ListMedicalReport from "./_components/ListMedicalReport";
import { getAnalyzeRisk } from "@/actions/riskAnalysis.action";

export const metadata = {
  title: "SMDA | Health Risk",
};

const HealthRiskPage = async () => {
  const medicalReports = await getAllMedicalReports();

  return (
    <div className="dashboard-root">
      <p className="text-muted-foreground text-justify">
        Pada fitur ini anda bisa dengan mudah mengecek risiko kesehatan dari
        hasil laporan medis anda. Sistem kami akan menganalisis hasil laporan
        medis anda dan memberikan hasil risiko kesehatan yang sesuai. Dimana
        sistem kami hanya akan fokus pada risiko{" "}
        <span className="font-bold">
          Diabetes, Hipertensi, Kolestrol, Stroke, dan Gagal Ginjal.
        </span>
      </p>
      <Separator className="my-5" />
      <div className="w-full flex">
        <div className="lg:w-3/4 w-full grid lg:grid-cols-3 grid-cols-2 gap-4">
          <ListMedicalReport medicalReports={medicalReports} />
        </div>
        <div className="w-1/4 lg:block hidden">
          <Card className="bg-background">
            <CardHeader className="px-8">✨ Petunjuk Penggunaan</CardHeader>
            <Separator />
            <CardContent>
              <div className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">
                  1. Klik tombol Analisis.
                </p>
                <p className="text-muted-foreground text-sm">
                  2. Tunggu hingga AI menganalisis laporan kesehatan anda.
                </p>
                <p className="text-muted-foreground text-sm">
                  3. Ketika AI selesai menganalisis, maka tombol Analisis akan
                  berubah menjadi "Lihat Analisis".
                </p>
                <Separator />
                <i className="text-xs text-muted-foreground">
                  Penting: Jangan menganalisi laporan medis sekaligus dalam satu
                  waktu. Mohon tunggu analisis selesai sebelum menganalisis
                  laporan medis lainnya.
                </i>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthRiskPage;
