/* ==========================================================================
   projects_data.js - Central Data Store for Projects, Units, Milestones & Models
   ========================================================================== */

const AURA_PROJECTS = [
    {
        id: "aura-sky",
        name: "Aura Sky Residences",
        status: "completed",
        statusLabel: "Completed • Ready to Move In",
        propertyType: "Apartment",
        location: "Colombo 03 (Kollupitiya Sea Face)",
        completionDate: "Delivered Dec 2025",
        progressPercent: 100,
        startingPrice: 48500000,
        heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        summary: "A completed 28-story luxury oceanfront residential tower featuring private sky decks, infinity pool, and smart home automation.",
        reraNumber: "UDA/COL/2022/0891",
        totalUnits: 84,
        availableUnitsCount: 5,
        amenities: ["Infinity Rooftop Pool", "24/7 Concierge & Biometric Access", "EV Charging Bays", "Sky Gymnasium", "Private Cinema Room"],
        milestones: [
            { stage: "Piling & Excavation", status: "done", date: "Q1 2023" },
            { stage: "Superstructure (28 Floors)", status: "done", date: "Q1 2024" },
            { stage: "Interior Finishing & MEP", status: "done", date: "Q3 2025" },
            { stage: "COC & Handover", status: "done", date: "Dec 2025" }
        ],
        constructionUpdates: [
            { month: "December 2025", note: "Certificate of Conformity (COC) obtained. Handover ceremony completed.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" }
        ],
        modelsAvailable: ["Physical Completed Units Only"],
        levels: ["Floor 12", "Floor 18", "Floor 24 (Penthouse Level)"],
        units: [
            { unitNo: "A-1201", level: "Floor 12", type: "2 Bedroom Luxury", beds: 2, baths: 2, sqft: 1180, price: 48500000, view: "Indian Ocean View", status: "available", rooms: ["Master Suite (14x12 ft)", "Guest Bedroom (11x11 ft)", "Open Living & Dining (22x14 ft)", "Ocean Balcony (12x5 ft)"] },
            { unitNo: "A-1202", level: "Floor 12", type: "3 Bedroom Premier", beds: 3, baths: 3, sqft: 1650, price: 64000000, view: "Ocean & City Corner", status: "available", rooms: ["Master Suite (16x13 ft)", "Bedroom 2 (12x11 ft)", "Bedroom 3 (11x10 ft)", "Maid Room + Utility", "Wraparound Balcony"] },
            { unitNo: "A-1203", level: "Floor 12", type: "2 Bedroom Standard", beds: 2, baths: 2, sqft: 1120, price: 46000000, view: "City Skyline View", status: "sold", rooms: ["Master Bedroom", "Bedroom 2", "Living Room", "Kitchen"] },
            { unitNo: "A-1801", level: "Floor 18", type: "3 Bedroom Premier", beds: 3, baths: 3, sqft: 1650, price: 68500000, view: "Panoramic Ocean View", status: "available", rooms: ["Master Suite (16x13 ft)", "Bedroom 2 (12x11 ft)", "Bedroom 3 (11x10 ft)", "Closed Pantry + Wet Kitchen"] },
            { unitNo: "A-1802", level: "Floor 18", type: "2 Bedroom Luxury", beds: 2, baths: 2, sqft: 1180, price: 51000000, view: "Harbor Sunset View", status: "reserved", rooms: ["Master Bedroom", "Guest Bedroom", "Living & Dining"] },
            { unitNo: "PH-2401", level: "Floor 24 (Penthouse Level)", type: "4 Bedroom Sky Penthouse", beds: 4, baths: 5, sqft: 3100, price: 135000000, view: "360° Ocean & Lotus Tower View", status: "available", rooms: ["Presidential Master Suite", "3 En-suite Bedrooms", "Private Plunge Pool Terrace", "Show Kitchen & Wet Kitchen"] }
        ]
    },
    {
        id: "marina-crest",
        name: "Marina One Crest Towers",
        status: "ongoing",
        statusLabel: "Ongoing • Handover Q4 2027",
        propertyType: "Apartment",
        location: "Rajagiriya (Parliament Lake Drive)",
        completionDate: "Estimated Q4 2027",
        progressPercent: 65,
        startingPrice: 36000000,
        heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        summary: "Twin 32-story eco-luxury towers overlooking Diyawanna Lake. Show apartments (2-Bed & 3-Bed Models) are now open for inspection at our on-site Experience Center.",
        reraNumber: "UDA/RAJ/2024/1142",
        totalUnits: 140,
        availableUnitsCount: 42,
        amenities: ["Lakefront Jogging Track", "Co-Working Business Lounge", "Rooftop Heated Pool", "Kids Montessori Zone", "Solar Micro-Grid"],
        milestones: [
            { stage: "Piling & Basement", status: "done", date: "Q2 2025" },
            { stage: "Superstructure (Floor 22/32)", status: "current", date: "In Progress (65%)" },
            { stage: "Internal Finishes & Facade", status: "upcoming", date: "Q1 2027" },
            { stage: "Final Testing & Handover", status: "upcoming", date: "Q4 2027" }
        ],
        constructionUpdates: [
            { month: "October 2026", note: "22nd Floor slab concrete pour completed on Tower A. Model flats on Ground Level open for buyer tours.", img: "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=600&q=80" },
            { month: "August 2026", note: "16th Floor structural framing & MEP rough-ins finalized ahead of schedule.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" }
        ],
        modelsAvailable: [
            "2-Bedroom Model Flat (1,050 sq.ft. Show Unit)",
            "3-Bedroom Model Flat (1,540 sq.ft. Show Unit)",
            "Duplex Sky Villa Scale Model & VR Suite"
        ],
        levels: ["Floor 08", "Floor 15", "Floor 25"],
        units: [
            { unitNo: "M-0801", level: "Floor 08", type: "2 Bedroom Lake View", beds: 2, baths: 2, sqft: 1050, price: 36000000, view: "Diyawanna Lake View", status: "available", rooms: ["Master Bedroom (13x12 ft)", "Bedroom 2 (11x10 ft)", "Living & Dining", "Lake Balcony"] },
            { unitNo: "M-0802", level: "Floor 08", type: "3 Bedroom Family Suite", beds: 3, baths: 3, sqft: 1540, price: 52500000, view: "Lake & Sanctuary View", status: "available", rooms: ["Master Suite", "Bedroom 2", "Bedroom 3", "Maid Room", "Dual Balconies"] },
            { unitNo: "M-1501", level: "Floor 15", type: "2 Bedroom Lake View", beds: 2, baths: 2, sqft: 1050, price: 39500000, view: "Elevated Lake View", status: "available", rooms: ["Master Bedroom", "Bedroom 2", "Living & Dining", "Kitchen"] },
            { unitNo: "M-1502", level: "Floor 15", type: "3 Bedroom Family Suite", beds: 3, baths: 3, sqft: 1540, price: 55000000, view: "Colombo Golf & Lake View", status: "reserved", rooms: ["Master Suite", "2 Guest Rooms", "Utility Area"] },
            { unitNo: "M-2501", level: "Floor 25", type: "3 Bedroom Sky Corner", beds: 3, baths: 3, sqft: 1690, price: 61000000, view: "Unobstructed City & Lake", status: "available", rooms: ["Master Suite with Walk-in Closet", "2 En-suite Bedrooms", "Island Kitchen"] }
        ]
    },
    {
        id: "emerald-villas",
        name: "The Emerald Sanctuary Villas",
        status: "completed",
        statusLabel: "Completed • Immediate Transfer",
        propertyType: "Housing Scheme",
        location: "Thalawathugoda (Hokandara Green Enclave)",
        completionDate: "Delivered May 2026",
        progressPercent: 100,
        startingPrice: 72000000,
        heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
        summary: "An exclusive gated community of 24 detached architectural villas with private landscaped courtyard gardens, double carports, and clubhouse facilities.",
        reraNumber: "UDA/KOT/2023/0419",
        totalUnits: 24,
        availableUnitsCount: 3,
        amenities: ["Gated 24/7 Armed Security", "Clubhouse & Lap Pool", "Underground Cabling", "Private Courtyard Gardens", "Tennis & Badminton Court"],
        milestones: [
            { stage: "Land Development & Infrastructure", status: "done", date: "Q2 2024" },
            { stage: "Villa Structural Construction", status: "done", date: "Q1 2025" },
            { stage: "Landscaping & Clubhouse", status: "done", date: "Q1 2026" },
            { stage: "Deed Transfer Ready", status: "done", date: "May 2026" }
        ],
        constructionUpdates: [
            { month: "May 2026", note: "All 24 villas, internal paved roads, and clubhouse handed over. Ready for direct physical villa inspection.", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80" }
        ],
        modelsAvailable: ["Physical Completed Villas Only"],
        levels: ["North Boulevard Zone", "Lakefront Cul-de-Sac"],
        units: [
            { unitNo: "Villa V-04", level: "North Boulevard Zone", type: "3 Bedroom Courtyard Villa", beds: 3, baths: 4, sqft: 2450, price: 72000000, view: "Park & Boulevard Facing", status: "available", rooms: ["Ground Plunge Courtyard", "3 En-suite Bedrooms", "Double Garage", "Rooftop Terrace"] },
            { unitNo: "Villa V-07", level: "North Boulevard Zone", type: "4 Bedroom Signature Villa", beds: 4, baths: 5, sqft: 3200, price: 89000000, view: "Corner Landscaped Plot", status: "sold", rooms: ["4 Bedrooms", "Private Garden", "Maid Quarters"] },
            { unitNo: "Villa V-14", level: "Lakefront Cul-de-Sac", type: "4 Bedroom Signature Villa", beds: 4, baths: 5, sqft: 3350, price: 96000000, view: "Direct Paddy & Water View", status: "available", rooms: ["Double-Height Living Room", "4 En-suite Bedrooms", "Private Pool Deck", "2-Car Garage"] },
            { unitNo: "Villa V-18", level: "Lakefront Cul-de-Sac", type: "4 Bedroom Presidential Villa", beds: 4, baths: 5, sqft: 3600, price: 108000000, view: "Cul-de-Sac Sanctuary Front", status: "available", rooms: ["Master Wing with Study", "3 Guest Suites", "Private Swimming Pool", "Outdoor BBQ Pavilion"] }
        ]
    },
    {
        id: "botanica-golf",
        name: "Aura Botanica Golf Homes",
        status: "ongoing",
        statusLabel: "Ongoing • Phase 1 Handover Q2 2028",
        propertyType: "Housing Scheme",
        location: "Kahathuduwa (Southern Expressway Interchange)",
        completionDate: "Estimated Q2 2028",
        progressPercent: 40,
        startingPrice: 42000000,
        heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        summary: "A master-planned 18-acre gated townhouse and villa enclave bordering a lush botanical reserve. Furnished 3-Bedroom & 4-Bedroom Show Villas are open for tours.",
        reraNumber: "UDA/HOM/2025/0922",
        totalUnits: 60,
        availableUnitsCount: 28,
        amenities: ["9-Hole Putting Green", "Botanical Walking Trails", "Organic Farm & Cafe", "Solar Roof Package Included", "Smart Perimeter Security"],
        milestones: [
            { stage: "Site Grading & Road Network", status: "done", date: "Q4 2025" },
            { stage: "Show Villas & Phase 1 Foundations", status: "current", date: "In Progress (40%)" },
            { stage: "Villa Superstructures & Clubhouse", status: "upcoming", date: "Q3 2027" },
            { stage: "Final Landscaping & Handover", status: "upcoming", date: "Q2 2028" }
        ],
        constructionUpdates: [
            { month: "October 2026", note: "Both Mockup Show Villas (3-Bed & 4-Bed) are 100% furnished and open for client tours.", img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80" }
        ],
        modelsAvailable: [
            "3-Bedroom Townhouse Model Villa (2,100 sq.ft.)",
            "4-Bedroom Detached Golf Show Villa (2,950 sq.ft.)"
        ],
        levels: ["Phase 1 - Fairway Cluster", "Phase 2 - Botanical Ridge"],
        units: [
            { unitNo: "Plot B-02", level: "Phase 1 - Fairway Cluster", type: "3 Bedroom Golf Townhouse", beds: 3, baths: 3, sqft: 2100, price: 42000000, view: "Fairway Green View", status: "available", rooms: ["3 Bedrooms", "Private Rear Lawn", "2 Parking Slots"] },
            { unitNo: "Plot B-05", level: "Phase 1 - Fairway Cluster", type: "4 Bedroom Detached Villa", beds: 4, baths: 4, sqft: 2950, price: 59000000, view: "Golf & Lakefront View", status: "available", rooms: ["4 En-suite Bedrooms", "Courtyard Deck", "Solar Roof"] },
            { unitNo: "Plot B-11", level: "Phase 2 - Botanical Ridge", type: "3 Bedroom Golf Townhouse", beds: 3, baths: 3, sqft: 2100, price: 43500000, view: "Forest Reserve View", status: "reserved", rooms: ["3 Bedrooms", "Garden Patio", "Double Carport"] }
        ]
    }
];

const VIRTUAL_MODELS_DATA = {
    "2bed-model": {
        title: "2-Bedroom Luxury Model Flat (1,180 sq.ft.)",
        subtitle: "Available for Marina One Crest & Aura Sky Residences",
        finishes: "Imported Italian Botticino Marble, Kohler Brushed Gold Sanitaryware, Teak Engineered Timber Bedrooms",
        rooms: [
            {
                name: "Living & Dining Pavilion",
                img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
                caption: "Floor-to-ceiling double-glazed acoustic windows with 10-foot ceiling height and concealed VRV air conditioning.",
                hotspots: [
                    { x: 35, y: 55, label: "Italian Marble Flooring", detail: "800x800mm anti-slip crystalline marble tiles." },
                    { x: 72, y: 40, label: "Acoustic Balcony Sliders", detail: "Double-glazed UV-protected aluminum system." }
                ]
            },
            {
                name: "Master Suite & Walk-in Wardrobe",
                img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
                caption: "Warm Burmese teak engineered flooring with automated curtain tracks and en-suite rain shower.",
                hotspots: [
                    { x: 48, y: 62, label: "Engineered Teak Floor", detail: "14mm sustainable hardwood timber planks." }
                ]
            },
            {
                name: "European Show Kitchen",
                img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80",
                caption: "Quartz waterfall island with built-in Bosch induction hob, oven, and integrated dishwasher.",
                hotspots: [
                    { x: 55, y: 50, label: "Calacatta Quartz Counter", detail: "Stain & heat resistant 20mm stone slab." }
                ]
            }
        ]
    },
    "3bed-model": {
        title: "3-Bedroom Premier Show Apartment (1,650 sq.ft.)",
        subtitle: "Flagship Family Layout with Dual Kitchens & Wraparound Balcony",
        finishes: "Smart Home Touch Panels, Häfele German Hardware, Bosch Built-in Appliances",
        rooms: [
            {
                name: "Grand Corner Living Lounge",
                img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
                caption: "270-degree corner glass panorama with direct access to the 14-foot ocean/lake entertaining deck.",
                hotspots: [
                    { x: 40, y: 45, label: "Smart Lighting Control", detail: "Lutron dimmable scene automation included." }
                ]
            },
            {
                name: "Spa Master Bathroom",
                img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=80",
                caption: "Freestanding soaking tub, dual vanity mirrors with anti-fog heating, and Kohler rain shower.",
                hotspots: [
                    { x: 60, y: 65, label: "Kohler Freestanding Tub", detail: "Ergonomic acrylic soaking bath with floor mixer." }
                ]
            }
        ]
    },
    "4bed-villa": {
        title: "4-Bedroom Signature Show Villa (3,200 sq.ft.)",
        subtitle: "Gated Housing Scheme Model — Emerald Sanctuary & Aura Botanica",
        finishes: "5kW Net-Metered Solar Roof, Private Courtyard Plunge Pool, Double-Height Timber Ceiling",
        rooms: [
            {
                name: "Courtyard Pool & Living Deck",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
                caption: "Seamless indoor-outdoor tropical architecture opening onto a private plunge pool and timber sun deck.",
                hotspots: [
                    { x: 52, y: 70, label: "Saltwater Plunge Pool", detail: "18x9 ft private tiled courtyard pool with LED lighting." }
                ]
            }
        ]
    }
};