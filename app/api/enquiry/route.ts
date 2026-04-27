import { NextResponse } from "next/server";

const API_ENDPOINT = "http://pridegroup10.4erealty.com/WebCreate.aspx";
const API_UID = "fourqt";
const API_PWD = "wn9mxO76f34=";
const API_CHANNEL = "MS";
const API_SOURCE = "Website";

type LeadApiResponse = {
  Status?: boolean;
  Lead_Id?: number;
  Message?: string;
};

function sanitizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function sanitizeUrl(url?: string) {
  if (!url) {
    return "";
  }

  return url.replace(/^https?:\/\//i, "").split("?")[0].trim();
}

function createUniqueId() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = String(now.getFullYear());
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${month}${day}${year}${hours}${minutes}${seconds}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? sanitizePhone(body.phone) : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const project = typeof body.project === "string" ? body.project.trim() : "";
    const remark = typeof body.message === "string" ? body.message.trim() : "";
    const url = typeof body.pageUrl === "string" ? sanitizeUrl(body.pageUrl) : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const isd = typeof body.isd === "string" ? body.isd.replace(/\D/g, "") : "91";

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required." },
        { status: 400 },
      );
    }

    if (!isd) {
      return NextResponse.json(
        { success: false, message: "Country code is required." },
        { status: 400 },
      );
    }

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone number is required." },
        { status: 400 },
      );
    }

    if (!city) {
      return NextResponse.json(
        { success: false, message: "City is required." },
        { status: 400 },
      );
    }

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project is required." },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({
      UID: API_UID,
      PWD: API_PWD,
      Channel: API_CHANNEL,
      Src: API_SOURCE,
      ISD: isd,
      Mob: phone,
      Email: email,
      name,
      City: city,
      Location: location,
      Project: project,
      Remark: remark,
      url,
      UniqueId: createUniqueId(),
    });

    const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead API request failed.",
          details: text,
        },
        { status: 502 },
      );
    }

    let parsed: LeadApiResponse | null = null;

    try {
      parsed = JSON.parse(text) as LeadApiResponse;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Lead API returned an unreadable response.",
          details: text,
        },
        { status: 502 },
      );
    }

    if (!parsed.Status) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.Message || "Lead creation failed.",
          details: parsed,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: parsed.Message || "Lead Created Successfully",
      details: parsed,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit enquiry.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
