"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createTimelineEvent(formData: {
  type: string;
  title: string;
  date: string;
  data?: string;
}) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) throw new Error("User not found");

  await prisma.timelineEvent.create({
    data: {
      userId: dbUser.id,
      ...formData,
      date: new Date(formData.date),
    },
  });

  revalidatePath("/dashboard"); // sesuaikan path
}

export async function getAllTimelineEvents() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) throw new Error("User not found");

  const [reports, symptoms, consults, customEvents] = await Promise.all([
    prisma.medicalReport.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.symptomEntry.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.consultationPrep.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.timelineEvent.findMany({
      where: { userId: dbUser.id },
      orderBy: { date: "desc" },
    }),
  ]);

  const timeline = [
    ...reports.map((r) => ({
      id: r.id,
      type: "report",
      title: r.title,
      date: r.createdAt,
      data: r.explanation ?? "Medical report uploaded.",
    })),
    ...symptoms.map((s) => ({
      id: s.id,
      type: "symptom",
      title: "Symptom Entry",
      date: s.createdAt,
      data: s.symptoms,
    })),
    ...consults.map((c) => ({
      id: c.id,
      type: "consultation",
      title: "Consultation Prep",
      date: c.createdAt,
      data: c.symptomsSummary ?? "Consultation prepared.",
    })),
    ...customEvents.map((e) => ({
      id: e.id,
      type: e.type,
      title: e.title,
      date: e.date,
      data: e.data ?? "",
    })),
  ];

  // Sort dari terbaru ke terlama
  timeline.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return timeline;
}

// server action
export async function getTimelineEvents() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) throw new Error("User not found");

  const events = await prisma.timelineEvent.findMany({
    where: { userId: dbUser.id },
    orderBy: { date: "desc" },
  });

  return events;
}
