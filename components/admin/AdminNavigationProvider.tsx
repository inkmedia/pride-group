"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type AdminNavigationContextType = {
  isNavigating: boolean;
  startNavigation: () => void;
  stopNavigation: () => void;
};

const AdminNavigationContext = createContext<AdminNavigationContextType | null>(
  null,
);

export function AdminNavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = useCallback(() => {
    setIsNavigating(true);
  }, []);

  const stopNavigation = useCallback(() => {
    setIsNavigating(false);
  }, []);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const value = useMemo(
    () => ({
      isNavigating,
      startNavigation,
      stopNavigation,
    }),
    [isNavigating, startNavigation, stopNavigation],
  );

  return (
    <AdminNavigationContext.Provider value={value}>
      {children}
    </AdminNavigationContext.Provider>
  );
}

export function useAdminNavigationLoader() {
  const context = useContext(AdminNavigationContext);

  if (!context) {
    throw new Error(
      "useAdminNavigationLoader must be used inside AdminNavigationProvider",
    );
  }

  return context;
}
