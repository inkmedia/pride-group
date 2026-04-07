"use client";

import { useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
};

export default function ImageUploadField({
  label,
  value,
  onChange,
  accept = "image/*,video/*",
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed.");
        setUploading(false);
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="grid gap-3">
      <label className="block">
        <span className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/60">
          {label}
        </span>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input"
          placeholder="/uploads/example.jpg"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {value ? (
          <span className="text-[12px] text-black/55 break-all">{value}</span>
        ) : null}
      </div>

      {error ? (
        <p className="text-[13px] font-[500] text-red-600">{error}</p>
      ) : null}

      {value ? (
        <div className="overflow-hidden rounded-[14px] border border-black/10 bg-[#fafafa] p-3">
          {/\.(mp4|webm|ogg)$/i.test(value) ? (
            <video
              src={value}
              controls
              className="max-h-[220px] w-full rounded-[10px]"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="max-h-[220px] w-auto rounded-[10px] object-cover"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
