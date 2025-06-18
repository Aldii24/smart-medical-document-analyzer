export const cleanMarkdown = (text: string) => {
  return (
    text
      // Tambahin newline sebelum dan sesudah heading
      .replace(/(#+ .+)/g, "\n$1\n")
      // Tambahin newline sebelum list item (* atau -)
      .replace(/([^\n])(\n[*\-] )/g, "$1\n$2")
      // Tambahin newline setelah bold inline di akhir kalimat
      .replace(/(\*\*.+?\*\*)(?![\n*])/g, "$1\n")
      // Ganti 2 atau lebih spasi dengan satu spasi
      .replace(/[ ]{2,}/g, " ")
      // Normalize newline ganda (biar ga dobel2 banget)
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
};
