import { getAllSymptoms } from "@/actions/analyzeSymptom.action";
import ListSymptomForm from "./_components/ListSymptomForm";
import SymptomForm from "./_components/SymptomForm";

export const metadata = {
  title: "SMDA | Symptom Matcher",
};

const SymptomMatcherPage = async () => {
  const allSymptom = await getAllSymptoms();
  console.log("allSymptom", allSymptom);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Cek Gejala Kamu</h1>
      <SymptomForm />
      <h2 className="text-2xl font-bold mb-6  pt-10">Daftar Gejala</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {allSymptom?.map((symptom: any) => (
          <ListSymptomForm key={symptom.id} symptom={symptom} />
        ))}
      </div>
    </main>
  );
};

export default SymptomMatcherPage;
