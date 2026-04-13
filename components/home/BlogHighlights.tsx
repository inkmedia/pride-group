"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BlogPost = {
  title: string;
  excerpt: string;
  href: string;
};

const posts: BlogPost[] = [
  {
    title: "6 Perks of Buying a Villa Plot on Bannerghatta Road",
    excerpt:
      "Buying a villa plot is not just a real estate decision. It is a long-term investment in lifestyle, freedom, and value appreciation. In Bengaluru, plots on Bannerghatta Road have emerged as one of the most ...",
    href: "#",
  },
  {
    title:
      "Inside Euphora: The Design and Detailing Behind Pride’s Signature Residence",
    excerpt:
      "As you wake up to a pleasant sun-kissed morning, with birds chirping on your balcony, the city feels distant, yet close...",
    href: "#",
  },
  {
    title:
      "The Pride Touch: Decoding the Signature Detailing in Every Corner of Euphora",
    excerpt:
      "As one of the leading real estate developers in Bangalore, a question we often asked ourselves and were asked at was, 'What truly defines a home as sophisticated and elite?'",
    href: "#",
  },
  {
    title: "6 Perks of Buying a Villa Plot on Bannerghatta Road",
    excerpt:
      "Buying a villa plot is not just a real estate decision. It is a long-term investment in lifestyle, freedom, and value appreciation. In Bengaluru, plots on Bannerghatta Road have emerged as one of the most ...",
    href: "#",
  },
];

function BlogCard({
  post,
  index,
  visible,
}: {
  post: BlogPost;
  index: number;
  visible: boolean;
}) {
  return (
    <article
      className={`flex h-full min-h-[220px] flex-col justify-between bg-[#e9ebf0] p-5 transition-all duration-700 ease-out sm:min-h-[240px] sm:p-6 md:min-h-[250px] md:p-8 lg:p-10 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[40px] opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div>
        <h3 className="max-w-[520px] text-[20px] font-semibold leading-[1.25] text-[#2e2e2e] sm:text-[22px] md:text-[24px]">
          {post.title}
        </h3>

        <p className="mt-4 max-w-[520px] text-[14px] leading-[1.7] text-[#4a4a4a] sm:mt-5 sm:text-[15px] md:mt-6 md:leading-[1.6]">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-8 flex justify-start sm:mt-10 md:justify-end">
        <Link
          href={post.href}
          className="text-[14px] font-semibold orange underline underline-offset-4 transition hover:opacity-80 sm:text-[15px] md:text-[16px]"
        >
          Read the Full Blog
        </Link>
      </div>
    </article>
  );
}

export default function BlogHighlights() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div className="mx-auto grid grid-cols-1 lg:min-h-screen lg:grid-cols-[340px_1fr] xl:grid-cols-[420px_1fr]">
        {/* LEFT PANEL */}
        <div className="flex bg-[#17335f] px-5 py-12 sm:px-8 sm:py-14 md:px-10 lg:px-12 lg:py-20 xl:px-16 xl:py-24">
          <div className="m-auto">
            <h2 className="text-[28px] leading-[1.15] text-white sm:text-[32px] md:text-[34px] lg:text-[36px]">
              Ideas, Insights & Updates from Our Blogs
            </h2>

            <p className="mt-4 text-[15px] leading-[1.7] text-white/90 sm:text-[16px] md:text-[17px] lg:text-[18px]">
              Thoughts, perspectives, and updates from Pride.
            </p>
          </div>
        </div>

        {/* RIGHT GRID */}
        <div
          ref={ref}
          className="flex items-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-14"
        >
          <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <BlogCard
                key={`${post.title}-${index}`}
                post={post}
                index={index}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
