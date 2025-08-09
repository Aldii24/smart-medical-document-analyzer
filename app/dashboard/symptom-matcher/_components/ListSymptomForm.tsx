import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, AlertTriangle, Clock, Stethoscope } from "lucide-react";
import DeleteSymptom from "./DeleteSymptom";

const ListSymptomForm = ({ symptom }: any) => {
  const getUrgencyConfig = (urgencyLevel: string) => {
    switch (urgencyLevel?.toLowerCase()) {
      case "urgent":
        return {
          variant: "destructive" as const,
          icon: <AlertTriangle className="w-4 h-4" />,
          label: "Mendesak",
        };
      case "emergency":
        return {
          variant: "destructive" as const,
          icon: <AlertTriangle className="w-4 h-4" />,
          label: "Darurat",
        };
      default:
        return {
          variant: "secondary" as const,
          icon: <Clock className="w-4 h-4" />,
          label: "Normal",
        };
    }
  };

  const urgencyConfig = getUrgencyConfig(symptom.urgencyLevel);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex justify-between items-center pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" />
          {symptom.symptoms}
        </CardTitle>
        <DeleteSymptom sympomId={symptom.id} />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Rekomendasi Spesialis
            </h3>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 border">
            <p className="text-foreground font-medium">
              {symptom.recommendedSpecialist}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Level Urgensi
            </h3>
          </div>
          <Badge
            variant={urgencyConfig.variant}
            className="flex items-center gap-2 w-fit px-3 py-1.5"
          >
            {urgencyConfig.icon}
            <span className="font-medium text-sm">{urgencyConfig.label}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListSymptomForm;
