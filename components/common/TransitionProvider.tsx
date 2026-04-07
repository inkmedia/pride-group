"use client";

import { createContext, useContext, useState } from "react";

const TransitionContext = createContext<any>(null);

export function useTransition() {
  return useContext(TransitionContext);
}

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const startTransition = () => setLoading(true);
  const stopTransition = () => setLoading(false);

  return (
    <TransitionContext.Provider value={{ startTransition, stopTransition }}>
      {children}

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9998] flex items-center justify-center bg-white transition-all duration-500 ${
          loading ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-28 h-28 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>

          <img src="/images/logo.png" alt="logo" className="w-16 h-16" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
