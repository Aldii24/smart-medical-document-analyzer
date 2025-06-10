"use client";

import { usePathname } from "next/navigation";

const menuHeader = [
  {
    pathname: "/dashboard/medical-report",
    title: "Laporan Medis Translator",
  },
  {
    pathname: "/dashboard/medical-history",
    title: "Riwayat Medis",
  },
  {
    pathname: "/dashboard/health-risk",
    title: "Penilaian Risiko Kesehatan",
  },
  {
    pathname: "/dashboard/medication-guide",
    title: "Penerjemah Panduan Pengobatan",
  },
  {
    pathname: "/dashboard/symptom-matcher",
    title: "Pencocok Gejala-ke-Spesialis",
  },
  {
    pathname: "/dashboard/telemedicine-preparation",
    title: "Asisten Persiapan Telemedis",
  },
];

const HeaderBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xl font-semibold">
        {menuHeader.find((item) => item.pathname === pathname)?.title}
      </h3>
    </div>
  );
};

export default HeaderBar;
