"use client";

import {
  BookType,
  BriefcaseMedical,
  Calendar,
  ChartLine,
  History,
  ScanSearch,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link
            href="/"
            className="flex items-center px-4 pb-4 border-b [.border-b]:pb-2"
          >
            <Image src="/images/smda.png" alt="smda" width={50} height={50} />
            <h3 className="text-xl">
              <span className="text-colprimary font-semibold">Medoc</span>lyzer
            </h3>
          </Link>
          <SidebarGroupContent>
            <SidebarMenu className="pt-5 flex flex-col gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "px-4 py-5 border rounded-full text-foreground hover:bg-colprimary/90 flex items-center gap-4 transition-all duration-200 hover:text-white",
                      pathname === item.url &&
                        "bg-colprimary font-semibold text-white"
                    )}
                  >
                    <Link href={item.url} prefetch={true}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
