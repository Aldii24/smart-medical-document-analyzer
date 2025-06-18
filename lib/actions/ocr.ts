import Tesseract from "tesseract.js";

export const runOCR = async (file: File): Promise<string> => {
  console.log("Starting OCR on the client...");
  const result = await Tesseract.recognize(file, "ind", {
    logger: (m) => console.log(m),
  });
  console.log("OCR finished.");
  return result.data.text;
};
