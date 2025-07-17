import { HealthTimeline } from "./_components/TimelineForm";

export const metadata = {
  title: "SMDA | Medical History",
};

const MedicalHistoryPage = () => {
  return (
    <div className="dashboard-root">
      <HealthTimeline />
    </div>
  );
};

export default MedicalHistoryPage;
