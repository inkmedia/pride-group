"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import { useAdminNavigationLoader } from "@/components/admin/AdminNavigationProvider";

type AdminNavLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function AdminNavLink({
  children,
  className,
  target,
  rel,
  onClick,
  href,
  ...props
}: AdminNavLinkProps) {
  const pathname = usePathname();
  const { startNavigation } = useAdminNavigationLoader();

  const hrefValue = typeof href === "string" ? href : href.pathname || "";

  const isSamePage = pathname === hrefValue;
  const isNewTab = target === "_blank";

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) return;
        if (isSamePage) return;
        if (isNewTab) return;

        startNavigation();
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
