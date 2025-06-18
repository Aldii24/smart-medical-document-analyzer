import { getMedicalReportDetail } from "@/actions/medicalreport.action";
import ReportDetail from "../../_components/ReportDetail";

const ReportDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const report = await getMedicalReportDetail(id);

  return (
    <div className="px-4 py-5">
      <ReportDetail report={report} />
    </div>
  );
};

export default ReportDetailPage;
