"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getAllTimelineEvents } from "@/actions/timelineEvents.action";

type TimelineItem = {
  id: string;
  type: string;
  title: string;
  date: string;
  data: string;
};

export const HealthTimeline = () => {
  const [timeline, setTimeline] = useState<TimelineItem[] | null>(null);

  useEffect(() => {
    getAllTimelineEvents().then(setTimeline as any);
  }, []);

  if (!timeline) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {timeline.map((item) => (
        <div
          key={item.id}
          className="relative border-l-2 border-colprimary pl-4"
        >
          <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-colprimary" />
          <div className="text-sm text-muted-foreground">
            {new Date(item.date).toLocaleString()}
          </div>
          <div className="font-semibold capitalize">{item.title}</div>
          <div className="text-sm">{item.data}</div>
          <div className="text-xs italic text-gray-400">({item.type})</div>
        </div>
      ))}
    </div>
  );
};
