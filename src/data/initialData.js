// Initial dataset extracted and modeled directly from https://gridfly.framer.website/

export const INITIAL_DATA = {
  // Website metadata & contact info
  siteSettings: {
    siteName: "GridFly",
    tagline: "Built To Last",
    subtagline: "Reliable construction services for renovations, remodels, and new builds—planned clearly and built with care.",
    metaDescription: "A premium website template for construction companies, contractors, home builders, architects, and renovation businesses. Responsive, SEO-friendly, and built to generate more leads.",
    primaryPhone: "+1 (312) 555-0189",
    secondaryPhone: "(415) 555-0198",
    email: "contact@gridfly-construction.com",
    address: "742 Montgomery St, San Francisco, CA 94111",
    licenseNumber: "CA LIC #1098421",
    workingHours: "Mon - Sat: 7:00 AM – 6:00 PM",
    ctaText: "Get a Free Estimate",
    ctaLink: "#contact",
    heroBadge: "Trusted by Local Property Owners",
    trustRating: "4.5/5 Based on 2,000+ reviews",
    bannerAnnouncement: "Now Booking Q3 & Q4 Construction Projects Across Bay Area"
  },

  // Key stats shown across GridFly
  stats: [
    { id: "stat-1", label: "Happy Customers", value: "2K+", detail: "Trusted by property owners", icon: "Users" },
    { id: "stat-2", label: "Delivered On Schedule", value: "98%", detail: "Of projects completed on time", icon: "Clock" },
    { id: "stat-3", label: "Average Space Increase", value: "32%", detail: "More usable square footage", icon: "Maximize" },
    { id: "stat-4", label: "Kitchen Remodel Timeline", value: "6-Week", detail: "Average turnkey duration", icon: "Calendar" },
    { id: "stat-5", label: "Licensed Experience", value: "15+", detail: "Years building in CA", icon: "ShieldCheck" }
  ],

  // Projects as showcased on GridFly
  projects: [
    {
      id: "proj-1",
      title: "Modern Home in Orinda",
      slug: "modern-home-orinda",
      category: "Modern Home",
      location: "Orinda, CA",
      timeline: "Jul 2024 – Sep 2024",
      duration: "10 Weeks",
      budget: "$350K - $480K",
      area: "3,400 sq.ft.",
      featured: true,
      status: "Completed",
      coverImage: "https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png?scale-down-to=1024&width=1920&height=1056",
      gallery: [
        "https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png?scale-down-to=1024&width=1920&height=1056",
        "https://framerusercontent.com/images/Y1DFRVyNJj1u4gn1PVhbXl8T1hA.png?scale-down-to=1024&width=1300&height=1744",
        "https://framerusercontent.com/images/IZI1AFMAoGRXgu1yYBk8Ipzrg.png?scale-down-to=1024&width=1310&height=1863"
      ],
      description: "A complete custom modern residence built on a sloped hillside in Orinda. Featuring cantilevered living areas, energy-efficient triple glazing, and architectural concrete finishes paired with sustainable cedar accents.",
      scope: "Full-scale custom residential construction, architectural glazing, custom millwork, and sustainable climate engineering.",
      deliverables: [
        "Custom cantilevered terrace with panoramic views",
        "Passive solar heating & high-efficiency insulation",
        "Custom artisan oak cabinetry and hidden pantry",
        "Engineered retaining foundations for seismic stability"
      ]
    },
    {
      id: "proj-2",
      title: "Whole Home Renovation",
      slug: "whole-home-palo-alto",
      category: "Whole Home",
      location: "Palo Alto, CA",
      timeline: "Jan 2024 – May 2024",
      duration: "18 Weeks",
      budget: "$600K - $800K",
      area: "4,800 sq.ft.",
      featured: true,
      status: "Completed",
      coverImage: "https://framerusercontent.com/images/US4fi1Xrh46xcHTcHtdAtBJBqUM.png?scale-down-to=1024&width=1592&height=1984",
      gallery: [
        "https://framerusercontent.com/images/US4fi1Xrh46xcHTcHtdAtBJBqUM.png?scale-down-to=1024&width=1592&height=1984",
        "https://framerusercontent.com/images/URVvm2e2n311SLbznqjwOjS6Pns.png?scale-down-to=1024&width=1448&height=1086",
        "https://framerusercontent.com/images/spqZSEbMAjhztlmgUStzq9snwHQ.png?scale-down-to=1024&width=2000&height=1333"
      ],
      description: "Comprehensive structural overhaul and interior reimagining of a mid-century estate in Silicon Valley. Reconfigured the entire floor plan to establish an effortless indoor-outdoor flow with state-of-the-art smart home integration.",
      scope: "Structural steel retrofitting, open-concept floor plan alteration, smart infrastructure, luxury materials.",
      deliverables: [
        "Removal of interior load-bearing walls using structural steel",
        "Flush zero-threshold accordion patio doors",
        "Chef's kitchen with quartzite waterfall center island",
        "Zoned radiant underfloor hydronic heating"
      ]
    },
    {
      id: "proj-3",
      title: "Contemporary Kitchen Remodel",
      slug: "contemporary-kitchen-san-rafael",
      category: "Kitchen Remodel",
      location: "San Rafael, CA",
      timeline: "Mar 2024 – Apr 2024",
      duration: "6 Weeks",
      budget: "$120K - $180K",
      area: "650 sq.ft.",
      featured: true,
      status: "Completed",
      coverImage: "https://framerusercontent.com/images/URVvm2e2n311SLbznqjwOjS6Pns.png?scale-down-to=1024&width=1448&height=1086",
      gallery: [
        "https://framerusercontent.com/images/URVvm2e2n311SLbznqjwOjS6Pns.png?scale-down-to=1024&width=1448&height=1086",
        "https://framerusercontent.com/images/HnhIurfILJ3NurhYjLth8tXMvM.png?scale-down-to=1024&width=1448&height=1086"
      ],
      description: "Fast-track 6-week kitchen transformation turning a cramped 1990s kitchen into a sunlit culinary sanctuary. Finished ahead of deadline with precision custom cabinetry, seamless stone backsplashes, and commercial-grade induction cooking.",
      scope: "Complete demolition, subfloor leveling, custom cabinetry, bespoke quartz installation, lighting design.",
      deliverables: [
        "Seamless full-height Calacatta quartz splashbacks",
        "Touch-to-open integrated appliance panels",
        "Architectural recessed LED cove lighting",
        "Dedicated beverage bar with climate-controlled wine cellar"
      ]
    },
    {
      id: "proj-4",
      title: "Spa-Inspired Bathroom Remodel",
      slug: "spa-bathroom-san-francisco",
      category: "Bathroom Remodel",
      location: "San Francisco, CA",
      timeline: "May 2024 – Jun 2024",
      duration: "5 Weeks",
      budget: "$85K - $120K",
      area: "320 sq.ft.",
      featured: true,
      status: "Completed",
      coverImage: "https://framerusercontent.com/images/HnhIurfILJ3NurhYjLth8tXMvM.png?scale-down-to=1024&width=1448&height=1086",
      gallery: [
        "https://framerusercontent.com/images/HnhIurfILJ3NurhYjLth8tXMvM.png?scale-down-to=1024&width=1448&height=1086",
        "https://framerusercontent.com/images/spqZSEbMAjhztlmgUStzq9snwHQ.png?scale-down-to=1024&width=2000&height=1333"
      ],
      description: "Luxury primary suite sanctuary featuring walk-in Japanese soaking tub, curbless steam shower with acoustic waterproof speakers, Venetian plaster walls, and custom floating marble vanity with brass plumbing hardware.",
      scope: "Plumbing rough-in relocation, curbless waterproofing, Venetian plaster, custom stone carving.",
      deliverables: [
        "Thermostatic dual-head rainfall steam shower",
        "Freestanding stone resin soak basin",
        "Waterproof Venetian plaster accent wall",
        "Custom walnut floating vanity with dual under-mount sinks"
      ]
    },
    {
      id: "proj-5",
      title: "Hillside Architectural Addition",
      slug: "hillside-addition-berkeley",
      category: "Additions",
      location: "Berkeley, CA",
      timeline: "Aug 2024 – Present",
      duration: "14 Weeks",
      budget: "$290K - $380K",
      area: "1,200 sq.ft.",
      featured: false,
      status: "In Progress",
      coverImage: "https://framerusercontent.com/images/sV0CAZAwKE1RB17JCdRjT8g7vkk.jpg?width=800&height=1023",
      gallery: [
        "https://framerusercontent.com/images/sV0CAZAwKE1RB17JCdRjT8g7vkk.jpg?width=800&height=1023",
        "https://framerusercontent.com/images/i305rk5y1kDk7MK7PHZs9qBDp4.png?scale-down-to=1024&width=1448&height=1086"
      ],
      description: "A two-story glass and steel volume cantilevered into the Berkeley Hills, adding a master creative studio and guest suite with private observation deck.",
      scope: "Geotechnical pinning, helical steel piers, high-performance curtain wall system.",
      deliverables: [
        "Deep foundation pier drill system into bedrock",
        "Structural black steel framework",
        "Acoustic isolation studio walls for audio production"
      ]
    },
    {
      id: "proj-6",
      title: "Commercial Creative Studio Loft",
      slug: "commercial-studio-oakland",
      category: "Commercial",
      location: "Oakland, CA",
      timeline: "Feb 2024 – Apr 2024",
      duration: "8 Weeks",
      budget: "$420K - $510K",
      area: "5,200 sq.ft.",
      featured: false,
      status: "Completed",
      coverImage: "https://framerusercontent.com/images/5D8SUEMZgCswNmfA3kbAygA8L0.png?scale-down-to=1024&width=1448&height=1086",
      gallery: [
        "https://framerusercontent.com/images/5D8SUEMZgCswNmfA3kbAygA8L0.png?scale-down-to=1024&width=1448&height=1086",
        "https://framerusercontent.com/images/GKLn3u4gkhyDTonuQzGpMP0QAY.png?scale-down-to=1024&width=1448&height=1086"
      ],
      description: "Historic warehouse conversion into high-specification collaborative design suites, preserving exposed red-brick walls and 22-foot heavy timber ceilings.",
      scope: "Commercial ADA compliance, seismic retrofitting, MEP engineering, industrial glass partitions.",
      deliverables: [
        "Exposed brick restoration and sandblasting",
        "Custom acoustic partition pods",
        "Commercial HVAC and fire suppression update"
      ]
    }
  ],

  // Image & Media Assets library
  media: [
    {
      id: "med-1",
      title: "Modern Orinda Hillside Exterior",
      category: "Projects",
      url: "https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png?scale-down-to=1024&width=1920&height=1056",
      dimensions: "1920 x 1056",
      size: "1.4 MB",
      format: "PNG",
      tags: ["exterior", "modern", "orinda", "hillside", "architecture"],
      assignedTo: "Modern Home in Orinda",
      uploadedAt: "2024-09-15"
    },
    {
      id: "med-2",
      title: "Living Room Cantilever Architecture",
      category: "Projects",
      url: "https://framerusercontent.com/images/Y1DFRVyNJj1u4gn1PVhbXl8T1hA.png?scale-down-to=1024&width=1300&height=1744",
      dimensions: "1300 x 1744",
      size: "1.8 MB",
      format: "PNG",
      tags: ["interior", "living room", "minimalist", "lighting"],
      assignedTo: "Modern Home in Orinda",
      uploadedAt: "2024-09-18"
    },
    {
      id: "med-3",
      title: "Palo Alto Exterior Patio & Pool",
      category: "Projects",
      url: "https://framerusercontent.com/images/US4fi1Xrh46xcHTcHtdAtBJBqUM.png?scale-down-to=1024&width=1592&height=1984",
      dimensions: "1592 x 1984",
      size: "2.1 MB",
      format: "PNG",
      tags: ["exterior", "patio", "pool", "palo alto", "estate"],
      assignedTo: "Whole Home Renovation",
      uploadedAt: "2024-05-20"
    },
    {
      id: "med-4",
      title: "Gourmet Kitchen Island & Cabinetry",
      category: "Projects",
      url: "https://framerusercontent.com/images/URVvm2e2n311SLbznqjwOjS6Pns.png?scale-down-to=1024&width=1448&height=1086",
      dimensions: "1448 x 1086",
      size: "950 KB",
      format: "PNG",
      tags: ["kitchen", "custom island", "marble", "san rafael"],
      assignedTo: "Contemporary Kitchen Remodel",
      uploadedAt: "2024-04-12"
    },
    {
      id: "med-5",
      title: "Master Ensuite Japanese Soaking Tub",
      category: "Projects",
      url: "https://framerusercontent.com/images/HnhIurfILJ3NurhYjLth8tXMvM.png?scale-down-to=1024&width=1448&height=1086",
      dimensions: "1448 x 1086",
      size: "1.1 MB",
      format: "PNG",
      tags: ["bathroom", "tub", "plaster", "san francisco"],
      assignedTo: "Spa-Inspired Bathroom Remodel",
      uploadedAt: "2024-06-02"
    },
    {
      id: "med-6",
      title: "Architectural Blueprint & Site Elevation",
      category: "Blueprints",
      url: "https://framerusercontent.com/images/spqZSEbMAjhztlmgUStzq9snwHQ.png?scale-down-to=1024&width=2000&height=1333",
      dimensions: "2000 x 1333",
      size: "2.4 MB",
      format: "PNG",
      tags: ["planning", "engineering", "schematics", "blueprint"],
      assignedTo: "Whole Home Renovation",
      uploadedAt: "2024-01-10"
    },
    {
      id: "med-7",
      title: "Commercial Warehouse Structural Trusses",
      category: "Projects",
      url: "https://framerusercontent.com/images/5D8SUEMZgCswNmfA3kbAygA8L0.png?scale-down-to=1024&width=1448&height=1086",
      dimensions: "1448 x 1086",
      size: "1.2 MB",
      format: "PNG",
      tags: ["commercial", "timber", "brick", "oakland"],
      assignedTo: "Commercial Creative Studio Loft",
      uploadedAt: "2024-03-25"
    },
    {
      id: "med-8",
      title: "On-Site Project Management Lead",
      category: "Team",
      url: "https://framerusercontent.com/images/sV0CAZAwKE1RB17JCdRjT8g7vkk.jpg?width=800&height=1023",
      dimensions: "800 x 1023",
      size: "620 KB",
      format: "JPG",
      tags: ["team", "supervisor", "hardhat", "construction crew"],
      assignedTo: "General",
      uploadedAt: "2024-02-14"
    }
  ],

  // Core Services
  services: [
    {
      id: "srv-1",
      title: "Planning & Preconstruction",
      tagline: "Every successful project starts with detailed planning.",
      description: "Accurate budgeting, architectural reviews, permitting coordination, and a clear construction roadmap designed to prevent delays.",
      icon: "Compass",
      deliverables: ["Feasibility study & site survey", "Permit expediters & city approvals", "Detailed line-item cost projections", "3D BIM model & walkthrough"]
    },
    {
      id: "srv-2",
      title: "General Construction",
      tagline: "Built to last with certified structural craftsmanship.",
      description: "From foundation ground-breaking to final framing, our licensed master builders bring designs to reality with uncompromising safety.",
      icon: "Hammer",
      deliverables: ["Seismic foundation & concrete works", "Engineered structural steel framing", "Certified mechanical & electrical", "Thermal envelope & roofing systems"]
    },
    {
      id: "srv-3",
      title: "Renovations & Remodeling",
      tagline: "Transform existing spaces into high-performance architecture.",
      description: "Specialized luxury kitchen remodels, primary ensuite upgrades, and comprehensive whole-home reconfiguration for modern living.",
      icon: "Layers",
      deliverables: ["Whole-house reconfiguration", "Turnkey kitchen & bath transformations", "Historic preservation & architectural retrofits", "Custom cabinetry & artisanal masonry"]
    },
    {
      id: "srv-4",
      title: "Project Management",
      tagline: "Transparent timelines and daily job site supervision.",
      description: "Full-service turnkey site management, cloud schedule tracking, weekly photo updates, and rigorous subcontractor quality control.",
      icon: "ClipboardCheck",
      deliverables: ["Dedicated on-site site superintendent", "Live weekly photo & milestone portal", "Rigorous safety inspections", "Guaranteed delivery schedules"]
    }
  ],

  // 4-Step Process directly from GridFly
  processSteps: [
    {
      step: "01",
      title: "Consultation",
      summary: "We listen, understand your goals, and assess your project needs.",
      details: "Initial on-site assessment or design review to evaluate site conditions, structural feasibility, and client aesthetic preferences."
    },
    {
      step: "02",
      title: "Planning & Estimate",
      summary: "We create a detailed plan and transparent estimate with no surprises.",
      details: "Comprehensive line-item budget estimate, material schedules, architectural specifications, and city permitting roadmap."
    },
    {
      step: "03",
      title: "Build & Manage",
      summary: "Our team builds with care while we manage every detail and keep you updated.",
      details: "Dedicated certified construction crew, daily clean-site protocols, quality checkpoints, and real-time client status updates."
    },
    {
      step: "04",
      title: "Final Walkthrough",
      summary: "We review every detail together to ensure your complete satisfaction.",
      details: "Punch list clearance, operational handover of all smart systems & appliances, warranty documentation, and ongoing maintenance guide."
    }
  ],

  // Pricing Packages
  pricing: [
    {
      id: "price-1",
      name: "Essential",
      tagline: "For small repairs, updates, and focused construction work.",
      cadence: "/project",
      popular: false,
      ctaText: "REQUEST A QUOTE",
      features: [
        "On-site project assessment",
        "Clear scope and cost estimate",
        "Basic material planning",
        "Scheduled crew coordination",
        "Quality workmanship checklist",
        "Project support by phone"
      ]
    },
    {
      id: "price-2",
      name: "Renovation",
      tagline: "Built for larger upgrades, remodels, and complete project management.",
      cadence: "Popular",
      popular: true,
      ctaText: "GET A FREE ESTIMATE",
      features: [
        "Everything in Essential",
        "Custom project planning & 3D renderings",
        "Detailed material guidance & sourcing",
        "Weekly photo and progress updates",
        "Dedicated on-site supervision",
        "Final walkthrough and warranty handover"
      ]
    }
  ],

  // Client Testimonials
  testimonials: [
    {
      id: "test-1",
      name: "Ryan Carter",
      handle: "@ryanc_builds",
      role: "Homeowner, Orinda",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      content: "The crew handled our renovation with clear timelines, solid workmanship, and zero confusion. The weekly updates kept us completely stress-free."
    },
    {
      id: "test-2",
      name: "Liam Foster",
      handle: "@liamf",
      role: "Architect, Palo Alto",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      content: "They made our home upgrade feel simple, professional, and completely stress-free. As an architect, their adherence to technical blueprints was flawless."
    },
    {
      id: "test-3",
      name: "Ethan James",
      handle: "@ethanj",
      role: "Property Investor, San Francisco",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
      content: "Delivered our kitchen and bath remodel two days ahead of schedule. Honest pricing with zero hidden surcharges. Will hire again for our next project."
    },
    {
      id: "test-4",
      name: "Jake Mitchell",
      handle: "@jakem",
      role: "Residential Client, Berkeley",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&h=200&q=80",
      content: "They turned our rough idea into a strong, finished space the whole family uses every day. Clean site management every single evening."
    }
  ],

  // Service Areas
  serviceAreas: [
    "San Francisco", "Mountain View", "Daly City", "Oakland", "Berkeley", 
    "Alameda", "San Leandro", "Hayward", "Union City", "Fremont", 
    "San Mateo", "Palo Alto", "Redwood City", "San Rafael", "Orinda"
  ],

  // Frequently Asked Questions
  faqs: [
    {
      id: "faq-1",
      question: "How do I start a project?",
      answer: "Contact us with your project details, and our lead estimator will review the scope, timeline, and schedule an on-site feasibility evaluation."
    },
    {
      id: "faq-2",
      question: "Do you provide estimates?",
      answer: "Yes, we provide transparent, itemized estimates based on architectural drawings, specified materials, and projected labor schedules."
    },
    {
      id: "faq-3",
      question: "What type of work do you handle?",
      answer: "We handle luxury residential remodels, additions, ground-up new builds, kitchen & bath transformations, and commercial conversions."
    },
    {
      id: "faq-4",
      question: "How long will my project take?",
      answer: "Turnkey kitchen remodels average 6 weeks. Whole-home renovations range from 12 to 20 weeks depending on structural permits."
    },
    {
      id: "faq-5",
      question: "Can the scope change later?",
      answer: "Yes. Any requested changes are documented through written change orders with explicit cost and schedule impact before implementation."
    },
    {
      id: "faq-6",
      question: "Are your crews licensed?",
      answer: "Yes, GridFly is fully licensed, bonded, and insured (CA LIC #1098421) exceeding California state safety and building regulations."
    }
  ],

  // Inquiries / Leads generated from the website form
  inquiries: [
    {
      id: "inq-101",
      clientName: "David Henderson",
      email: "david.h@gmail.com",
      phone: "+1 (415) 890-4122",
      service: "Renovations & Remodeling",
      budget: "$10K+",
      targetDate: "Next Month",
      address: "2400 Vallejo St, San Francisco, CA",
      message: "Looking to renovate our primary kitchen and adjacent dining room. Want open floor plan and marble countertops.",
      status: "New",
      date: "2026-11-22"
    },
    {
      id: "inq-102",
      clientName: "Sarah Montgomery",
      email: "smontgomery@techcorp.io",
      phone: "+1 (650) 433-8891",
      service: "General Construction",
      budget: "$10K+",
      targetDate: "Q1 2027",
      address: "1550 Cowper St, Palo Alto, CA",
      message: "Planning a 1,200 sq.ft. ADU addition in our backyard. Architectural blueprints are completed and ready for permit filing.",
      status: "Contacted",
      date: "2026-11-21"
    },
    {
      id: "inq-103",
      clientName: "Marcus Vance",
      email: "mvance@oaklandstudio.com",
      phone: "+1 (510) 774-1290",
      service: "Planning & Preconstruction",
      budget: "$5K-$10K",
      targetDate: "Within 3 Months",
      address: "480 9th St, Oakland, CA",
      message: "Need feasibility analysis and cost estimation for upgrading an industrial loft into a multi-use photography workspace.",
      status: "In Review",
      date: "2026-11-19"
    }
  ]
};
