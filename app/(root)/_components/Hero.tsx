import { Badge } from "@/components/ui/badge";
import IntructionVideo from "./IntructionVideo";

const Hero = () => {
  return (
    <div className="w-full flex lg:flex-row flex-col gap-10 md:pt-10 pt-5">
      <div className="flex flex-col gap-8">
        <Badge variant="outline" className="rounded-full px-4 py-2 shadow-md">
          1#Smart Medical Document Analyzer
        </Badge>

        <h2 className="text-hero">
          Membantu Anda Memahami{" "}
          <span className="text-colprimary">Dokumen Medis</span> Anda Dengan
          Mudah dan Cepat
        </h2>
        <p className="text-muted-foreground">
          <span className="text-colprimary font-medium">
            Smart Medical Document Analyzer
          </span>{" "}
          adalah aplikasi berbasis web yang memudahkan Anda memahami dokumen
          medis Anda dengan bahasa yang mudah dimengerti dan beragam fitur yang
          berguna lainnya
        </p>
      </div>
      <IntructionVideo />
    </div>
  );
};

export default Hero;
