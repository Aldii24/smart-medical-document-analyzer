import { Separator } from "@/components/ui/separator";
import FileUploader from "./_components/FileUploader";
import AllReport from "./_components/AllReport";
import { getAllMedicalReports } from "@/actions/medicalreport.action";

export const metadata = {
  title: "SMDA | Medical Report",
};

const MedicalReportPage = async () => {
  const allReports = await getAllMedicalReports();

  return (
    <div className="dashboard-root">
      <FileUploader />
      <Separator className="mt-20" />
      <AllReport medicalReports={allReports} />
    </div>
  );
};

export default MedicalReportPage;
