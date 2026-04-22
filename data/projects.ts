import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "wellington",
    title: "2 & 3 BHK Apartments",
    city: "Pune",
    location: "at Pride World City, Charholi",
    seo: {
      metaTitle:
        "Wellington at Pride World City | 2 & 3 BHK Apartments in Charholi, Pune",
      metaDescription:
        "Explore Wellington at Pride World City, Charholi, Pune. Discover premium 2 & 3 BHK apartments with world-class amenities and township living.",
      metaImage: "/images/Wellington.png",
    },
    hero: {
      type: "image",
      src: "/images/Wellington.png",
      heading: "Wellington",
    },
    overview: {
      category: "Residential",
      status: "Ongoing",
      subtitle: "Starting from Rs. 1.2 Cr*",
      location: "at Pride World City, Charholi, Pune",
      description:
        "Wellington at Pride World City offers luxurious 2 & 3 BHK residences designed for modern living. With an emphasis on space, comfort, and aesthetics, Wellington presents an extraordinary lifestyle with world-class amenities and superior craftsmanship.",
      logoSrc: "/images/projects/PWC_Wellington Logo.png",
      imageSrc: "/images/Wellington.png",
      imageAlt: "Wellington at Pride World City",
      stats: [
        { value: "14", label: "Towers" },
        { value: "110+", label: "Amenities" },
        { value: "2/3", label: "BHK Options" },
      ],
      highlights: [
        "110+ Childhood Amenities",
        "World-Class Lifestyle",
        "Smart & Sustainable Living",
        "Complete Township Convenience",
      ],
      amenities: [
        "Clubhouse",
        "Mini Olympic Pool",
        "Kids Pool",
        "Co-working Lounge",
        "Café",
        "Jogging Track",
        "Cycling Track",
        "Yoga Zone",
        "Futsal Court",
        "Rock Climbing Zone",
        "Forest Trail",
        "Jungle Trail",
      ],
      mediaBadges: [
        { value: "110+", label: "Amenities", position: "top-right" },
        { value: "14", label: "Towers", position: "bottom-left" },
      ],
    },

    details: {
      amenities: {
        title: "Amenities",
        categories: [
          {
            title: "Wellness",
            items: [
              "Gymnasium",
              "Aerobics Room / Zumba",
              "Yoga Room",
              "Yoga & Meditation Zone",
              "Reflexology Pathway",
              "Spa Room",
              "Salon",
              "Open Gym",
              "Jogging Track",
              "Hammock Zone",
              "Aroma Garden",
              "Zen Garden",
              "Herbal Garden",
              "Butterfly Garden",
            ],
          },
          {
            title: "Sports",
            items: [
              "Gymnasium",
              "Aerobics Room / Zumba",
              "Yoga Room",
              "Yoga & Meditation Zone",
              "Reflexology Pathway",
              "Spa Room",
              "Salon",
              "Open Gym",
              "Jogging Track",
              "Hammock Zone",
              "Aroma Garden",
              "Zen Garden",
              "Herbal Garden",
              "Butterfly Garden",
            ],
          },
          {
            title: "Kids",
            items: [
              "Kids Play Area",
              "Toddler’s Play Area",
              "Mud Play Area",
              "Trampoline",
              "Hide & Seek Arena",
              "Tyre Swing",
              "Vish Amrit Game (4 Corners)",
              "Latto Game",
              "Snakes and Ladders",
              "Kiwi Mini Club-1 & 2",
              "Chit-Chat Plaza",
            ],
          },
          {
            title: "Picture Perfect Skies",
            items: [
              "Selfie Point",
              "Viewing Gallery",
              "Sculpture Mound",
              "Tree Plaza",
              "Fountain Plaza",
              "Step Garden",
              "Bonfire Court",
              "Social Island",
              "Welcome Fountain",
              "Viewing Stand",
              "Camp Site",
              "Forest Trail",
              "Jungle Trail",
            ],
          },
        ],
        miscTitle: "Misc",
        miscItems: [
          "Club House (Beehive Club)",
          "Lounge",
          "Cafe",
          "Mini Theatre",
          "Music & Dance Zone",
          "Art & Craft Hobby Zone",
          "Outdoor Play Area",
          "Study & Library",
          "Working Pod",
          "Cards Zone",
          "Dart Game Zone",
          "Social Circle",
          "Senior Citizen Plaza",
          "Multipurpose Lawn",
          "Seating Plaza",
          "Pergola with Seating",
          "BBQ Zone",
          "Trellis with Parents Seat Out",
          "Tree Plaza",
          "Pets Park",
          "Pet Washing / Bathing Station",
          "Urban Farming",
          "Fruit Orchard",
          "Recycle Zone",
          "School",
          "Hospital",
          "Supermarket",
          "Police Chowki",
          "Mall",
          "Bus Terminal",
          "Entrance Gate with 3-Tier Security",
          "CCTV Surveillance at Main Entrance & Each Wing",
          "DG Back-Up for Lifts & Common Areas",
          "Fire Fighting System",
          "Car Charging Station",
          "Sewage Treatment Plant",
          "Organic Waste Converter",
          "Drip/Sprinkler Irrigation for Landscaping",
          "Rainwater Harvesting",
          "Solar Power for Garden & Street Lighting",
          "Changing Room",
          "Amazon Locker",
          "Laundry Room",
          "Drivers Room in Each Building",
        ],
      },
      specifications: [
        {
          title: "Flooring",
          content: [
            "800 mm x 800 mm vitrified tiles in all rooms from Kajaria / ZealTop / Nitco / Johnson / RAK / Somany or equivalent make.",
            "Anti-skid tiles in bathrooms, terrace and dry balcony.",
            "Designer tiles flooring in each floor lobby.",
          ],
        },
        {
          title: "Bathroom",
          content: [
            "Ceramic tile dado up to 7 feet height in each bathroom (2' x 4').",
            "C.P. fittings of Jaquar / Cera / Kohler or equivalent make.",
            "Sanitaryware of Jaquar / Kohler or equivalent make in all bathrooms.",
          ],
        },
        {
          title: "Doors & Windows",
          content: [
            "Veneered finish and melamine polished main door.",
            "Both-side laminated doors for all bedrooms and toilets.",
            "Door fittings of Hafele / Dorma / Hettich / PAG / Europa make.",
            "Powder-coated aluminium windows with PVC mosquito net in each flat, excluding toilet windows.",
            "Aluminium louvered windows with exhaust fan provision.",
            "M.S. railing for aluminium windows up to 1 metre height from finished floor level, excluding toilets.",
          ],
        },
        {
          title: "Electrical",
          content: [
            "Concealed copper wiring with circuit breakers.",
            "Electrical switches of Schneider / Anchor / Vinay / Panasonic make.",
            "Provision for inverter point.",
            "TV and telephone points in hall and master bedroom.",
            "A.C. point provision in all bedrooms and living room.",
            "Video door phone with colour screen in each flat.",
          ],
        },
        {
          title: "Kitchen & Finishes",
          content: [
            "Granite kitchen platform with stainless steel sink and provision for water purifier.",
            "Hob and chimney of Elica / Faber / Jyoti make.",
            "Semi-modular kitchen cabinet below kitchen platform.",
            "Piped gas system of MNGL for each flat.",
            "Oil bound distemper paint for internal walls and ceiling.",
            "Oil paint to railings, and texture with acrylic paint to exterior walls.",
          ],
        },
      ],
      galleryTabs: [
        {
          title: "Gallery",
          anchorId: "gallery",
          images: [
            {
              src: "/images/projects/wellington/7.jpg",
              alt: "Wellington tower view",
              caption: "Tower View",
            },
            {
              src: "/images/projects/wellington/2.jpg",
              alt: "Wellington podium view",
              caption: "Podium View",
            },
            {
              src: "/images/projects/wellington/3.jpg",
              alt: "Wellington landscape view",
              caption: "Landscape View",
            },
            {
              src: "/images/projects/wellington/4.jpg",
              alt: "Wellington arrival view",
              caption: "Arrival Experience",
            },
            {
              src: "/images/projects/wellington/5.jpg",
              alt: "Wellington facade view",
              caption: "Facade View",
            },
            {
              src: "/images/projects/wellington/6.jpg",
              alt: "Wellington tower view",
              caption: "Tower View",
            },
          ],
        },
        {
          title: "Floor Plans",
          anchorId: "floorplans",
          layout: "grid",
          images: [
            {
              src: "/images/projects/wellington/3-BHK-XL.png",
              alt: "Wellington 3 BHK XL floor plan",
              caption: "3 BHK XL",
            },
            {
              src: "/images/projects/wellington/3-BHK-L.png",
              alt: "Wellington 3 BHK L floor plan",
              caption: "3 BHK L",
            },
          ],
        },
        {
          title: "Master Plan Layout",
          anchorId: "master-plan-layout",
          images: [
            {
              src: "/images/projects/wellington/Wellington-Master-Layout.jpg",
              alt: "Master Plan layout of Wellington at Pride World City",
              caption: "Master Plan Layout",
            },
          ],
        },
        {
          title: "Construction Updates",
          anchorId: "construction-updates",
          images: [
            {
              src: "/images/projects/wellington/wellington-video.mp4",
              alt: "Wellington construction status video",
              caption: "Current Status Video",
              type: "video",
            },
          ],
        },
      ],

      connectivity: {
        title: "Connectivity",
        groups: [
          {
            title: "Educational Institutes",
            items: [
              { name: "DY Patil International School", distance: "6 km" },
              { name: "Lexicon International School", distance: "7 km" },
              { name: "Symbiosis International University", distance: "12 km" },
              { name: "Dr. Mar Theophilus School", distance: "5 km" },
            ],
          },
          {
            title: "Connectivity",
            items: [
              { name: "Pune International Airport", distance: "8 km" },
              { name: "Pune Railway Station", distance: "14 km" },
              { name: "Mumbai-Pune Expressway", distance: "15 km" },
            ],
          },
          {
            title: "Entertainment & Leisure",
            items: [
              { name: "Phoenix Marketcity", distance: "9 km" },
              { name: "Amanora Mall", distance: "16 km" },
              { name: "Decathlon Wagholi", distance: "11 km" },
            ],
          },
          {
            title: "Groceries & Mart",
            items: [
              { name: "DMart Ready", distance: "5 km" },
              { name: "Reliance Smart", distance: "6 km" },
              { name: "Star Bazaar", distance: "9 km" },
              {
                name: "Local Markets & Convenience Stores",
                distance: "2-3 km",
              },
            ],
          },
          {
            title: "IT/ITES",
            items: [
              { name: "Commerzone IT Park", distance: "11 km" },
              { name: "EON IT Park", distance: "13 km" },
              { name: "World Trade Center Pune", distance: "13 km" },
              { name: "Weikfield IT Park", distance: "9 km" },
              { name: "Panchshil Tech Park", distance: "10 km" },
              { name: "Cerebrum IT Park", distance: "10 km" },
            ],
          },
          {
            title: "Hospitals",
            items: [
              { name: "Ajeenkya Healthcare Center", distance: "6 km" },
              { name: "Sathe Multi-speciality Hospital", distance: "5 km" },
              {
                name: "Indrayani Hospital and Cancer Institute",
                distance: "8 km",
              },
            ],
          },
          {
            title: "Metro Station",
            items: [
              { name: "Ramwadi", distance: "10 km" },
              { name: "Kalyani Nagar", distance: "11 km" },
              { name: "Yerwada", distance: "11 km" },
              { name: "Bund Garden", distance: "14 km" },
              { name: "Ruby Hall Clinic", distance: "14 km" },
              { name: "Pune Railway Station", distance: "14 km" },
              { name: "Kasarwadi", distance: "12 km" },
              { name: "Bhosari", distance: "9 km" },
            ],
          },
        ],
      },
    },

    cta: {
      title: "Interested in Wellington?",
      description:
        "Get in touch with our sales team to learn more about this project or schedule a site visit.",
      primaryLabel: "Schedule a Site Visit",
      primaryHref: "/contact",
      secondaryLabel: "Contact Us",
      secondaryHref: "/contact",
    },
    rera: {
      note: "MahaRERA registered - Details available at",
      websiteUrl: "https://maharera.mahaonline.gov.in",
      items: [
        {
          title: "Tower - A, B",
          number: "P52100000000",
          qrSrc:
            "/images/projects/wellington/rera/WELLINGTON- A-B ~ P52100031008.png",
        },
        {
          title: "Tower - C, D",
          number: "P52100000001",
          qrSrc:
            "/images/projects/wellington/rera/WELLINGTON C - D ~ P52100048477.png",
        },
        {
          title: "Tower - E, F, J & K ",
          number: "P52100000002",
          qrSrc:
            "/images/projects/wellington/rera/Wellington_E, F, J & K P52100052379.png",
        },
        {
          title: "Tower - F, G",
          number: "P52100000002",
          qrSrc:
            "/images/projects/wellington/rera/WELLINGTON F-G ~ P52100054534.png",
        },
        {
          title: "Tower - L, M",
          number: "P52100000002",
          qrSrc:
            "/images/projects/wellington/rera/WELLINGTON-L-M ~ P52100045786.png",
        },
        {
          title: "Tower - N, O",
          number: "P52100000002",
          qrSrc:
            "/images/projects/wellington/rera/WELLINGTON- N-O ~ P52100032380.png",
        },
      ],
    },
  },

  // soho projects starts --------------------------------------------------------------------------------------------------------------------------------------
  {
    slug: "soho",
    title: "2 & 2.5 BHK Homes",
    city: "Pune",
    location: "at Pride World City, Charholi",
    seo: {
      metaTitle:
        "SOHO at Pride World City | 2 & 2.5 BHK Homes in Charholi, Pune",
      metaDescription:
        "Discover SOHO at Pride World City, Charholi, Pune. Explore 2 & 2.5 BHK homes with modern amenities and a lifestyle built for new generations.",
      metaImage: "/images/projects/soho/6.jpg",
    },
    hero: {
      type: "carousel",
      heading: "SOHO",
      images: [
        "/images/projects/soho/2.jpg",
        "/images/projects/soho/7.jpg",
        "/images/projects/soho/3.jpg",
      ],
    },
    overview: {
      category: "Residential",
      status: "",
      subtitle: "",
      location: "at Pride World City, Charholi, Pune",
      description:
        "SOHO is a well-thought-out new cluster in Pride World City built with the idea of equality. The amenities and facilities here promote an equal share of opportunities and responsibilities, making it the perfect lifestyle for the new generations.",
      logoSrc: "/images/projects/soho/PWC_Soho Logo-01.svg",
      imageSrc: "/images/projects/soho/6.jpg",
      imageAlt: "SOHO at Pride World City",
      stats: [
        { value: "2", label: "BHK Option" },
        { value: "2.5", label: "BHK" },
      ],
      highlights: [
        "Luxury for the new age",
        "Built for the new generations",
        "Modern lifestyle housing",
        "Architecture that spells modern living",
      ],
      amenities: [
        "Modular Kitchen",
        "Hob and Chimney",
        "Digital Lock",
        "Inverter",
        "Walking Trail",
        "Sitting Area",
        "Open Gym",
        "Central Lawn",
        "Day Care",
        "Café",
        "Kids’ Play Area",
        "Indoor Gaming Zone",
        "Swimming Pool",
        "Party Lawn",
      ],
      mediaBadges: [
        { value: "Signature", label: "Twin Towers", position: "top-right" },
        { value: "25+", label: "Amenities", position: "bottom-left" },
      ],
    },

    features: {
      images: [
        "/images/projects/soho/Soho-1.jpg",
        "/images/projects/soho/Soho-2.jpg",
        "/images/projects/soho/Soho-3.jpg",
        "/images/projects/soho/Soho-4.jpg",
        "/images/projects/soho/Soho-5.jpg",
      ],
    },

    details: {
      amenities: {
        title: "Amenities",
        categories: [
          {
            title: "In-Home Features",
            items: [
              "Modular Kitchen",
              "Hob and Chimney",
              "Digital Lock",
              "Inverter",
            ],
          },
          {
            title: "Outdoor & Fitness",
            items: [
              "Walking Trail",
              "Sitting Area",
              "Open Gym",
              "Central Lawn",
            ],
          },
          {
            title: "Family & Kids",
            items: [
              "Day Care",
              "Kids’ Play Area",
              "Indoor Gaming Zone",
              "Café",
            ],
          },
          {
            title: "Leisure",
            items: ["Swimming Pool", "Party Lawn"],
          },
        ],
        miscTitle: "Facilities",
        miscItems: [
          "Entrance Lobby for each Building",
          "24x7 Security",
          "DG Back Up for Lift & Common Areas",
          "Garbage Chute",
          "Fire Fighting System",
          "Rain Water Harvesting",
          "Walkways",
          "Sewage Treatment Plant",
          "Organic Waste Converter",
          "Compound Wall",
          "Drip/Sprinkler Irrigation for Landscaping",
          "CCTV Surveillance in Main Entrance Lobby of each Building",
          "Name Plate on each Flat’s Main Door",
          "Letter Box",
        ],
      },

      specifications: [
        {
          title: "Flooring",
          content: [
            "800 x 800 / 600 x 1200 mm vitrified tiles in all rooms.",
            "Antiskid tiles in Bathroom, Terrace & Dry Balcony.",
            "Ceramic tile Dado up to 7 feet in height in each Bathroom.",
            "Designer tiles in each Floor Lobby.",
          ],
        },
        {
          title: "Wall Finishes",
          content: [
            "Oil Bound Distemper Paint for Internal Walls & Ceiling.",
            "Oil Paint to Railings.",
            "Texture with Acrylic paint to exterior walls.",
            "Internal walls will be finished in Gypsum.",
          ],
        },
        {
          title: "Doors & Windows",
          content: [
            "Veneer finished & Melamine polished main Doors for all Flats.",
            "Both Side Laminated Doors for all Bed Rooms & Toilets.",
            "Branded fittings for all Doors.",
            "Aluminum Windows: Powder Coated Aluminum Windows with Aluminum / PVC Mosquito net in each Flat (Mosquito Net will not be provided for Toilet Windows).",
            "Toilet Windows: Aluminum Louvered windows with provision for Exhaust Fan.",
            "M.S. Railing from inside of Flat for Aluminum Windows (Excluding Toilet) up to 1.00 m height from floor finish Level.",
            "Fire resistant doors for Fire Staircase.",
          ],
        },
        {
          title: "Kitchen",
          content: [
            "Granite Kitchen Platform with S.S. Sink, Hob & Chimney.",
            "Piped Gas System of MNGL for each flat.",
            "Kitchen cabinet below the kitchen platform.",
          ],
        },
        {
          title: "Bathroom",
          content: [
            "Branded C.P. fittings in all Bathrooms.",
            "Branded Sanitary Wares in all Bathrooms.",
            "Solar Hot water in Master Toilet (75 Lit/Day/Flat).",
          ],
        },
        {
          title: "Electrical Fittings",
          content: [
            "Concealed Copper Wiring With Circuit Breakers.",
            "Branded Electrical Switches in all Flats.",
            "Provision of electrical point for Inverter.",
            "T.V. & Telephone Point in Hall & Master Bed Room.",
            "Provision of A.C Point in All Bed Rooms & Living Room.",
          ],
        },
        {
          title: "Automation",
          content: [
            "Wi-Fi Router in each flat.",
            "Video Door Phone with Color Screen in each Flat.",
            "The inverter of 2KVA in each flat.",
            "Digital Lock for the main door in each flat.",
            "Automatic Lifts with SS finished car from inside and with the speed of 1.5m/sec.",
            "Fire Fighting System inside the Flats.",
            "Smoke Detection Alarm System inside the Flat.",
          ],
        },
        {
          title: "RCC Structure",
          content: [
            "Earthquake resistant RCC Structure in Aluform.",
            "Partial walls in AAC Blockwork.",
          ],
        },
      ],

      galleryTabs: [
        {
          title: "Gallery",
          anchorId: "gallery",
          images: [
            {
              src: "/images/projects/soho/2.jpg",
              alt: "Wellington podium view",
            },
            {
              src: "/images/projects/soho/3.jpg",
              alt: "Wellington podium view",
            },
            {
              src: "/images/projects/soho/4.jpg",
              alt: "Wellington podium view",
            },
            {
              src: "/images/projects/soho/5.jpg",
              alt: "Wellington podium view",
            },
            {
              src: "/images/projects/soho/1.jpg",
              alt: "Wellington tower view",
            },
            {
              src: "/images/projects/soho/6.jpg",
              alt: "Wellington podium view",
            },
            {
              src: "/images/projects/soho/7.jpg",
              alt: "Wellington podium view",
            },
            {
              src: "/images/projects/soho/8.jpg",
              alt: "Wellington podium view",
            },
            {
              src: "/images/projects/soho/9.jpg",
              alt: "Wellington podium view",
            },
          ],
        },
        {
          title: "Floor Plans",
          anchorId: "floorplans",
          layout: "grid",
          images: [
            {
              src: "/images/projects/soho/2BHK.jpg",
              alt: "Wellington tower view",
            },
            {
              src: "/images/projects/soho/2.5BHK.jpg",
              alt: "Wellington tower view",
            },
          ],
        },
        {
          title: "Master Plan Layout",
          anchorId: "master-plan-layout",
          images: [
            {
              src: "/images/projects/soho/master-layout.png",
              alt: "Wellington tower view",
            },
          ],
        },
        // {
        //   title: "Construction Updates",
        //   anchorId: "construction-updates",
        //   images: [],
        // },
      ],

      connectivity: {
        title: "Connectivity",
        groups: [
          {
            title: "Schools & Education",
            items: [
              { name: "Lexicon Kids Dhanori", distance: "2.5 kms" },
              { name: "Bishop’s School", distance: "7.2 kms" },
            ],
          },
          {
            title: "IT & Business",
            items: [
              { name: "Commerzone", distance: "11 kms" },
              { name: "EON IT Park", distance: "13 kms" },
            ],
          },
          {
            title: "Healthcare",
            items: [
              { name: "Sathe Hospital", distance: "4 kms" },
              { name: "Apollo Clinic", distance: "9 kms" },
            ],
          },
          {
            title: "Retail & Leisure",
            items: [
              { name: "Phoenix Market City", distance: "5 kms" },
              { name: "Seasons Mall", distance: "13 kms" },
              { name: "Pizza Hut", distance: "4.2 kms" },
              { name: "Domino’s Pizza", distance: "2 kms" },
              { name: "PVR / INOX", distance: "7 kms" },
              { name: "Diamond Water Park", distance: "4 kms" },
              { name: "Wellness 24/7", distance: "9 kms" },
            ],
          },
          {
            title: "City Access",
            items: [
              { name: "Yerwada", distance: "11 kms" },
              { name: "Alandi", distance: "9 kms" },
              { name: "Bhosari", distance: "11 kms" },
              { name: "Kalyani Nagar", distance: "7 kms" },
            ],
          },
        ],
      },
    },

    cta: {
      title: "",
      description: "",
      primaryLabel: "",
      primaryHref: "",
      secondaryLabel: "",
      secondaryHref: "",
    },

    rera: {
      note: "MahaRERA registered - Details available at",
      websiteUrl: "https://maharera.mahaonline.gov.in",
      items: [
        {
          title: "SOHO",
          number: "P52100046546",
          qrSrc: "/images/projects/soho/SOHO-Rera.jpg",
        },
      ],
    },
  },
];
