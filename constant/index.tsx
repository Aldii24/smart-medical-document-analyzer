"use client";

import {
  BookType,
  BriefcaseMedical,
  ChartLine,
  History,
  ScanSearch,
  Settings,
} from "lucide-react";

export const items = [
  {
    title: "Laporan Medis",
    url: "/dashboard/medical-report",
    icon: BookType,
  },
  {
    title: "Risiko Kesehatan",
    url: "/dashboard/health-risk",
    icon: ChartLine,
  },
  {
    title: "Pencocokan Gejala",
    url: "/dashboard/symptom-matcher",
    icon: ScanSearch,
  },
  {
    title: "Panduan Pengobatan",
    url: "/dashboard/medication-guide",
    icon: BriefcaseMedical,
  },
  {
    title: "Riwayat Medis",
    url: "/dashboard/medical-history",
    icon: History,
  },
  {
    title: "Persiapan Telemedis",
    url: "/dashboard/telemedicine-preparation",
    icon: Settings,
  },
];
