"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "./TransitionProvider";

export default function TransitionLink({ href, children, ...props }: any) {
  const router = useRouter();
  const { startTransition, stopTransition } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    startTransition();

    setTimeout(() => {
      router.push(href);
      stopTransition();
    }, 500);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
