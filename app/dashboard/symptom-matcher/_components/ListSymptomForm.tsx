import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

const ListSymptomForm = ({ symptom }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase border-b pb-2">
          {symptom.symptoms}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xl uppercase">Rekomendasi Spesialis:</p>
          <span className="uppercase border-b pb-2">
            {symptom.recommendedSpecialist}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl uppercase">Level Urgensi:</p>
          <span
            className={`uppercase border-b pb-2 ${
              symptom.urgencyLevel === "urgent"
                ? "text-red-600"
                : symptom.urgencyLevel === "emergency"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {symptom.urgencyLevel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListSymptomForm;
