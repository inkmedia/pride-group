"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  slug: string;
  redirectTo?: string;
  className?: string;
};

export default function DeleteProjectButton({
  slug,
  redirectTo,
  className,
}: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${slug}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `/api/admin/projects/${encodeURIComponent(slug)}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete project.");
      }

      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Failed to delete project.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className={
        className ||
        "rounded-full border border-red-200 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
      }
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
