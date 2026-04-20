"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  note?: string;
  rules?: ValidationRules;
};

type ValidationRules = {
  allowedTypes?: string[];
  maxSizeBytes?: number;
  minWidth?: number;
  minHeight?: number;
};

type MediaFile = {
  name: string;
  url: string;
  type: "image" | "video" | "other";
  modifiedAt: number;
};

type TabType = "upload" | "gallery";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getAcceptedLabel(accept: string) {
  const value = accept.toLowerCase();

  if (value.includes("image/") && value.includes("video/")) {
    return "Accepted: images and videos";
  }

  if (
    value.includes("image/png") &&
    !value.includes("jpeg") &&
    !value.includes("jpg") &&
    !value.includes("webp")
  ) {
    return "Accepted: PNG only";
  }

  if (
    value.includes("image/jpeg") ||
    value.includes("image/jpg") ||
    value.includes("image/webp")
  ) {
    return "Accepted: JPG, JPEG, WebP";
  }

  if (value.includes("image/")) {
    return "Accepted: images only";
  }

  if (value.includes("video/")) {
    return "Accepted: videos only";
  }

  return `Accepted: ${accept}`;
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function isVideoFile(file: File) {
  return file.type.startsWith("video/");
}

function getImageDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const width = image.width;
      const height = image.height;
      URL.revokeObjectURL(objectUrl);
      resolve({ width, height });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to read image dimensions."));
    };

    image.src = objectUrl;
  });
}

async function validateSelectedFile(
  file: File,
  rules?: ValidationRules,
): Promise<string | null> {
  if (!rules) return null;

  if (rules.allowedTypes?.length && !rules.allowedTypes.includes(file.type)) {
    return `Invalid file format. Allowed: ${rules.allowedTypes.join(", ")}`;
  }

  if (rules.maxSizeBytes && file.size > rules.maxSizeBytes) {
    return `File is too large. Maximum allowed size is ${formatBytes(
      rules.maxSizeBytes,
    )}.`;
  }

  if ((rules.minWidth || rules.minHeight) && isImageFile(file)) {
    const { width, height } = await getImageDimensions(file);

    if (rules.minWidth && width < rules.minWidth) {
      return `Image width is too small. Minimum required width is ${rules.minWidth}px.`;
    }

    if (rules.minHeight && height < rules.minHeight) {
      return `Image height is too small. Minimum required height is ${rules.minHeight}px.`;
    }
  }

  return null;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  accept = "image/*,video/*",
  note,
  rules,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("upload");
  const [gallery, setGallery] = useState<MediaFile[]>([]);

  async function loadGallery() {
    setLoadingGallery(true);
    setError("");

    try {
      const res = await fetch("/api/admin/uploads", {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load gallery.");
        return;
      }

      setGallery(data.files || []);
    } catch {
      setError("Failed to load gallery.");
    } finally {
      setLoadingGallery(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    loadGallery();
  }, [isOpen]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const validationError = await validateSelectedFile(file, rules);

      if (validationError) {
        setError(validationError);
        return;
      }

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
      setActiveTab("gallery");
      await loadGallery();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  const fieldId = useMemo(
    () => `upload-${label.replace(/\s+/g, "-").toLowerCase()}`,
    [label],
  );

  const acceptedLabel = useMemo(() => getAcceptedLabel(accept), [accept]);

  return (
    <>
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
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setActiveTab("upload");
            }}
            className="cursor-pointer rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
          >
            Open Media Library
          </button>

          {value ? (
            <span className="break-all text-[12px] text-black/55">{value}</span>
          ) : null}
        </div>

        {note ? (
          <p className="text-[12px] leading-[1.6] text-black/55">{note}</p>
        ) : null}

        {error ? (
          <p className="text-[13px] font-[500] text-red-600">{error}</p>
        ) : null}

        {value ? (
          <div className="overflow-hidden rounded-[10px] border border-black/10 bg-[#fafafa] p-3">
            {/\.(mp4|webm|ogg|mov)$/i.test(value) ? (
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

      {isOpen ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 p-4">
          <div className="flex h-[80vh] w-[80vw] max-w-[1400px] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-[18px] font-[700] text-black sm:text-[20px]">
                  Insert Media
                </h3>
                <p className="mt-1 text-[12px] text-black/55">
                  Upload new files or choose from existing uploads
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 text-[20px] text-black transition hover:bg-black hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="border-b border-black/10 px-5 pt-4 sm:px-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className={`cursor-pointer rounded-t-[10px] px-4 py-2 text-[12px] font-[700] uppercase tracking-[0.08em] transition sm:px-5 ${
                    activeTab === "upload"
                      ? "bg-black text-white"
                      : "bg-black/5 text-black/60 hover:bg-black/10"
                  }`}
                >
                  Upload Files
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("gallery");
                    loadGallery();
                  }}
                  className={`cursor-pointer rounded-t-[10px] px-4 py-2 text-[12px] font-[700] uppercase tracking-[0.08em] transition sm:px-5 ${
                    activeTab === "gallery"
                      ? "bg-black text-white"
                      : "bg-black/5 text-black/60 hover:bg-black/10"
                  }`}
                >
                  Media Library
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {activeTab === "upload" ? (
                <div className="flex h-full min-h-[320px] items-center justify-center">
                  <div className="flex w-full max-w-[460px] flex-col items-center justify-center rounded-[10px] border border-dashed border-black/15 bg-[#fafafa] px-6 py-10 text-center">
                    <p className="text-[18px] font-[700] text-black">
                      Upload new media
                    </p>

                    <p className="mt-2 text-[14px] leading-[1.6] text-black/55">
                      Choose a supported file from your device
                    </p>

                    <input
                      ref={inputRef}
                      type="file"
                      accept={accept}
                      onChange={handleFileChange}
                      className="hidden"
                      id={fieldId}
                    />

                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="mt-6 cursor-pointer rounded-full bg-black px-6 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                    >
                      {uploading ? "Uploading..." : "Choose File"}
                    </button>

                    <p className="mt-3 text-[12px] text-black/45">
                      {acceptedLabel}
                    </p>

                    {note ? (
                      <p className="mt-2 max-w-[360px] text-[12px] leading-[1.6] text-black/45">
                        {note}
                      </p>
                    ) : null}

                    {rules?.maxSizeBytes ? (
                      <p className="mt-1 text-[12px] text-black/45">
                        Max file size: {formatBytes(rules.maxSizeBytes)}
                      </p>
                    ) : null}

                    {rules?.minWidth || rules?.minHeight ? (
                      <p className="mt-1 text-[12px] text-black/45">
                        Minimum dimensions: {rules?.minWidth || 0}px ×{" "}
                        {rules?.minHeight || 0}px
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-[14px] font-[600] text-black/70">
                      {loadingGallery
                        ? "Loading uploads..."
                        : `${gallery.length} file${gallery.length !== 1 ? "s" : ""} found`}
                    </p>

                    <button
                      type="button"
                      onClick={loadGallery}
                      className="cursor-pointer rounded-full border border-black/10 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                    >
                      Refresh
                    </button>
                  </div>

                  {loadingGallery ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <div
                          key={index}
                          className="aspect-square animate-pulse rounded-[10px] bg-black/5"
                        />
                      ))}
                    </div>
                  ) : gallery.length === 0 ? (
                    <div className="flex min-h-[300px] items-center justify-center rounded-[10px] border border-dashed border-black/15 bg-[#fafafa]">
                      <p className="text-[14px] text-black/55">
                        No uploaded images or videos found.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {gallery.map((item) => {
                        const isSelected = value === item.url;

                        return (
                          <button
                            key={item.url}
                            type="button"
                            onClick={() => {
                              onChange(item.url);
                              setIsOpen(false);
                            }}
                            className={`group cursor-pointer overflow-hidden rounded-[5px] border bg-white text-left transition ${
                              isSelected
                                ? "border-[#172f55]/30 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                                : "border-black/10 hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                            }`}
                          >
                            <div className="relative aspect-square overflow-hidden bg-black/5">
                              {item.type === "video" ? (
                                <video
                                  src={item.url}
                                  className="h-full w-full object-cover"
                                  muted
                                />
                              ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={item.url}
                                  alt={item.name}
                                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                />
                              )}

                              <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-[700] uppercase tracking-[0.08em] text-white">
                                {item.type}
                              </div>
                            </div>

                            <div className="p-3">
                              <p className="line-clamp-2 break-all text-[12px] font-[600] text-black">
                                {item.name}
                              </p>
                              <p className="mt-1 text-[11px] text-black/45">
                                Click to select
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
