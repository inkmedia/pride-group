"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isProjectCity } from "@/lib/project-city";
import type { Project } from "@/types/project";
import { PROJECT_CITIES } from "@/types/project";
import ImageUploadField from "@/components/admin/ImageUploadField";
import AdminAccordion from "@/components/admin/AdminAccordion";

type Props = {
  project: Project;
  mode: "create" | "edit";
};

type StatRow = {
  value: string;
  label: string;
};

type MediaBadgeRow = {
  value: string;
  label: string;
  position: "top-right" | "bottom-left";
};

type AmenityCategoryRow = {
  title: string;
  items: string[];
};

type SpecRow = {
  title: string;
  content: string[];
};

type GalleryImageRow = {
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
  poster?: string;
};

type GalleryTabRow = {
  title: string;
  anchorId: string;
  layout: "carousel" | "grid";
  images: GalleryImageRow[];
};

type ConnectivityItemRow = {
  name: string;
  distance: string;
};

type ConnectivityGroupRow = {
  title: string;
  items: ConnectivityItemRow[];
};

type ReraItemRow = {
  title: string;
  number: string;
  qrSrc: string;
};

type UploadGuide = {
  resolution: string;
  formats: string;
  recommendedSize: string;
  maxSize: string;
};

const UPLOAD_GUIDES = {
  seo: {
    resolution: "1200x630 preferred",
    formats: "JPG / JPEG / WebP",
    recommendedSize: "150KB–300KB",
    maxSize: "500KB",
  },
  overviewLogo: {
    resolution: "400x400 or SVG equivalent",
    formats: "PNG / JPG / WebP",
    recommendedSize: "50KB–150KB",
    maxSize: "250KB",
  },
  overviewImage: {
    resolution: "1600px wide preferred",
    formats: "JPG / JPEG / WebP",
    recommendedSize: "200KB–400KB",
    maxSize: "600KB",
  },
  feature: {
    resolution: "1600px wide preferred",
    formats: "JPG / JPEG / WebP",
    recommendedSize: "200KB–400KB",
    maxSize: "600KB",
  },
  gallery: {
    resolution: "1920x1080",
    formats: "JPG / JPEG / WebP",
    recommendedSize: "250KB–500KB",
    maxSize: "800KB",
  },
  galleryPoster: {
    resolution: "1280x720 or 1920x1080",
    formats: "JPG / JPEG / WebP",
    recommendedSize: "150KB–300KB",
    maxSize: "500KB",
  },
  rera: {
    resolution: "500x500 or 600x600",
    formats: "PNG only",
    recommendedSize: "80KB–250KB",
    maxSize: "400KB",
  },
} satisfies Record<string, UploadGuide>;

function moveItem<T>(list: T[], from: number, to: number) {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= list.length ||
    to >= list.length
  ) {
    return list;
  }

  const updated = [...list];
  const [moved] = updated.splice(from, 1);
  updated.splice(to, 0, moved);
  return updated;
}

export default function ProjectEditForm({ project, mode }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    slug: project.slug || "",
    title: project.title || "",
    city: project.city || "",
    location: project.location || "",

    seoMetaTitle: project.seo?.metaTitle || "",
    seoMetaDescription: project.seo?.metaDescription || "",
    seoMetaImage: project.seo?.metaImage || "",

    heroType: project.hero.type || "image",
    heroHeading: project.hero.heading || "",
    heroSrc:
      project.hero.type === "image" || project.hero.type === "video"
        ? project.hero.src
        : "",
    heroImages:
      project.hero.type === "carousel" ? project.hero.images.join("\n") : "",

    overviewCategory: project.overview.category || "",
    overviewStatus: project.overview.status || "",
    overviewSubtitle: project.overview.subtitle || "",
    overviewLocation: project.overview.location || "",
    overviewDescription: project.overview.description || "",
    overviewLogoSrc: project.overview.logoSrc || "",
    overviewImageSrc: project.overview.imageSrc || "",
    overviewImageAlt: project.overview.imageAlt || "",

    amenitiesTitle: project.details.amenities?.title || "",
    amenitiesMiscTitle: project.details.amenities?.miscTitle || "",

    connectivityTitle: project.details.connectivity?.title || "",

    ctaTitle: project.cta?.title || "",
    ctaDescription: project.cta?.description || "",
    ctaPrimaryLabel: project.cta?.primaryLabel || "",
    ctaPrimaryHref: project.cta?.primaryHref || "",
    ctaSecondaryLabel: project.cta?.secondaryLabel || "",
    ctaSecondaryHref: project.cta?.secondaryHref || "",

    reraNote: project.rera?.note || "",
    reraWebsiteUrl: project.rera?.websiteUrl || "",
  });

  const [stats, setStats] = useState<StatRow[]>(
    project.overview.stats?.length
      ? project.overview.stats.map((item) => ({
          value: item.value,
          label: item.label,
        }))
      : [{ value: "", label: "" }],
  );

  const [highlights, setHighlights] = useState<string[]>(
    project.overview.highlights?.length ? project.overview.highlights : [""],
  );

  const [overviewAmenities, setOverviewAmenities] = useState<string[]>(
    project.overview.amenities?.length ? project.overview.amenities : [""],
  );

  const [mediaBadges, setMediaBadges] = useState<MediaBadgeRow[]>(
    project.overview.mediaBadges?.length
      ? project.overview.mediaBadges.map((item) => ({
          value: item.value,
          label: item.label,
          position: item.position || "top-right",
        }))
      : [{ value: "", label: "", position: "top-right" }],
  );

  const [featureImages, setFeatureImages] = useState<string[]>(
    project.features?.images?.length ? project.features.images : [""],
  );

  const [amenityCategories, setAmenityCategories] = useState<
    AmenityCategoryRow[]
  >(
    project.details.amenities?.categories?.length
      ? project.details.amenities.categories.map((cat) => ({
          title: cat.title,
          items: cat.items?.length ? cat.items : [""],
        }))
      : [{ title: "", items: [""] }],
  );

  const [miscAmenities, setMiscAmenities] = useState<string[]>(
    project.details.amenities?.miscItems?.length
      ? project.details.amenities.miscItems
      : [""],
  );

  const [specifications, setSpecifications] = useState<SpecRow[]>(
    project.details.specifications?.length
      ? project.details.specifications.map((spec) => ({
          title: spec.title,
          content: spec.content?.length ? spec.content : [""],
        }))
      : [{ title: "", content: [""] }],
  );

  const [galleryTabs, setGalleryTabs] = useState<GalleryTabRow[]>(
    project.details.galleryTabs?.length
      ? project.details.galleryTabs.map((tab) => ({
          title: tab.title,
          anchorId: tab.anchorId || "",
          layout: tab.layout || "carousel",
          images: tab.images?.length
            ? tab.images.map((img) => ({
                src: img.src,
                alt: img.alt || "",
                caption: img.caption || "",
                type: img.type || "image",
                poster: img.poster || "",
              }))
            : [{ src: "", alt: "", caption: "", type: "image", poster: "" }],
        }))
      : [
          {
            title: "",
            anchorId: "",
            layout: "carousel",
            images: [
              { src: "", alt: "", caption: "", type: "image", poster: "" },
            ],
          },
        ],
  );

  const [connectivityGroups, setConnectivityGroups] = useState<
    ConnectivityGroupRow[]
  >(
    project.details.connectivity?.groups?.length
      ? project.details.connectivity.groups.map((group) => ({
          title: group.title,
          items: group.items?.length
            ? group.items.map((item) => ({
                name: item.name,
                distance: item.distance,
              }))
            : [{ name: "", distance: "" }],
        }))
      : [{ title: "", items: [{ name: "", distance: "" }] }],
  );

  const [reraItems, setReraItems] = useState<ReraItemRow[]>(
    project.rera?.items?.length
      ? project.rera.items.map((item) => ({
          title: item.title,
          number: item.number,
          qrSrc: item.qrSrc,
        }))
      : [{ title: "", number: "", qrSrc: "" }],
  );

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function updateStringList(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
  ) {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  }

  function addStringItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value = "",
  ) {
    setter((prev) => [...prev, value]);
  }

  function removeStringItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) {
    setter((prev) => prev.filter((_, i) => i !== index));
  }

  function moveStringItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    direction: "up" | "down",
  ) {
    setter((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function updateStat(index: number, key: keyof StatRow, value: string) {
    setStats((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  }

  function addStat() {
    setStats((prev) => [...prev, { value: "", label: "" }]);
  }

  function removeStat(index: number) {
    setStats((prev) => prev.filter((_, i) => i !== index));
  }

  function moveStat(index: number, direction: "up" | "down") {
    setStats((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function updateMediaBadge(
    index: number,
    key: keyof MediaBadgeRow,
    value: string,
  ) {
    setMediaBadges((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [key]:
                key === "position"
                  ? (value as "top-right" | "bottom-left")
                  : value,
            }
          : item,
      ),
    );
  }

  function addMediaBadge() {
    setMediaBadges((prev) => [
      ...prev,
      { value: "", label: "", position: "top-right" },
    ]);
  }

  function removeMediaBadge(index: number) {
    setMediaBadges((prev) => prev.filter((_, i) => i !== index));
  }

  function moveMediaBadge(index: number, direction: "up" | "down") {
    setMediaBadges((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function updateFeatureImage(index: number, value: string) {
    setFeatureImages((prev) =>
      prev.map((item, i) => (i === index ? value : item)),
    );
  }

  function addFeatureImage() {
    setFeatureImages((prev) => [...prev, ""]);
  }

  function removeFeatureImage(index: number) {
    setFeatureImages((prev) => prev.filter((_, i) => i !== index));
  }

  function moveFeatureImage(index: number, direction: "up" | "down") {
    setFeatureImages((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function updateAmenityCategoryTitle(index: number, value: string) {
    setAmenityCategories((prev) =>
      prev.map((cat, i) => (i === index ? { ...cat, title: value } : cat)),
    );
  }

  function updateAmenityCategoryItem(
    categoryIndex: number,
    itemIndex: number,
    value: string,
  ) {
    setAmenityCategories((prev) =>
      prev.map((cat, i) =>
        i === categoryIndex
          ? {
              ...cat,
              items: cat.items.map((item, idx) =>
                idx === itemIndex ? value : item,
              ),
            }
          : cat,
      ),
    );
  }

  function addAmenityCategory() {
    setAmenityCategories((prev) => [...prev, { title: "", items: [""] }]);
  }

  function removeAmenityCategory(index: number) {
    setAmenityCategories((prev) => prev.filter((_, i) => i !== index));
  }

  function moveAmenityCategory(index: number, direction: "up" | "down") {
    setAmenityCategories((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function addAmenityCategoryItem(categoryIndex: number) {
    setAmenityCategories((prev) =>
      prev.map((cat, i) =>
        i === categoryIndex ? { ...cat, items: [...cat.items, ""] } : cat,
      ),
    );
  }

  function removeAmenityCategoryItem(categoryIndex: number, itemIndex: number) {
    setAmenityCategories((prev) =>
      prev.map((cat, i) =>
        i === categoryIndex
          ? { ...cat, items: cat.items.filter((_, idx) => idx !== itemIndex) }
          : cat,
      ),
    );
  }

  function moveAmenityCategoryItem(
    categoryIndex: number,
    itemIndex: number,
    direction: "up" | "down",
  ) {
    setAmenityCategories((prev) =>
      prev.map((cat, i) =>
        i === categoryIndex
          ? {
              ...cat,
              items: moveItem(
                cat.items,
                itemIndex,
                direction === "up" ? itemIndex - 1 : itemIndex + 1,
              ),
            }
          : cat,
      ),
    );
  }

  function updateSpecTitle(index: number, value: string) {
    setSpecifications((prev) =>
      prev.map((item, i) => (i === index ? { ...item, title: value } : item)),
    );
  }

  function updateSpecContent(
    specIndex: number,
    contentIndex: number,
    value: string,
  ) {
    setSpecifications((prev) =>
      prev.map((spec, i) =>
        i === specIndex
          ? {
              ...spec,
              content: spec.content.map((item, idx) =>
                idx === contentIndex ? value : item,
              ),
            }
          : spec,
      ),
    );
  }

  function addSpecification() {
    setSpecifications((prev) => [...prev, { title: "", content: [""] }]);
  }

  function removeSpecification(index: number) {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  }

  function moveSpecification(index: number, direction: "up" | "down") {
    setSpecifications((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function addSpecContent(specIndex: number) {
    setSpecifications((prev) =>
      prev.map((spec, i) =>
        i === specIndex ? { ...spec, content: [...spec.content, ""] } : spec,
      ),
    );
  }

  function removeSpecContent(specIndex: number, contentIndex: number) {
    setSpecifications((prev) =>
      prev.map((spec, i) =>
        i === specIndex
          ? {
              ...spec,
              content: spec.content.filter((_, idx) => idx !== contentIndex),
            }
          : spec,
      ),
    );
  }

  function moveSpecContent(
    specIndex: number,
    contentIndex: number,
    direction: "up" | "down",
  ) {
    setSpecifications((prev) =>
      prev.map((spec, i) =>
        i === specIndex
          ? {
              ...spec,
              content: moveItem(
                spec.content,
                contentIndex,
                direction === "up" ? contentIndex - 1 : contentIndex + 1,
              ),
            }
          : spec,
      ),
    );
  }

  function updateGalleryTab(
    index: number,
    key: keyof GalleryTabRow,
    value: string,
  ) {
    setGalleryTabs((prev) =>
      prev.map((tab, i) =>
        i === index
          ? {
              ...tab,
              [key]: key === "layout" ? (value as "carousel" | "grid") : value,
            }
          : tab,
      ),
    );
  }

  function addGalleryTab() {
    setGalleryTabs((prev) => [
      ...prev,
      {
        title: "",
        anchorId: "",
        layout: "carousel",
        images: [{ src: "", alt: "", caption: "", type: "image", poster: "" }],
      },
    ]);
  }

  function removeGalleryTab(index: number) {
    setGalleryTabs((prev) => prev.filter((_, i) => i !== index));
  }

  function moveGalleryTab(index: number, direction: "up" | "down") {
    setGalleryTabs((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function updateGalleryImage(
    tabIndex: number,
    imageIndex: number,
    key: keyof GalleryImageRow,
    value: string,
  ) {
    setGalleryTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIndex
          ? {
              ...tab,
              images: tab.images.map((img, idx) =>
                idx === imageIndex
                  ? {
                      ...img,
                      [key]:
                        key === "type" ? (value as "image" | "video") : value,
                    }
                  : img,
              ),
            }
          : tab,
      ),
    );
  }

  function addGalleryImage(tabIndex: number) {
    setGalleryTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIndex
          ? {
              ...tab,
              images: [
                ...tab.images,
                { src: "", alt: "", caption: "", type: "image", poster: "" },
              ],
            }
          : tab,
      ),
    );
  }

  function removeGalleryImage(tabIndex: number, imageIndex: number) {
    setGalleryTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIndex
          ? {
              ...tab,
              images: tab.images.filter((_, idx) => idx !== imageIndex),
            }
          : tab,
      ),
    );
  }

  function moveGalleryImage(
    tabIndex: number,
    imageIndex: number,
    direction: "up" | "down",
  ) {
    setGalleryTabs((prev) =>
      prev.map((tab, i) =>
        i === tabIndex
          ? {
              ...tab,
              images: moveItem(
                tab.images,
                imageIndex,
                direction === "up" ? imageIndex - 1 : imageIndex + 1,
              ),
            }
          : tab,
      ),
    );
  }

  function updateConnectivityGroupTitle(index: number, value: string) {
    setConnectivityGroups((prev) =>
      prev.map((group, i) =>
        i === index ? { ...group, title: value } : group,
      ),
    );
  }

  function addConnectivityGroup() {
    setConnectivityGroups((prev) => [
      ...prev,
      { title: "", items: [{ name: "", distance: "" }] },
    ]);
  }

  function removeConnectivityGroup(index: number) {
    setConnectivityGroups((prev) => prev.filter((_, i) => i !== index));
  }

  function moveConnectivityGroup(index: number, direction: "up" | "down") {
    setConnectivityGroups((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  function updateConnectivityItem(
    groupIndex: number,
    itemIndex: number,
    key: keyof ConnectivityItemRow,
    value: string,
  ) {
    setConnectivityGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
              ...group,
              items: group.items.map((item, idx) =>
                idx === itemIndex ? { ...item, [key]: value } : item,
              ),
            }
          : group,
      ),
    );
  }

  function addConnectivityItem(groupIndex: number) {
    setConnectivityGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
              ...group,
              items: [...group.items, { name: "", distance: "" }],
            }
          : group,
      ),
    );
  }

  function removeConnectivityItem(groupIndex: number, itemIndex: number) {
    setConnectivityGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
              ...group,
              items: group.items.filter((_, idx) => idx !== itemIndex),
            }
          : group,
      ),
    );
  }

  function moveConnectivityItem(
    groupIndex: number,
    itemIndex: number,
    direction: "up" | "down",
  ) {
    setConnectivityGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
              ...group,
              items: moveItem(
                group.items,
                itemIndex,
                direction === "up" ? itemIndex - 1 : itemIndex + 1,
              ),
            }
          : group,
      ),
    );
  }

  function updateReraItem(
    index: number,
    key: keyof ReraItemRow,
    value: string,
  ) {
    setReraItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  }

  function addReraItem() {
    setReraItems((prev) => [...prev, { title: "", number: "", qrSrc: "" }]);
  }

  function removeReraItem(index: number) {
    setReraItems((prev) => prev.filter((_, i) => i !== index));
  }

  function moveReraItem(index: number, direction: "up" | "down") {
    setReraItems((prev) =>
      moveItem(prev, index, direction === "up" ? index - 1 : index + 1),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setErrorMessage("");

    if (!isProjectCity(formData.city)) {
      setErrorMessage("Please select a valid city for this project.");
      setIsSubmitting(false);
      return;
    }

    const cleanedPayload = {
      ...project,
      slug: formData.slug,
      title: formData.title,
      city: formData.city,
      location: formData.location,
      seo: {
        metaTitle: formData.seoMetaTitle,
        metaDescription: formData.seoMetaDescription,
        metaImage: formData.seoMetaImage,
      },
      hero:
        formData.heroType === "carousel"
          ? {
              type: "carousel" as const,
              heading: formData.heroHeading,
              images: formData.heroImages
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
            }
          : {
              type: formData.heroType as "image" | "video",
              heading: formData.heroHeading,
              src: formData.heroSrc,
            },
      overview: {
        ...project.overview,
        category: formData.overviewCategory,
        status: formData.overviewStatus,
        subtitle: formData.overviewSubtitle,
        location: formData.overviewLocation,
        description: formData.overviewDescription,
        logoSrc: formData.overviewLogoSrc,
        imageSrc: formData.overviewImageSrc,
        imageAlt: formData.overviewImageAlt,
        stats: stats
          .map((item) => ({
            value: item.value.trim(),
            label: item.label.trim(),
          }))
          .filter((item) => item.value || item.label),
        highlights: highlights.map((item) => item.trim()).filter(Boolean),
        amenities: overviewAmenities.map((item) => item.trim()).filter(Boolean),
        mediaBadges: mediaBadges
          .map((item) => ({
            value: item.value.trim(),
            label: item.label.trim(),
            position: item.position,
          }))
          .filter((item) => item.value || item.label),
      },
      features: {
        images: featureImages.map((item) => item.trim()).filter(Boolean),
      },
      details: {
        ...project.details,
        amenities: {
          title: formData.amenitiesTitle,
          categories: amenityCategories
            .map((cat) => ({
              title: cat.title.trim(),
              items: cat.items.map((item) => item.trim()).filter(Boolean),
            }))
            .filter((cat) => cat.title || cat.items.length),
          miscTitle: formData.amenitiesMiscTitle,
          miscItems: miscAmenities.map((item) => item.trim()).filter(Boolean),
        },
        specifications: specifications
          .map((spec) => ({
            title: spec.title.trim(),
            content: spec.content.map((item) => item.trim()).filter(Boolean),
          }))
          .filter((spec) => spec.title || spec.content.length),
        galleryTabs: galleryTabs
          .map((tab) => ({
            title: tab.title.trim(),
            anchorId: tab.anchorId.trim(),
            layout: tab.layout,
            images: tab.images
              .map((img) => ({
                src: img.src.trim(),
                alt: img.alt.trim(),
                caption: img.caption.trim(),
                type: img.type,
                poster: img.poster?.trim() || undefined,
              }))
              .filter((img) => img.src),
          }))
          .filter((tab) => tab.title || tab.images.length),
        connectivity: {
          title: formData.connectivityTitle,
          groups: connectivityGroups
            .map((group) => ({
              title: group.title.trim(),
              items: group.items
                .map((item) => ({
                  name: item.name.trim(),
                  distance: item.distance.trim(),
                }))
                .filter((item) => item.name || item.distance),
            }))
            .filter((group) => group.title || group.items.length),
        },
      },
      cta: {
        title: formData.ctaTitle,
        description: formData.ctaDescription,
        primaryLabel: formData.ctaPrimaryLabel,
        primaryHref: formData.ctaPrimaryHref,
        secondaryLabel: formData.ctaSecondaryLabel || undefined,
        secondaryHref: formData.ctaSecondaryHref || undefined,
      },
      rera: {
        note: formData.reraNote,
        websiteUrl: formData.reraWebsiteUrl,
        items: reraItems
          .map((item) => ({
            title: item.title.trim(),
            number: item.number.trim(),
            qrSrc: item.qrSrc.trim(),
          }))
          .filter((item) => item.title || item.number || item.qrSrc),
      },
    };

    try {
      const isCreateMode = mode === "create";
      const endpoint = isCreateMode
        ? "/api/admin/projects"
        : `/api/admin/projects/${encodeURIComponent(project.slug)}`;

      const response = await fetch(endpoint, {
        method: isCreateMode ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedPayload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to save project.");
      }

      const savedSlug =
        typeof data?.project?.slug === "string"
          ? data.project.slug
          : cleanedPayload.slug;

      setMessage(
        isCreateMode
          ? "Project created successfully."
          : "Project updated successfully.",
      );

      if (isCreateMode || savedSlug !== project.slug) {
        router.replace(`/admin/projects/${savedSlug}/edit`);
        router.refresh();
        return;
      }

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save project.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <AdminAccordion
        number="01"
        title="Basic Info"
        sectionId="basic-info"
        defaultOpen
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Slug">
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <Field label="Project Title">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <Field label="City">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="admin-input"
            >
              <option value="">Select city</option>
              {PROJECT_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>

          <div className="md:col-span-3">
            <Field label="Location">
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="admin-input"
              />
            </Field>
          </div>
        </div>
      </AdminAccordion>

      <AdminAccordion number="02" title="SEO" sectionId="seo">
        <div className="grid gap-4">
          <Field label="Meta Title (Between 50-60 characters is ideal for SEO)">
            <input
              name="seoMetaTitle"
              value={formData.seoMetaTitle}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <Field label="Meta Description (Between 150-160 characters is ideal for SEO)">
            <textarea
              name="seoMetaDescription"
              value={formData.seoMetaDescription}
              onChange={handleChange}
              className="admin-textarea"
              rows={4}
            />
          </Field>

          <AdminImageField
            label="Meta Image"
            value={formData.seoMetaImage}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, seoMetaImage: value }))
            }
            accept="image/jpeg,image/jpg,image/webp"
            guide={UPLOAD_GUIDES.seo}
          />
        </div>
      </AdminAccordion>

      <AdminAccordion number="03" title="Hero" sectionId="hero">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Hero Type">
            <select
              name="heroType"
              value={formData.heroType}
              onChange={handleChange}
              className="admin-input"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="carousel">Carousel</option>
            </select>
          </Field>

          <Field label="Hero Heading">
            <input
              name="heroHeading"
              value={formData.heroHeading}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          {(formData.heroType === "image" || formData.heroType === "video") && (
            <div className="md:col-span-2">
              <ImageUploadField
                label={
                  formData.heroType === "video" ? "Hero Video" : "Hero Image"
                }
                value={formData.heroSrc}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, heroSrc: value }))
                }
                accept={formData.heroType === "video" ? "video/*" : "image/*"}
              />
              {formData.heroType === "image" ? (
                <UploadNote>
                  Keep hero image lightweight. Recommended around 1600px wide,
                  JPG/WebP, ideally under 600KB.
                </UploadNote>
              ) : (
                <UploadNote>
                  Use compressed MP4/WebM videos only. Keep video size as small
                  as possible for smooth loading.
                </UploadNote>
              )}
            </div>
          )}

          {formData.heroType === "carousel" && (
            <div className="md:col-span-2">
              <Field label="Carousel Images (one per line)">
                <textarea
                  name="heroImages"
                  value={formData.heroImages}
                  onChange={handleChange}
                  className="admin-textarea"
                  rows={6}
                />
              </Field>
              <UploadNote>
                Use optimized JPG/WebP URLs. Recommended around 1600px wide and
                under 600KB each.
              </UploadNote>
            </div>
          )}
        </div>
      </AdminAccordion>

      <AdminAccordion number="04" title="Overview" sectionId="overview">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Category">
            <input
              name="overviewCategory"
              value={formData.overviewCategory}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <Field label="Status">
            <input
              name="overviewStatus"
              value={formData.overviewStatus}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Subtitle">
              <input
                name="overviewSubtitle"
                value={formData.overviewSubtitle}
                onChange={handleChange}
                className="admin-input"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Overview Location">
              <input
                name="overviewLocation"
                value={formData.overviewLocation}
                onChange={handleChange}
                className="admin-input"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Description">
              <textarea
                name="overviewDescription"
                value={formData.overviewDescription}
                onChange={handleChange}
                className="admin-textarea"
                rows={6}
              />
            </Field>
          </div>

          <div>
            <AdminImageField
              label="Overview Logo"
              value={formData.overviewLogoSrc}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, overviewLogoSrc: value }))
              }
              accept="image/png,image/jpeg,image/jpg,image/webp"
              guide={UPLOAD_GUIDES.overviewLogo}
            />
          </div>

          <div>
            <AdminImageField
              label="Overview Image"
              value={formData.overviewImageSrc}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, overviewImageSrc: value }))
              }
              accept="image/jpeg,image/jpg,image/webp"
              guide={UPLOAD_GUIDES.overviewImage}
            />
          </div>

          <div className="md:col-span-2">
            <Field label="Overview Image Alt">
              <input
                name="overviewImageAlt"
                value={formData.overviewImageAlt}
                onChange={handleChange}
                className="admin-input"
              />
            </Field>
          </div>
        </div>
      </AdminAccordion>

      <AdminAccordion
        number="05"
        title="Overview Arrays"
        sectionId="overview-arrays"
      >
        <div className="grid gap-6">
          <CardBlock
            title="Stats"
            description="Example: 14 Towers, 110+ Amenities"
            buttonLabel="Add Stat"
            onAdd={addStat}
          >
            {stats.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-[10px] border border-black/10 p-3 md:grid-cols-[0.8fr_1fr_auto_auto]"
              >
                <input
                  value={item.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  className="admin-input"
                  placeholder="14"
                />
                <input
                  value={item.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  className="admin-input"
                  placeholder="Towers"
                />
                <SortButtons
                  onMoveUp={() => moveStat(index, "up")}
                  onMoveDown={() => moveStat(index, "down")}
                  disableUp={index === 0}
                  disableDown={index === stats.length - 1}
                />
                <RemoveButton onClick={() => removeStat(index)} />
              </div>
            ))}
          </CardBlock>

          <CardBlock
            title="Highlights"
            description="One highlight per row"
            buttonLabel="Add Highlight"
            onAdd={() => addStringItem(setHighlights)}
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-[10px] border border-black/10 p-3 md:grid-cols-[1fr_auto_auto]"
              >
                <input
                  value={item}
                  onChange={(e) =>
                    updateStringList(setHighlights, index, e.target.value)
                  }
                  className="admin-input"
                />
                <SortButtons
                  onMoveUp={() => moveStringItem(setHighlights, index, "up")}
                  onMoveDown={() =>
                    moveStringItem(setHighlights, index, "down")
                  }
                  disableUp={index === 0}
                  disableDown={index === highlights.length - 1}
                />
                <RemoveButton
                  onClick={() => removeStringItem(setHighlights, index)}
                />
              </div>
            ))}
          </CardBlock>

          <CardBlock
            title="Overview Amenities"
            description="Short amenities shown in overview"
            buttonLabel="Add Amenity"
            onAdd={() => addStringItem(setOverviewAmenities)}
          >
            {overviewAmenities.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-[10px] border border-black/10 p-3 md:grid-cols-[1fr_auto_auto]"
              >
                <input
                  value={item}
                  onChange={(e) =>
                    updateStringList(
                      setOverviewAmenities,
                      index,
                      e.target.value,
                    )
                  }
                  className="admin-input"
                />
                <SortButtons
                  onMoveUp={() =>
                    moveStringItem(setOverviewAmenities, index, "up")
                  }
                  onMoveDown={() =>
                    moveStringItem(setOverviewAmenities, index, "down")
                  }
                  disableUp={index === 0}
                  disableDown={index === overviewAmenities.length - 1}
                />
                <RemoveButton
                  onClick={() => removeStringItem(setOverviewAmenities, index)}
                />
              </div>
            ))}
          </CardBlock>

          <CardBlock
            title="Media Badges"
            description="Badge overlays used on media"
            buttonLabel="Add Badge"
            onAdd={addMediaBadge}
          >
            {mediaBadges.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-[10px] border border-black/10 p-3 md:grid-cols-[0.8fr_1fr_0.9fr_auto_auto]"
              >
                <input
                  value={item.value}
                  onChange={(e) =>
                    updateMediaBadge(index, "value", e.target.value)
                  }
                  className="admin-input"
                />
                <input
                  value={item.label}
                  onChange={(e) =>
                    updateMediaBadge(index, "label", e.target.value)
                  }
                  className="admin-input"
                />
                <select
                  value={item.position}
                  onChange={(e) =>
                    updateMediaBadge(index, "position", e.target.value)
                  }
                  className="admin-input"
                >
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
                <SortButtons
                  onMoveUp={() => moveMediaBadge(index, "up")}
                  onMoveDown={() => moveMediaBadge(index, "down")}
                  disableUp={index === 0}
                  disableDown={index === mediaBadges.length - 1}
                />
                <RemoveButton onClick={() => removeMediaBadge(index)} />
              </div>
            ))}
          </CardBlock>
        </div>
      </AdminAccordion>

      <AdminAccordion number="06" title="Features Images" sectionId="features">
        <CardBlock
          title="Feature Gallery"
          description="Upload or paste image paths"
          buttonLabel="Add Image"
          onAdd={addFeatureImage}
        >
          {featureImages.map((item, index) => (
            <div
              key={index}
              className="rounded-[10px] border border-black/10 p-4"
            >
              <div className="grid gap-3">
                <AdminImageField
                  label={`Feature Image ${index + 1}`}
                  value={item}
                  onChange={(value) => updateFeatureImage(index, value)}
                  accept="image/jpeg,image/jpg,image/webp"
                  guide={UPLOAD_GUIDES.feature}
                />
                <div className="flex flex-wrap gap-2">
                  <SortButtons
                    onMoveUp={() => moveFeatureImage(index, "up")}
                    onMoveDown={() => moveFeatureImage(index, "down")}
                    disableUp={index === 0}
                    disableDown={index === featureImages.length - 1}
                  />
                  <RemoveButton onClick={() => removeFeatureImage(index)} />
                </div>
              </div>
            </div>
          ))}
        </CardBlock>
      </AdminAccordion>

      <AdminAccordion
        number="07"
        title="Detailed Amenities"
        sectionId="amenities"
      >
        <div className="grid gap-4">
          <Field label="Amenities Section Title">
            <input
              name="amenitiesTitle"
              value={formData.amenitiesTitle}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <CardBlock
            title="Amenity Categories"
            description="Examples: Wellness, Sports, Kids"
            buttonLabel="Add Category"
            onAdd={addAmenityCategory}
          >
            {amenityCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="rounded-[10px] border border-black/10 p-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                    <input
                      value={category.title}
                      onChange={(e) =>
                        updateAmenityCategoryTitle(
                          categoryIndex,
                          e.target.value,
                        )
                      }
                      className="admin-input"
                      placeholder="Category Title"
                    />
                    <SortButtons
                      onMoveUp={() => moveAmenityCategory(categoryIndex, "up")}
                      onMoveDown={() =>
                        moveAmenityCategory(categoryIndex, "down")
                      }
                      disableUp={categoryIndex === 0}
                      disableDown={
                        categoryIndex === amenityCategories.length - 1
                      }
                    />
                    <RemoveButton
                      onClick={() => removeAmenityCategory(categoryIndex)}
                    />
                  </div>

                  <div className="grid gap-3">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="grid gap-3 md:grid-cols-[1fr_auto_auto]"
                      >
                        <input
                          value={item}
                          onChange={(e) =>
                            updateAmenityCategoryItem(
                              categoryIndex,
                              itemIndex,
                              e.target.value,
                            )
                          }
                          className="admin-input"
                          placeholder="Amenity item"
                        />
                        <SortButtons
                          onMoveUp={() =>
                            moveAmenityCategoryItem(
                              categoryIndex,
                              itemIndex,
                              "up",
                            )
                          }
                          onMoveDown={() =>
                            moveAmenityCategoryItem(
                              categoryIndex,
                              itemIndex,
                              "down",
                            )
                          }
                          disableUp={itemIndex === 0}
                          disableDown={itemIndex === category.items.length - 1}
                        />
                        <RemoveButton
                          onClick={() =>
                            removeAmenityCategoryItem(categoryIndex, itemIndex)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => addAmenityCategoryItem(categoryIndex)}
                      className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardBlock>

          <Field label="Misc Section Title">
            <input
              name="amenitiesMiscTitle"
              value={formData.amenitiesMiscTitle}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <CardBlock
            title="Misc Amenities"
            description="Single list under misc section"
            buttonLabel="Add Misc Item"
            onAdd={() => addStringItem(setMiscAmenities)}
          >
            {miscAmenities.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-[10px] border border-black/10 p-3 md:grid-cols-[1fr_auto_auto]"
              >
                <input
                  value={item}
                  onChange={(e) =>
                    updateStringList(setMiscAmenities, index, e.target.value)
                  }
                  className="admin-input"
                />
                <SortButtons
                  onMoveUp={() => moveStringItem(setMiscAmenities, index, "up")}
                  onMoveDown={() =>
                    moveStringItem(setMiscAmenities, index, "down")
                  }
                  disableUp={index === 0}
                  disableDown={index === miscAmenities.length - 1}
                />
                <RemoveButton
                  onClick={() => removeStringItem(setMiscAmenities, index)}
                />
              </div>
            ))}
          </CardBlock>
        </div>
      </AdminAccordion>

      <AdminAccordion
        number="08"
        title="Specifications"
        sectionId="specifications"
      >
        <CardBlock
          title="Specifications List"
          description="Each block contains a title and multiple points"
          buttonLabel="Add Specification"
          onAdd={addSpecification}
        >
          {specifications.map((spec, specIndex) => (
            <div
              key={specIndex}
              className="rounded-[10px] border border-black/10 p-4"
            >
              <div className="grid gap-4">
                <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                  <input
                    value={spec.title}
                    onChange={(e) => updateSpecTitle(specIndex, e.target.value)}
                    className="admin-input"
                    placeholder="Flooring"
                  />
                  <SortButtons
                    onMoveUp={() => moveSpecification(specIndex, "up")}
                    onMoveDown={() => moveSpecification(specIndex, "down")}
                    disableUp={specIndex === 0}
                    disableDown={specIndex === specifications.length - 1}
                  />
                  <RemoveButton
                    onClick={() => removeSpecification(specIndex)}
                  />
                </div>

                <div className="grid gap-3">
                  {spec.content.map((item, contentIndex) => (
                    <div
                      key={contentIndex}
                      className="grid gap-3 md:grid-cols-[1fr_auto_auto]"
                    >
                      <textarea
                        value={item}
                        onChange={(e) =>
                          updateSpecContent(
                            specIndex,
                            contentIndex,
                            e.target.value,
                          )
                        }
                        className="admin-textarea"
                        rows={3}
                        placeholder="Specification detail"
                      />
                      <SortButtons
                        onMoveUp={() =>
                          moveSpecContent(specIndex, contentIndex, "up")
                        }
                        onMoveDown={() =>
                          moveSpecContent(specIndex, contentIndex, "down")
                        }
                        disableUp={contentIndex === 0}
                        disableDown={contentIndex === spec.content.length - 1}
                      />
                      <RemoveButton
                        onClick={() =>
                          removeSpecContent(specIndex, contentIndex)
                        }
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => addSpecContent(specIndex)}
                    className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                  >
                    Add Point
                  </button>
                </div>
              </div>
            </div>
          ))}
        </CardBlock>
      </AdminAccordion>

      <AdminAccordion number="09" title="Gallery Tabs" sectionId="gallery-tabs">
        <CardBlock
          title="Tabs"
          description="Gallery, Floor Plans, Master Plan, Construction Updates"
          buttonLabel="Add Tab"
          onAdd={addGalleryTab}
        >
          {galleryTabs.map((tab, tabIndex) => (
            <div
              key={tabIndex}
              className="rounded-[10px] border border-black/10 p-4"
            >
              <div className="grid gap-4">
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_220px_auto_auto]">
                  <input
                    value={tab.title}
                    onChange={(e) =>
                      updateGalleryTab(tabIndex, "title", e.target.value)
                    }
                    className="admin-input"
                    placeholder="Gallery"
                  />
                  <input
                    value={tab.anchorId}
                    onChange={(e) =>
                      updateGalleryTab(tabIndex, "anchorId", e.target.value)
                    }
                    className="admin-input"
                    placeholder="gallery"
                  />
                  <select
                    value={tab.layout}
                    onChange={(e) =>
                      updateGalleryTab(tabIndex, "layout", e.target.value)
                    }
                    className="admin-input"
                  >
                    <option value="carousel">Carousel</option>
                    <option value="grid">Grid</option>
                  </select>
                  <SortButtons
                    onMoveUp={() => moveGalleryTab(tabIndex, "up")}
                    onMoveDown={() => moveGalleryTab(tabIndex, "down")}
                    disableUp={tabIndex === 0}
                    disableDown={tabIndex === galleryTabs.length - 1}
                  />
                  <RemoveButton onClick={() => removeGalleryTab(tabIndex)} />
                </div>

                <div className="grid gap-4">
                  {tab.images.map((img, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="rounded-[10px] border border-black/10 p-4"
                    >
                      <div className="grid gap-4">
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <ImageUploadField
                              label={`Media ${imageIndex + 1}`}
                              value={img.src}
                              onChange={(value) =>
                                updateGalleryImage(
                                  tabIndex,
                                  imageIndex,
                                  "src",
                                  value,
                                )
                              }
                              accept={
                                img.type === "video"
                                  ? "video/*"
                                  : "image/jpeg,image/jpg,image/webp"
                              }
                            />
                            {img.type === "image" ? (
                              <UploadNote>
                                Standard: {UPLOAD_GUIDES.gallery.resolution} •{" "}
                                {UPLOAD_GUIDES.gallery.formats} • Recommended{" "}
                                {UPLOAD_GUIDES.gallery.recommendedSize} • Max{" "}
                                {UPLOAD_GUIDES.gallery.maxSize}
                              </UploadNote>
                            ) : (
                              <UploadNote>
                                Use compressed MP4/WebM. Keep file size low for
                                faster page loads.
                              </UploadNote>
                            )}
                          </div>

                          <div className="grid gap-4">
                            <Field label="Type">
                              <select
                                value={img.type}
                                onChange={(e) =>
                                  updateGalleryImage(
                                    tabIndex,
                                    imageIndex,
                                    "type",
                                    e.target.value,
                                  )
                                }
                                className="admin-input"
                              >
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                              </select>
                            </Field>

                            <Field label="Alt Text">
                              <input
                                value={img.alt}
                                onChange={(e) =>
                                  updateGalleryImage(
                                    tabIndex,
                                    imageIndex,
                                    "alt",
                                    e.target.value,
                                  )
                                }
                                className="admin-input"
                              />
                            </Field>

                            <Field label="Caption">
                              <input
                                value={img.caption}
                                onChange={(e) =>
                                  updateGalleryImage(
                                    tabIndex,
                                    imageIndex,
                                    "caption",
                                    e.target.value,
                                  )
                                }
                                className="admin-input"
                              />
                            </Field>

                            {img.type === "video" ? (
                              <div>
                                <ImageUploadField
                                  label="Poster Image"
                                  value={img.poster || ""}
                                  onChange={(value) =>
                                    updateGalleryImage(
                                      tabIndex,
                                      imageIndex,
                                      "poster",
                                      value,
                                    )
                                  }
                                  accept="image/jpeg,image/jpg,image/webp"
                                />
                                <UploadNote>
                                  Standard:{" "}
                                  {UPLOAD_GUIDES.galleryPoster.resolution} •{" "}
                                  {UPLOAD_GUIDES.galleryPoster.formats} •
                                  Recommended{" "}
                                  {UPLOAD_GUIDES.galleryPoster.recommendedSize}{" "}
                                  • Max {UPLOAD_GUIDES.galleryPoster.maxSize}
                                </UploadNote>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <SortButtons
                            onMoveUp={() =>
                              moveGalleryImage(tabIndex, imageIndex, "up")
                            }
                            onMoveDown={() =>
                              moveGalleryImage(tabIndex, imageIndex, "down")
                            }
                            disableUp={imageIndex === 0}
                            disableDown={imageIndex === tab.images.length - 1}
                          />
                          <RemoveButton
                            onClick={() =>
                              removeGalleryImage(tabIndex, imageIndex)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => addGalleryImage(tabIndex)}
                    className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                  >
                    Add Media
                  </button>
                </div>
              </div>
            </div>
          ))}
        </CardBlock>
      </AdminAccordion>

      <AdminAccordion number="10" title="Connectivity" sectionId="connectivity">
        <div className="grid gap-4">
          <Field label="Connectivity Section Title">
            <input
              name="connectivityTitle"
              value={formData.connectivityTitle}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <CardBlock
            title="Connectivity Groups"
            description="Examples: Schools, Hospitals, IT Parks"
            buttonLabel="Add Group"
            onAdd={addConnectivityGroup}
          >
            {connectivityGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="rounded-[10px] border border-black/10 p-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                    <input
                      value={group.title}
                      onChange={(e) =>
                        updateConnectivityGroupTitle(groupIndex, e.target.value)
                      }
                      className="admin-input"
                      placeholder="Group Title"
                    />
                    <SortButtons
                      onMoveUp={() => moveConnectivityGroup(groupIndex, "up")}
                      onMoveDown={() =>
                        moveConnectivityGroup(groupIndex, "down")
                      }
                      disableUp={groupIndex === 0}
                      disableDown={groupIndex === connectivityGroups.length - 1}
                    />
                    <RemoveButton
                      onClick={() => removeConnectivityGroup(groupIndex)}
                    />
                  </div>

                  <div className="grid gap-3">
                    {group.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="grid gap-3 md:grid-cols-[1fr_180px_auto_auto]"
                      >
                        <input
                          value={item.name}
                          onChange={(e) =>
                            updateConnectivityItem(
                              groupIndex,
                              itemIndex,
                              "name",
                              e.target.value,
                            )
                          }
                          className="admin-input"
                          placeholder="Location name"
                        />
                        <input
                          value={item.distance}
                          onChange={(e) =>
                            updateConnectivityItem(
                              groupIndex,
                              itemIndex,
                              "distance",
                              e.target.value,
                            )
                          }
                          className="admin-input"
                          placeholder="5 km"
                        />
                        <SortButtons
                          onMoveUp={() =>
                            moveConnectivityItem(groupIndex, itemIndex, "up")
                          }
                          onMoveDown={() =>
                            moveConnectivityItem(groupIndex, itemIndex, "down")
                          }
                          disableUp={itemIndex === 0}
                          disableDown={itemIndex === group.items.length - 1}
                        />
                        <RemoveButton
                          onClick={() =>
                            removeConnectivityItem(groupIndex, itemIndex)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => addConnectivityItem(groupIndex)}
                      className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardBlock>
        </div>
      </AdminAccordion>

      <AdminAccordion number="11" title="CTA" sectionId="cta">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="CTA Title">
              <input
                name="ctaTitle"
                value={formData.ctaTitle}
                onChange={handleChange}
                className="admin-input"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="CTA Description">
              <textarea
                name="ctaDescription"
                value={formData.ctaDescription}
                onChange={handleChange}
                className="admin-textarea"
                rows={4}
              />
            </Field>
          </div>

          <Field label="Primary Button Label">
            <input
              name="ctaPrimaryLabel"
              value={formData.ctaPrimaryLabel}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <Field label="Primary Button Href">
            <input
              name="ctaPrimaryHref"
              value={formData.ctaPrimaryHref}
              onChange={handleChange}
              className="admin-input"
              placeholder="/contact"
            />
          </Field>

          <Field label="Secondary Button Label">
            <input
              name="ctaSecondaryLabel"
              value={formData.ctaSecondaryLabel}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <Field label="Secondary Button Href">
            <input
              name="ctaSecondaryHref"
              value={formData.ctaSecondaryHref}
              onChange={handleChange}
              className="admin-input"
              placeholder="/contact"
            />
          </Field>
        </div>
      </AdminAccordion>

      <AdminAccordion number="12" title="RERA" sectionId="rera">
        <div className="grid gap-4">
          <Field label="RERA Note">
            <input
              name="reraNote"
              value={formData.reraNote}
              onChange={handleChange}
              className="admin-input"
            />
          </Field>

          <Field label="RERA Website URL">
            <input
              name="reraWebsiteUrl"
              value={formData.reraWebsiteUrl}
              onChange={handleChange}
              className="admin-input"
              placeholder="https://maharera.mahaonline.gov.in"
            />
          </Field>

          <CardBlock
            title="RERA Items"
            description="Each item contains title, number, and QR image"
            buttonLabel="Add RERA Item"
            onAdd={addReraItem}
          >
            {reraItems.map((item, index) => (
              <div
                key={index}
                className="rounded-[10px] border border-black/10 p-4"
              >
                <div className="grid gap-4">
                  <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
                    <Field label="Title">
                      <input
                        value={item.title}
                        onChange={(e) =>
                          updateReraItem(index, "title", e.target.value)
                        }
                        className="admin-input"
                        placeholder="Tower - A, B"
                      />
                    </Field>

                    <Field label="RERA Number">
                      <input
                        value={item.number}
                        onChange={(e) =>
                          updateReraItem(index, "number", e.target.value)
                        }
                        className="admin-input"
                        placeholder="P52100000000"
                      />
                    </Field>

                    <div className="self-end">
                      <SortButtons
                        onMoveUp={() => moveReraItem(index, "up")}
                        onMoveDown={() => moveReraItem(index, "down")}
                        disableUp={index === 0}
                        disableDown={index === reraItems.length - 1}
                      />
                    </div>

                    <div className="self-end">
                      <RemoveButton onClick={() => removeReraItem(index)} />
                    </div>
                  </div>

                  <AdminImageField
                    label={`QR Image ${index + 1}`}
                    value={item.qrSrc}
                    onChange={(value) => updateReraItem(index, "qrSrc", value)}
                    accept="image/png"
                    guide={UPLOAD_GUIDES.rera}
                  />
                </div>
              </div>
            ))}
          </CardBlock>
        </div>
      </AdminAccordion>

      <section className="sticky bottom-4 z-20 rounded-[10px] border border-black/10 bg-white/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[16px] font-[600] text-black">Save Changes</h3>
            <p className="mt-1 text-[13px] text-black/60">
              Review the updated project data and save when ready.
            </p>
            {errorMessage ? (
              <p className="mt-2 text-[13px] font-[500] text-red-600">
                {errorMessage}
              </p>
            ) : null}
            {message ? (
              <p className="mt-2 text-[13px] font-[500] text-[#172f55]">
                {message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-full bg-[#172f55] px-6 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Project"
                : "Save Project"}
          </button>
        </div>
      </section>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-[700] uppercase tracking-[0.08em] text-black/60">
        {label}
      </span>
      {children}
    </label>
  );
}

function UploadNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 text-[12px] leading-[1.6] text-black/55">{children}</p>
  );
}

function AdminImageField({
  label,
  value,
  onChange,
  accept,
  guide,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  guide: UploadGuide;
}) {
  return (
    <div>
      <ImageUploadField
        label={label}
        value={value}
        onChange={onChange}
        accept={accept}
      />
      <UploadNote>
        Standard: {guide.resolution} • {guide.formats} • Recommended{" "}
        {guide.recommendedSize} • Max {guide.maxSize}
      </UploadNote>
    </div>
  );
}

function CardBlock({
  title,
  description,
  buttonLabel,
  onAdd,
  children,
}: {
  title: string;
  description?: string;
  buttonLabel: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[10px] border border-black/10 bg-[#fcfcfc] p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-[16px] font-[600] text-black">{title}</h3>
          {description ? (
            <p className="mt-1 text-[13px] text-black/55">{description}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
        >
          {buttonLabel}
        </button>
      </div>

      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function SortButtons({
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
}: {
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onMoveUp}
        disabled={disableUp}
        className="inline-flex h-[42px] items-center justify-center rounded-full border border-black/15 px-4 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        Up
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={disableDown}
        className="inline-flex h-[42px] items-center justify-center rounded-full border border-black/15 px-4 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        Down
      </button>
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[42px] items-center justify-center rounded-full border border-red-200 px-4 text-[11px] font-[700] uppercase tracking-[0.08em] text-red-600 transition hover:bg-red-50"
    >
      Remove
    </button>
  );
}
