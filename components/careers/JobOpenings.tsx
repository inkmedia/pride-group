"use client";

import Script from "next/script";

export default function JobOpenings() {
  return (
    <section className="my-10 py-10 bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-3xl font-semibold md:text-4xl">
          Job Openings
        </h2>

        <Script id="keka-config" strategy="afterInteractive">
          {`
            window.khConfig = {
              identifier: 'c4b14dd3-d678-47a5-9297-9fc679d8a35f',
              domain: 'https://pridegroup.keka.com/careers/',
              targetContainer: '#khembedjobs'
            };
          `}
        </Script>

        <Script
          src="https://pridegroup.keka.com/careers/api/embedjobs/js/c4b14dd3-d678-47a5-9297-9fc679d8a35f"
          strategy="afterInteractive"
        />

        <div id="khembedjobs"></div>
      </div>

      <style jsx global>{`
        .kh-text-secondary {
          color: #6c757d !important;
          display: none;
        }

        #khembedjobs img[src*="keka"],
        #khembedjobs .kh-powered-by,
        #khembedjobs .kh-branding,
        #khembedjobs .kh-brand-logo {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
