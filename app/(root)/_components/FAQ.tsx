import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "Apakah aplikasi ini sepenuhnya gratis digunakan?",
    answer: "Untuk sekarang gratis, gatau besok.",
  },
  {
    question: "Apa saja fitur yang tersedia di aplikasi ini?",
    answer: "Liat sendiri lah, jangan males baca.",
  },
  {
    question: "Apakah hasil analisis dokumen dapat dibagi secara publik?",
    answer: "Simpen aja sendiri, jangan dibagi-bagi.",
  },
];

const Faq = () => {
  return (
    <div id="faq" className="w-full flex flex-col gap-8 pt-[75px] pb-10">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Badge
          variant="secondary"
          className="rounded-full px-5 py-1 shadow-md bg-colprimary text-[15px] font-light text-white"
        >
          Pertanyaan & Jawaban
        </Badge>
        <p className="text-muted-foreground text-sm w-[400px] text-center">
          Jika Anda Memiliki Pertanyaan atau Masalah Yang Tidak Tercantum Di
          Bawah Ini, Silakan Hubungi Kami.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-2 border-b rounded-b-md"
      >
        {faqs.map(({ question, answer }) => (
          <AccordionItem
            key={question}
            value={question}
            className="border px-4 rounded-md shadow-md"
          >
            <AccordionTrigger className="text-colprimary text-[15px]">
              {question}
            </AccordionTrigger>
            <AccordionContent className="border-b">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
