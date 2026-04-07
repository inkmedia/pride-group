"use client";

import { useState } from "react";
import Image from "next/image";

type TeamMember = {
  name: string;
  role?: string;
  image?: string;
};

type ActiveTab = "board" | "management";

const boardOfDirectors: TeamMember[] = [
  {
    name: "Arvind Jain",
    role: "MD",
    image: "/images/user.jpg",
  },
  {
    name: "DP Jain",
    role: "-",
    image: "/images/user.jpg",
  },
  {
    name: "Nidhi Jain",
    role: "MBA Finance",
    image: "/images/user.jpg",
  },
  {
    name: "ML Saraogi",
    role: "-",
    image: "/images/user.jpg",
  },
];

const managementTeam: TeamMember[] = [
  {
    name: "Rishabh Jain",
    role: "VP / Director of Business Development - Pune",
    image: "/images/user.jpg",
  },
  {
    name: "CB Kulkarni",
    role: "VP Engineering - Pune",
    image: "/images/user.jpg",
  },
  {
    name: "Sarika Taori",
    role: "VP Legal - Pune",
    image: "/images/user.jpg",
  },
  {
    name: "Vivek Singh",
    role: "VP Sales and CRM - Pune",
    image: "/images/user.jpg",
  },
  {
    name: "Sushant Kokate",
    role: "AVP Marketing and Strategy - Pune",
    image: "/images/user.jpg",
  },
  {
    name: "Raj Gupta",
    role: "CFO - Pune",
    image: "/images/user.jpg",
  },
  {
    name: "Mahesh Goyal",
    role: "Director / Partner - Bangalore",
    image: "/images/user.jpg",
  },
  {
    name: "Ravi",
    role: "Director / Partner - Bangalore",
    image: "/images/user.jpg",
  },
  {
    name: "Siddhart Rajgharia",
    role: "Director / Partner - Bangalore",
    image: "/images/user.jpg",
  },
  {
    name: "Rajesh Jain",
    role: "",
    image: "/images/user.jpg",
  },
  {
    name: "Gulamnabi Kumthe",
    role: "",
    image: "/images/user.jpg",
  },
  {
    name: "Gautam Bharill",
    role: "",
    image: "/images/user.jpg",
  },
  {
    name: "Sonali",
    role: "HR Head",
    image: "/images/user.jpg",
  },
];

function TeamGrid({
  members,
  gridClassName = "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: {
  members: TeamMember[];
  gridClassName?: string;
}) {
  return (
    <div className={gridClassName}>
      {members.map((member, index) => (
        <div
          key={`${member.name}-${index}`}
          className="overflow-hidden rounded-[12px] border border-[#1f3f6b]/10 bg-white transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="relative aspect-[4/4.5] w-full bg-[#f3f4f6]">
            <Image
              src={member.image || "/images/team-placeholder.jpg"}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-5">
            <h4 className="text-[18px] font-semibold text-[#172f55]">
              {member.name}
            </h4>

            {member.role && member.role.trim() !== "" && (
              <p className="mt-2 text-[14px] leading-[1.7] text-[#64748b]">
                {member.role}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeamDetails() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("board");

  return (
    <section
      id="team-and-leadership"
      className="bg-[#f8f8f8] py-12 sm:py-14 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-10 lg:px-6">
        <div className="rounded-[10px] border border-[#1f3f6b]/10 bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.04)] sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap gap-3 border-b border-black/6 pb-5">
            <button
              onClick={() => setActiveTab("board")}
              className={`cursor-pointer px-5 rounded-[4px] py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 sm:text-[14px] ${
                activeTab === "board"
                  ? "bg-white text-[#172f55] border-b-4 border-[#172f55]"
                  : "text-[#1f2a44] hover:bg-[#e9eef4]"
              }`}
            >
              Board of Directors
            </button>

            <button
              onClick={() => setActiveTab("management")}
              className={`cursor-pointer rounded-[4px] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 sm:text-[14px] ${
                activeTab === "management"
                  ? "bg-white text-[#172f55] border-b-4 border-[#172f55]"
                  : "text-[#1f2a44] hover:bg-[#e9eef4]"
              }`}
            >
              Management Team
            </button>
          </div>

          {activeTab === "board" && (
            <div>
              <div className="mb-6">
                <h3 className="text-[22px] text-[#1f2a44] sm:text-[24px]">
                  Board of Directors
                </h3>
                <p className="mt-2 text-[15px] text-[#64748b]">
                  Guiding the organization with vision, governance and long-term
                  direction.
                </p>
              </div>

              <TeamGrid
                members={boardOfDirectors}
                gridClassName="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2"
              />
            </div>
          )}

          {activeTab === "management" && (
            <div>
              <div className="mb-6">
                <h3 className="text-[22px] text-[#1f2a44] sm:text-[24px]">
                  Management Team
                </h3>
                <p className="mt-2 text-[15px] text-[#64748b]">
                  Leadership teams across our core operational locations.
                </p>
              </div>

              <TeamGrid members={managementTeam} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
