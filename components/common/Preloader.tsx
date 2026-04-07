"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_TIME = 1000;

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_TIME - elapsed;

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Trigger fade-out AFTER loading ends
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>

        <div className="z-10">
          <Image
            src="/images/logo.png"
            alt="Pride Group Logo"
            width={80}
            height={80}
            priority
          />
        </div>
      </div>
    </div>
  );
}
