"use client";

import { useEffect, useState } from "react";
import { useAdminNavigationLoader } from "@/components/admin/AdminNavigationProvider";

export default function AdminTopProgressBar() {
  const { isNavigating } = useAdminNavigationLoader();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let hideTimeout: NodeJS.Timeout | null = null;

    if (isNavigating) {
      setVisible(true);
      setProgress(12);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          if (prev < 40) return prev + 12;
          if (prev < 70) return prev + 6;
          return prev + 2;
        });
      }, 180);
    } else {
      setProgress(100);

      hideTimeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [isNavigating]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-full bg-transparent">
      <div
        className="h-full bg-[#172f55] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
