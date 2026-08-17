/**
 * Every user-visible string on the page. `ta.ts` mirrors this shape exactly —
 * the `Dictionary` type is derived from this file, so adding a key here is a
 * type error there until it is translated.
 *
 * Structural data (icons, images, prices, hrefs) stays in `lib/content.ts` and
 * is joined to these strings by id.
 */
export const en = {
  nav: {
    label: "Main",
    mobileLabel: "Mobile",
    links: {
      home: "Home",
      services: "Services",
      pricing: "Pricing",
      about: "About",
      drive: "Drive with Saaro",
      contact: "Contact",
      gallery: "Gallery",
    },
    book: "Book a Driver",
    /** The booking form the header button opens. Field labels are shared with
     *  the contact page's enquiry form. */
    dialog: {
      title: "Book a Driver",
      blurb: "Tell us when and where — we'll call you back to confirm.",
      close: "Close",
      troubleLead: "Prefer to talk? Call us at",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
  },

  hero: {
    titleTop: "Your car.",
    titleBottom: "Our driver.",
    body: "Book a verified professional driver to drive your own vehicle – in the city or across Tamil Nadu. Cars and load vehicles. Fares published, cash on completion.",
    book: "Book a Driver",
    /** `{phone}` is replaced with the number from siteConfig. */
    call: "Call {phone}",
    imageAlt: "A Saaro driver at the wheel of a customer's car",
    facts: {
      area: ["Serving Madurai, Chennai", "and across Tamil Nadu"],
      since: ["Operating", "since 2024"],
    },
  },

  howItWorks: {
    eyebrow: "How It Works",
    title: "Simple Steps Safe Journey",
    steps: {
      book: {
        title: "Book",
        description:
          "Tell us where, when and which vehicle – in the app or over a call.",
        imageAlt: "Booking a Saaro driver in the app beside a waiting car",
      },
      arrive: {
        title: "A verified driver arrives",
        description:
          "Licence and documents checked before any driver joins Saaro.",
        imageAlt: "A Saaro driver meeting a customer next to their car",
      },
      drive: {
        title: "They drive your car",
        description:
          "City limits or long-distance. You travel in your own vehicle.",
        imageAlt: "A Saaro driver at the wheel with the customer seated behind",
      },
      pay: {
        title: "Pay cash at the end",
        description:
          "Base fare plus distance and time. The rate is published – no surprises.",
        imageAlt: "A customer handing cash to a Saaro driver at the end of a trip",
      },
    },
  },

  services: {
    eyebrow: "Our Services",
    title: "Drivers For Every Kind Of Trip",
    from: "From",
    viewDetails: "View Details",
    items: {
      cityLimit: {
        title: "City Limit",
        description: "Local trips inside city limits.",
        imageAlt: "A temple gopuram against a blue sky",
      },
      outstation: {
        title: "Outstation",
        description:
          "Long-distance travel, three plan types to suit your trip.",
        imageAlt: "An open highway running through pine forest",
      },
      loadVehicles: {
        title: "Load Vehicles",
        description:
          "Experienced drivers for 4-wheeler and 6-wheeler goods vehicles.",
        imageAlt: "A red goods truck on the highway",
      },
    },
  },

  servicesPage: {
    titleTop: "Professional Drivers",
    titleBottom: "for Every Journey",
    body: "Whether it's a short city ride, a long outstation trip, or driving a load vehicle - we provide verified, experienced and dependable drivers at published fares. Cash payment at the end of your trip.",
    imageAlt:
      "A Saaro driver standing between a car and a load vehicle, with a city skyline and a highway route behind them",
    metaTitle: "Services — Saaro",
    metaDescription:
      "City trips, outstation travel and load vehicles. Verified, experienced drivers at published fares, with cash payment at the end of your trip.",
  },

  travelPlans: {
    eyebrow: "Service Options",
    title: "Choose the Right Travel Plan",
    startsFrom: "Starts from",
    cta: "View Pricing",
    items: {
      cityLimit: {
        title: "City Limit",
        description:
          "Local trips inside city limits. Perfect for daily needs and short rides.",
      },
      outstationReturn: {
        title: "Outstation Return",
        description: "Driver returns with the vehicle",
      },
      outstationDrop: {
        title: "Outstation Drop & Pickup",
        description: "One-way drop, driver returns by bus",
      },
      outstationHalt: {
        title: "Outstation – Continue Halt",
        description: "Multi-day, driver stays with the customer",
      },
    },
  },

  bookCta: {
    title: "Need a Driver for Your Next Trip?",
    body: "Book now and travel with comfort, safety and peace of mind.",
    /** `{phone}` is replaced with the number from siteConfig. */
    call: "Call {phone}",
    book: "Book a Driver",
    driverAlt: "A Saaro driver in uniform, arms folded",
  },

  faq: {
    eyebrow: "Questions",
    title: "Frequently asked",
    stillHave: "Still Have any Question ?",
    contact: "Contact us Now",
    items: {
      acting: {
        question: "What is an acting call driver?",
        answer:
          "A professional driver who comes to you and drives your vehicle. You keep your car; we provide the driver.",
      },
      car: {
        question: "Do you provide the car?",
        answer:
          "No. Saaro provides the driver, not the vehicle — our drivers drive your own car or load vehicle.",
      },
      automatic: {
        question: "Can you drive an automatic car?",
        answer:
          "Yes. Our drivers are experienced with both manual and automatic cars. Mention which you have when you book.",
      },
      multiDay: {
        question: "Can I book a driver for several days?",
        answer:
          "Yes. Choose the Outstation – Continue Halt plan and the driver stays with you for the whole trip.",
      },
      goods: {
        question: "Do you drive goods vehicles?",
        answer:
          "Yes. We have experienced drivers for both 4-wheeler and 6-wheeler goods vehicles.",
      },
    },
  },

  pricingPage: {
    titleTop: "Simple. Transparent.",
    titleBottom: "Published fares.",
    /** Rendered inside quotation marks by the component. */
    quote:
      "Here is exactly what we charge. Base fare, per kilometre, per minute – nothing hidden.",
    imageAlt:
      "The Saaro app showing a trip route and its fare breakdown, beside a car, a wallet and coins",
    metaTitle: "Pricing — Saaro",
    metaDescription:
      "Base fare, per-kilometre and per-minute rates, published in full. No hidden charges, and cash payment at the end of your trip.",
  },

  fareTable: {
    eyebrow: "Our Fare Plans",
    title: "Driver Charges & Fare Details",
    columns: {
      baseFare: "Base Fare",
      perKm: "Per Km",
      perMinute: "Per Minute",
      minDistance: "Min. Distance",
    },
    vehicles: {
      normal: "Normal Vehicle",
      load4: "Load Vehicle – 4 Wheeler",
      load6: "Load Vehicle – 6 Wheeler",
    },
    /** `{km}` is replaced with the figure. */
    distance: "{km} km",
    switchedOff: "Currently switched off",
    subtitles: {
      cityLimit: "driving within city limits",
      outstationReturn: "driver travels out and returns with the vehicle",
      outstationDrop: "one-way drop, driver returns by bus (bus fare included)",
      outstationHalt: "multi-day, driver stays with the customer",
    },
  },

  fareFormula: {
    eyebrow: "How Your Fare is Calculated",
    title: "Driver Services We Offer",
    intro:
      "A minimum distance applies per plan (50 km city, 100 km outstation), and outstation plans carry a minimum fare floor. Payment is cash at the end of the trip. Extra charges such as tolls and parking may be added by the driver during the ride.",
    pendingNote: "Formula pending written confirmation from the owner",
    formula:
      "Fare = Base fare + (per-km rate × km driven) + (per-minute rate × minutes of the trip)",
    example: {
      /** `{plan}`, `{vehicle}`, `{km}` and `{minutes}` are filled in. */
      heading: "Example — {plan}, {vehicle}, {km} km, {minutes} minutes",
      baseFare: "Base fare:",
      distance: "+ Distance:",
      time: "+ Time:",
      total: "total",
      totalNote: "(paid as cash at the end of the trip)",
      minutesShort: "min",
    },
    estimator: {
      title: "Estimate your fare",
      blurb:
        "Pick a plan, vehicle, distance and time – see roughly what you'd pay. This is an estimate only.",
      plan: "Plan",
      vehicle: "Vehicle",
      distance: "Distance (km)",
      duration: "Duration (hrs)",
      distancePlaceholder: "e.g. 80",
      durationPlaceholder: "e.g. 2",
      submit: "Calculate Estimate",
      resultTitle: "Estimated fare",
      baseFare: "Base fare",
      distanceRow: "Distance",
      timeRow: "Time",
      total: "Estimated total",
      /** Shown when the trip is shorter than the plan's minimum. */
      minimumApplied: "Charged at the plan's {km} km minimum distance.",
      disclaimer:
        "An estimate only — tolls, parking and waiting are not included.",
      invalid: "Enter a distance and a duration to see an estimate.",
    },
  },

  pricingFaq: {
    eyebrow: "Questions",
    title: "Pricing FAQ",
    stillHave: "Still Have any Question ?",
    contact: "Contact us Now",
    items: {
      fareCalc: {
        question: "How is the fare calculated?",
        answer:
          "A base fare, plus a per-kilometre rate and a per-minute rate for the actual trip. Every rate is on our pricing page.",
      },
      pay: {
        question: "How do I pay?",
        answer:
          "Cash at the end of the trip — nothing upfront. The driver will tell you the total before you pay.",
      },
      cancel: {
        question: "What if I cancel?",
        answer:
          "Cancel before the driver sets out and there is no charge. Once a driver is on the way, a small cancellation fee may apply.",
      },
      minimum: {
        question: "Is there a minimum booking?",
        answer:
          "Yes. City trips are billed at a 50 km minimum and outstation trips at 100 km, even when the distance driven is shorter.",
      },
      extras: {
        question:
          "Are tolls, parking and driver food/stay charged extra on outstation trips?",
        answer:
          "Tolls and parking are added to the fare during the trip. On multi-day outstation trips the driver's food and stay are arranged by the customer.",
      },
    },
  },

  aboutPage: {
    titleTop: "Driving trust.",
    titleBottom: "Delivering journeys.",
    bodyOne:
      "Saaro Acting Call Drivers was founded with a simple idea – every vehicle owner deserves a safe, reliable and professional driver whenever they need one.",
    bodyTwo:
      "Whether it's a local trip in the city, a long outstation drive, or a goods vehicle on the move, we make your journey comfortable, convenient and worry-free.",
    imageAlt: "A Saaro driver at work",
    metaTitle: "About — Saaro",
    metaDescription:
      "Saaro Acting Call Drivers provides safe, reliable and professional drivers for your own car or load vehicle, across Tamil Nadu.",
  },

  /** `prefix` sits smaller and ahead of the figure; empty where unused, so
   *  every entry keeps the same shape across locales. */
  aboutStats: {
    drivers: {
      prefix: "",
      value: "500+",
      label: "Verified Drivers",
      description: "Background checked & trained professionals",
    },
    rating: {
      prefix: "",
      value: "4.8/5",
      label: "Customer Rating",
      description: "Hundreds of happy customers across the region",
    },
    since: {
      prefix: "Since",
      value: "2024",
      label: "Operating Since",
      description: "Proudly serving customers with dedication",
    },
    coverage: {
      prefix: "",
      value: "Across Region",
      label: "Service Coverage",
      description: "From major hubs to suburban areas",
    },
  },

  ourStory: {
    eyebrow: "Our Story",
    title: "Built on trust. Focused on you.",
    bodyOne:
      "Saaro Acting Call Drivers began its journey in 2024 with a mission to bring professionalism and transparency to the driver service industry.",
    bodyTwo:
      "We understood that vehicle owners want two things – a verified, skilled driver and fair, clear pricing. That's why we built Saaro Acting Call Drivers around trust, safety and simple processes.",
    bodyThree:
      "Today, we are proud to serve thousands of customers with a growing community of professional drivers.",
    imageAlt: "Saaro drivers at work",
    milestones: {
      launch: {
        date: "July 2024",
        description: "Saaro launches in Madurai – our home city and original market.",
      },
      chennai: {
        date: "March 2025",
        description: "Coverage extends to Chennai.",
      },
      statewide: {
        date: "June 2025",
        description:
          "Coverage expands state-wide – all live services now attach to Tamil Nadu.",
      },
      today: {
        date: "Today",
        /** Figures are filled in from `inNumbers` so they cannot drift. */
        description:
          "{drivers} drivers on the platform, {ratings} customer ratings collected, {documents} driver documents verified.",
      },
    },
  },

  commitment: {
    /** The eyebrow is set in two weights, so it is stored as two parts. */
    eyebrowLead: "Our",
    eyebrowStrong: "Commitment",
    titleTop: "Your journey.",
    titleBottom: "Our responsibility.",
    imageAlt: "A Saaro driver caring for a customer's vehicle",
    items: {
      safety: "Your safety is our top priority.",
      care: "We treat your vehicle with the utmost care.",
      value: "We value your time and money.",
      satisfaction: "We are committed to your complete satisfaction.",
    },
  },

  drivePage: {
    titleTop: "Drive with Saaro.",
    /** Second line is split so only the closing phrase takes the brand green. */
    titleLead: "Earn on",
    titleAccent: "Your Schedule.",
    body: "Join Tamil Nadu's trusted driver network. Flexible working hours, transparent earnings, weekly payouts, and verified customer trips.",
    cta: "Apply Now",
    imageAlt:
      "A Saaro driver standing beside a car with the app open on a phone",
    metaTitle: "Drive with Saaro — Earn on your schedule",
    metaDescription:
      "Join Tamil Nadu's trusted driver network. Flexible hours, transparent earnings and weekly payouts direct to your account.",
    highlights: {
      earnings: {
        title: "₹20,000-₹45,000",
        description: "Your earnings depend on trips, time & locations.",
      },
      hours: {
        title: "Flexible Hours",
        description: "Drive part-time or full-time. You are in control.",
      },
      payouts: {
        title: "Weekly Payouts",
        description: "Payments every week, direct to your account.",
      },
    },
  },

  driveBenefits: {
    eyebrow: "Why Drive With SAARO",
    title: "Everything You Need to Earn",
    items: {
      hours: {
        title: "Flexible Working Hours",
        description: "You decide when and how much you want to drive.",
        imageAlt: "A Saaro driver beside a clock",
      },
      payments: {
        title: "Weekly Payments",
        description: "Get paid every week. Always on time.",
        imageAlt: "A wallet holding rupee notes",
      },
      customers: {
        title: "Verified Customers",
        description: "All customers are verified for your safety.",
        imageAlt: "A verified customer beside a shield badge",
      },
      coverage: {
        title: "Work Across Tamil Nadu",
        description: "Drive in your city or travel across the state.",
        imageAlt: "A map of Tamil Nadu with a location pin",
      },
    },
  },

  driveSteps: {
    eyebrow: "How It Works",
    title: "Start Driving In Four Simple Steps",
    imageAlt:
      "A verified Saaro driver beside a checklist, licence, phone and training certificate",
    items: {
      apply: {
        title: "Submit Application",
        description: "Fill out the simple online application form.",
      },
      verify: {
        title: "Document Verification",
        description: "We verify your documents and driving details.",
      },
      training: {
        title: "Training & Approval",
        description: "Complete training (if required) and get approved.",
      },
      start: {
        title: "Start Driving",
        description: "Go online and start accepting trips & earn.",
      },
    },
  },

  driverBenefits: {
    eyebrow: "Driver Benefits",
    titleTop: "More Earnings.",
    titleBottom: "More Freedom.",
    imageAlt:
      "A Saaro driver holding a wallet and a phone showing a completed trip, beside a car and a family",
    items: {
      earnings: "Transparent earnings and clear trip details",
      deductions: "No hidden deductions or surprises",
      schedule: "Flexible schedule – drive when you want",
      support: "Friendly support team – always here for you",
      environment: "Professional and respectful working environment",
    },
  },

  driverRequirements: {
    eyebrow: "Requirements",
    title: "Driver Requirements",
    items: {
      licence: {
        title: "Valid Driving Licence",
        description: "Light / LMV or HMV based on vehicle",
        imageAlt: "A Saaro driver holding up a driving licence",
      },
      age: {
        title: "Minimum Age 21+",
        description: "Applicants must be at least 21 years old",
        imageAlt: "A Saaro driver beside a 21+ minimum age badge",
      },
      id: {
        title: "Aadhaar / ID Proof",
        description: "Valid government ID proof",
        imageAlt: "A Saaro driver holding up a government ID card",
      },
      record: {
        title: "Good Driving Record",
        description: "Clean driving record is mandatory",
        imageAlt: "A Saaro driver beside a verified background-check list",
      },
      smartphone: {
        title: "Smartphone Required",
        description: "Android smartphone with internet",
        imageAlt: "A Saaro driver holding a smartphone running the app",
      },
      behaviour: {
        title: "Professional Behaviour",
        description: "Polite, professional & customer-friendly",
        imageAlt: "A Saaro driver greeting a customer",
      },
    },
  },

  goldenDriver: {
    label: "Golden Driver",
    /** Rendered inside quotation marks by the component. */
    quote:
      "Every 5-star trip earns you a point. Reach 50 points and you become a Golden Driver.",
    cta: "Apply Now",
  },

  driverStories: {
    eyebrow: "Testimonials",
    title: "Drivers Stories",
    items: {
      preethi: {
        name: "Preethi",
        city: "Madurai",
        quote:
          "Saaro gives me the freedom to earn on my own time. Weekly payments are very helpful.",
      },
      prakash: {
        name: "Prakash",
        city: "Madurai",
        quote:
          "The app is easy to use and customers are very polite. Good trips, good earnings.",
      },
      mani: {
        name: "Mani",
        city: "Madurai",
        quote:
          "I drive part-time and still earn well. Support team is always responsive.",
      },
    },
  },

  driveSignup: {
    panel: {
      titleTop: "Drive with SAARO.",
      titleBottom: "Earn on Your Terms.",
      bodyOne: "Flexible hours. Weekly payouts.",
      bodyTwo: "Verified rides. Grow with SAARO.",
      perks: {
        earn: "Earn More",
        schedule: "Flexible Schedule",
        verified: "Verified Rides",
        payouts: "Weekly Payouts",
      },
      safety: "Your Safety, Our Priority",
      support: "24/7 Support Always Here for You",
      ownBossTop: "Be Your Own Boss.",
      ownBossBottom: "We'll Take Care of the Rest.",
    },
    form: {
      title: "Sign up to drive",
      blurb: "Start your journey with Saaro today.",
      personal: "Personal Details",
      professional: "Professional Details",
      fullName: "Full name",
      fullNamePlaceholder: "e.g. Karthik M",
      phone: "Phone number",
      phonePlaceholder: "10-digit mobile number",
      city: "City",
      cityPlaceholder: "e.g. Madurai",
      licence: "Licence number",
      licencePlaceholder: "Enter valid driving licence",
      licenceUpload: "Upload licence",
      aadhaar: "Aadhaar number",
      aadhaarPlaceholder: "Enter 12-digit Aadhaar number",
      aadhaarUpload: "Upload Aadhaar",
      front: "Front",
      back: "Back",
      uploadHint: "PNG or JPG, up to 5 MB",
      experience: "Years of driving experience",
      experiencePlaceholder: "Select experience level",
      vehicles: "Vehicle types you can drive",
      vehiclesPlaceholder: "Select what type car you drive",
      consentLead: "I agree to Saaro's",
      consentAnd: "and",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      submit: "Submit application",
      /** `{phone}` is replaced with the number from siteConfig. */
      trouble: "Trouble submitting? Call us directly at {phone}",
      downloadApp: "Download Saaro Driver App",
      experienceOptions: {
        under1: "Less than 1 year",
        one3: "1 – 3 years",
        three5: "3 – 5 years",
        over5: "More than 5 years",
      },
      vehicleOptions: {
        car: "Normal car (LMV)",
        automatic: "Automatic car",
        load4: "Load vehicle – 4 wheeler",
        load6: "Load vehicle – 6 wheeler",
      },
    },
  },

  contactPage: {
    titleTop: "Get In Touch",
    titleBottom: "We're Here to Help.",
    bodyOne:
      "Have questions, need a driver, or want to know more about Saaro? We're just a call or message away.",
    bodyTwo:
      "Reach out to us for bookings, driver inquiries, partnerships, or any support you need.",
    call: "Call Now",
    whatsapp: "WhatsApp Us",
    imageAlt:
      "A Saaro support agent at a desk, surrounded by call, email, WhatsApp and live chat icons",
    metaTitle: "Contact Saaro — We're here to help",
    metaDescription:
      "Call or message Saaro for bookings, driver inquiries, partnerships or support. Tamil and English support across Tamil Nadu.",
  },

  contactChannels: {
    phone: { title: "Phone", hint: "Call us anytime" },
    email: { title: "Email", hint: "We reply within 24 hours" },
    whatsapp: { title: "WhatsApp", hint: "Chat with us on WhatsApp" },
    address: {
      title: "Office Address",
      /** One entry per rendered line, as the design breaks it. */
      lines: [
        "Sairam School Complex,",
        "Ground Floor, HAK Road,",
        "Tallakulam, Madurai - 625002,",
        "Tamil Nadu",
      ],
    },
  },

  enquiry: {
    title: "Send an enquiry",
    blurb: "Tell us what you need — we'll call you back to confirm.",
    mapAlt: "Map showing the Saaro office in Tallakulam, Madurai",
    name: "Name",
    phone: "Phone",
    phonePlaceholder: "10-digit mobile number",
    service: "Service needed",
    serviceOptions: {
      cityLimit: "City limit",
      outstation: "Outstation",
      loadVehicles: "Load vehicle",
    },
    vehicle: "Vehicle type",
    vehicleOptions: {
      car: "Normal car (LMV)",
      automatic: "Automatic car",
      load4: "Load vehicle – 4 wheeler",
      load6: "Load vehicle – 6 wheeler",
    },
    select: "Select",
    pickup: "Pickup city / area",
    when: "Date & time needed",
    message: "Message",
    consentLead: "I agree to Saaro's",
    privacy: "Privacy Policy",
    /** Tamil puts the verb after the object, so the sentence needs a tail. */
    consentTail: ".",
    submit: "Send enquiry",
    /** The number itself is rendered as a link, so it is not interpolated. */
    troubleLead: "Trouble sending? Call us directly at",
  },

  terms: {
    breadcrumb: "Breadcrumb",
    breadcrumbHome: "Home",
    eyebrow: "Legal",
    title: "Terms & Conditions",
    contents: "On this page",
    metaTitle: "Terms & Conditions — Saaro Acting Call Drivers",
    metaDescription:
      "The terms that apply when you book an acting driver through Saaro: bookings, fares, payment, cancellations, conduct and liability.",
    /** Shown until the owner and a lawyer have signed the page off. */
    note:
      "This page is a draft prepared for owner and legal review before publishing — several clauses are marked pending confirmed business details (entity name, GSTIN, liability terms).",
    sections: {
      who: {
        title: "Who we are",
        body: [
          "Saaro Acting Call Drivers (“Saaro”, “we”, “us”) is an acting-driver service based in Madurai, Tamil Nadu, operating at Sairam School Complex, Ground Floor, HAK Road, Tallakulam, Madurai – 625002.",
        ],
        pending: "Legal entity name and type pending",
      },
      provide: {
        title: "What we provide",
        body: [
          "Saaro connects customers who own a vehicle with verified professional drivers, who drive the customer's own car or load vehicle for a booked trip. Saaro is not a taxi service and does not own or provide vehicles.",
        ],
      },
      booking: {
        title: "Booking & the driver",
        body: [
          "Bookings are made through the Saaro Rider app or by phone.",
          "A verified driver has 60 seconds to accept a booking request.",
          "Every driver's Driving Licence and Gas Bill are checked and must be within their validity period before the driver is allowed to accept trips. Aadhaar is optional.",
        ],
      },
      fares: {
        title: "Fares & payment",
        body: [
          "Fare = Base fare + (per-kilometre rate × distance) + (per-minute rate × trip duration), as published on our Pricing page.",
          "A minimum distance applies per plan (50 km for City Limit, 100 km for Outstation plans).",
          "Payment is made in cash, directly to the driver, at the end of the trip.",
          "Tolls and parking charges, where applicable, are additional and may be collected by the driver during the trip.",
          "Saaro retains a 15% commission on each ride from the driver's earnings; this does not change the fare paid by the customer.",
        ],
      },
      cancellations: {
        title: "Cancellations",
        body: [
          "A cancellation charge of ₹200 applies once a driver has accepted a booking. See our Cancellation & Refund Policy for full details.",
        ],
      },
      customers: {
        title: "Customer conduct",
        body: [
          "Customers are expected to treat drivers with courtesy and to provide a safe vehicle in roadworthy condition.",
          "Saaro reserves the right to suspend access to the platform for abusive conduct toward drivers.",
        ],
      },
      drivers: {
        title: "Driver conduct & the Golden Driver programme",
        body: [
          "Drivers are rated after every trip. Consistently high ratings contribute toward Golden Driver status (50 points from 5-star trips). Saaro reserves the right to remove a driver from the platform for safety or conduct violations.",
        ],
      },
      liability: {
        title: "Liability",
        body: [
          "Saaro verifies driver documentation before onboarding but does not own, insure, or maintain the customer's vehicle. The vehicle's insurance, roadworthiness and legal compliance remain the customer's responsibility.",
        ],
        pending: "Full liability and insurance clauses pending legal review",
      },
      changes: {
        title: "Changes to these terms",
        body: [
          "We may update these terms from time to time. Changes will be posted on this page with an updated date.",
        ],
      },
      contact: {
        title: "Contact",
        /** {email} and {phone} are replaced with links when rendered. */
        body: [
          "Questions about these terms can be sent to {email} or by calling {phone}.",
        ],
      },
    },
  },

  shipping: {
    breadcrumb: "Breadcrumb",
    breadcrumbHome: "Home",
    eyebrow: "Legal",
    title: "Shipping Policy",
    contents: "On this page",
    lastUpdated: "Last updated: 5 August 2026",
    metaTitle: "Shipping Policy — Saaro Acting Call Drivers",
    metaDescription:
      "Saaro is a driver service, not a goods business. Nothing is shipped: drivers are booked to drive the customer's own vehicle, and both apps are delivered digitally.",
    note: "This page exists mainly to satisfy payment-gateway compliance requirements that expect a shipping policy link — it does not describe a delivery service, since Saaro doesn't operate one.",
    sections: {
      goods: {
        title: "No physical goods are shipped",
        body: [
          "Saaro Acting Call Drivers is a driver service, not a goods or e-commerce business. We do not sell, ship, or deliver any physical product. Our drivers are booked to drive the customer's own vehicle – nothing is shipped to you.",
        ],
      },
      load: {
        title: "Load vehicle bookings",
        body: [
          "Where a customer books a Saaro driver for their own load vehicle (4-wheeler or 6-wheeler), any goods carried on that vehicle remain entirely the customer's responsibility – their packing, loading, condition, and delivery. Saaro provides the driver only, not the vehicle, insurance, or courier service for the goods themselves.",
        ],
      },
      apps: {
        title: "Digital delivery (apps)",
        body: [
          "The Saaro Rider and Saaro Driver apps are delivered digitally as direct APK downloads. There is no physical shipping involved in accessing them.",
        ],
      },
      contact: {
        title: "Contact",
        body: [
          "Questions about this policy can be sent to {email} or by calling {phone}.",
        ],
      },
    },
  },

  gallery: {
    breadcrumb: "Breadcrumb",
    breadcrumbHome: "Home",
    eyebrow: "Saaro",
    title: "Gallery",
    metaTitle: "Gallery — Saaro Acting Call Drivers",
    metaDescription:
      "Photos and videos from the road: our drivers, the vehicles they drive and the places across Tamil Nadu that Saaro travels to.",
    photos: {
      eyebrow: "Photos",
      title: "Captured Moments",
      alt: {
        coast:
          "The Thiruvalluvar statue and Vivekananda Rock Memorial lit up at dusk off Kanyakumari",
        wheel: "A driver's hands on the steering wheel on a city street at night",
        highway: "A Saaro Logistics lorry on an open highway at sunset",
        falls: "A waterfall running down a rock face through dense forest",
      },
    },
    videos: {
      eyebrow: "Videos",
      title: "Watch & Discover",
      /** Announced on the play control of each card. */
      play: "Play video",
      items: {
        places: {
          title: "Tamil Nadu — places you must watch",
          quote:
            "It's about providing a space where my clients can relax and prepare for their day.",
        },
        training: {
          title: "Starting Out Right",
          quote: "The training here sets you up for success from day one.",
        },
        office: {
          title: "Office Tour",
          quote: "Every package is important to someone. We treat it that way.",
        },
        safety: {
          title: "Safety First",
          quote:
            "After 20 years, I can tell you that cutting corners is never worth it.",
        },
        urban: {
          title: "The Urban Challenge",
          quote:
            "Navigating city traffic efficiently requires skill and local knowledge.",
        },
        highway: {
          title: "Life on the Highway",
          quote:
            "The open road offers freedom, but it also demands immense responsibility.",
        },
      },
    },
    pagination: {
      label: "Pagination",
      previous: "Previous page",
      next: "Next page",
      page: "Page {n}",
    },
  },

  refunds: {
    breadcrumb: "Breadcrumb",
    breadcrumbHome: "Home",
    eyebrow: "Legal",
    title: "Cancellation & Refund Policy",
    contents: "On this page",
    lastUpdated: "Last updated: 5 August 2026",
    metaTitle: "Cancellation & Refund Policy — Saaro Acting Call Drivers",
    metaDescription:
      "When a cancellation charge applies, how refunds are processed, what happens if a driver does not arrive, and how to request a cancellation or refund.",
    sections: {
      cancelling: {
        title: "Cancelling a booking",
        body: [
          "Once a driver has accepted your booking, cancelling the trip attracts a cancellation charge of ₹200.",
        ],
      },
      refunds: {
        title: "Refunds",
        body: [
          "Where a refund is due, it is processed within 7 business days to your original payment method.",
        ],
        callout:
          "This clause needs the owner's confirmation. The refund rule currently on record — “if the ride completes before 1 hour, a refund of ₹20 per hour will be provided” — is unclear as written (it isn't obvious what triggers it, or how “₹20 per hour” is measured against a ride under an hour). We are not publishing a specific short-trip refund formula until this is clarified. Until then, refund requests are handled case by case — contact us at {phone} or {email}.",
      },
      noshows: {
        title: "Driver no-shows or delays",
        body: [
          "If a verified driver does not arrive as booked, contact us directly and we will arrange a replacement or process a refund where a cash payment isn't involved.",
        ],
      },
      how: {
        title: "How to request a cancellation or refund",
        body: [
          "Call us at {phone}, or",
          "Email {email}, or",
          "Use the cancellation option in the Saaro Rider app.",
        ],
      },
      contact: {
        title: "Contact",
        body: [
          "Questions about this policy can be sent to {email} or by calling {phone}.",
        ],
      },
    },
  },

  privacy: {
    breadcrumb: "Breadcrumb",
    breadcrumbHome: "Home",
    eyebrow: "Legal",
    title: "Privacy Policy",
    contents: "On this page",
    lastUpdated: "Last updated: 5 August 2026",
    metaTitle: "Privacy Policy — Saaro Acting Call Drivers",
    metaDescription:
      "What Saaro collects from customers and drivers, how that information is used and shared, how it is stored, and how to have it corrected or deleted.",
    note: "This page is a draft prepared for owner and legal review before publishing.",
    sections: {
      collect: {
        title: "Information we collect",
        body: [
          "From customers: name, phone number, pickup location, trip details, and any message submitted through our enquiry form.",
          "From drivers: name, phone number, city, Driving Licence and Gas Bill details, driving experience, vehicle types, and Aadhaar if provided.",
          "Automatically: basic usage data from our website and apps (pages visited, app interactions) to help us improve the service.",
        ],
      },
      use: {
        title: "How we use your information",
        body: [
          "To connect customers with a verified driver and coordinate the trip.",
          "To verify driver documents before onboarding.",
          "To respond to enquiries and driver sign-up applications.",
          "To calculate fares, track ratings, and administer the Golden Driver programme.",
        ],
      },
      share: {
        title: "How we share your information",
        body: [
          "Customer contact and pickup details are shared with the assigned driver so the trip can happen.",
          "We do not sell personal information to third parties.",
        ],
      },
      storage: {
        title: "Data storage",
        body: [
          "Information submitted through our website and apps is stored securely and retained only as long as needed to provide the service.",
        ],
        pending: "Retention periods and storage location pending confirmation",
      },
      choices: {
        title: "Your choices",
        body: [
          "You can ask us to review, correct, or delete the personal information we hold about you by emailing {email}.",
        ],
      },
      cookies: {
        title: "Cookies & analytics",
        body: [
          "Our website may use basic analytics to understand how visitors use the site (e.g. which pages are viewed, whether the phone number is tapped). This data is used only to improve the site.",
        ],
      },
      changes: {
        title: "Changes to this policy",
        body: [
          "We may update this policy from time to time. Changes will be posted on this page with an updated date.",
        ],
      },
      contact: {
        title: "Contact",
        body: [
          "Questions about this policy can be sent to {email} or by calling {phone}.",
        ],
      },
    },
  },

  whyChoose: {
    eyebrow: "Why Choose SAARO",
    title: "Trusted by car owners across Tamil Nadu",
    items: {
      verified: {
        title: "Verified Drivers",
        description:
          "Every driver's licence and documents are checked and approved before their first trip.",
      },
      prices: {
        title: "Prices Published",
        description:
          "Base fare, per-kilometre and per-minute rates are all on our pricing page.",
      },
      language: {
        title: "Tamil & English",
        description:
          "Talk to us and to your driver in the language you're comfortable in.",
      },
      cash: {
        title: "Cash on Completion",
        description: "Pay at the end of the trip. Nothing upfront.",
      },
      vehicles: {
        title: "Cars & Load Vehicles",
        description:
          "Normal cars, automatics, 4-wheeler and 6-wheeler goods vehicles.",
      },
      rated: {
        title: "Rated by Customers",
        description: "Hundreds of ratings from journeys across Tamil Nadu.",
      },
    },
  },

  pricingBanner: {
    lineOne: "City trips from ₹300.",
    lineTwo: "Outstation from ₹900.",
    note: "Every rate published in full. No hidden charges.",
    cta: "See Full Pricing",
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "Our Clients Say",
    items: {
      kumaran: {
        name: "Kumaran",
        city: "Madurai",
        quote:
          "Saaro Acting Call Drivers is an excellent driver service agent with quick service, good offers, and reasonably priced packages. The hassle-free process and multilingual assistance make it a great choice for anyone in need of a reliable driver. I highly recommend their great service to all!",
      },
      thomas: {
        name: "Thomas",
        city: "Madurai",
        quote:
          "Saaro Acting Call Drivers offers excellent service! The drivers are professional, punctual, and courteous. The booking process is simple and convenient. They provide safe and comfortable rides at reasonable rates. I highly recommend their services for anyone needing a reliable driver in the city.",
      },
      meenakshi: {
        name: "Meenakshi",
        city: "Madurai",
        quote:
          "I interacted with Saaro Acting Call Drivers, a driver service agency, and found their prices to be reasonable. The overall interaction was excellent, and the service provided was satisfactory.",
      },
    },
  },

  getTheApp: {
    eyebrow: "Get the app",
    title: "Book in seconds with the Saaro app",
    body: "Quick booking, live tracking and easy payments.",
    phoneAlt: "The Saaro app showing a driver arriving on a live map",
    features: {
      booking: {
        title: "Quick Booking",
        description: "Book in a few taps",
      },
      tracking: {
        title: "Live Tracking",
        description: "Track your driver in real time",
      },
      rated: {
        title: "Rated Drivers",
        description: "Ride with trusted professionals",
      },
    },
  },

  downloads: {
    downloadNow: "Download Now",
    items: {
      rider: {
        name: "Saaro Rider",
        blurb: "For customers — book a driver, track your trip.",
      },
      driver: {
        name: "Saaro Driver",
        blurb: "For drivers — accept rides, track earnings.",
      },
    },
  },

  inNumbers: {
    title: "SAARO In Numbers",
    items: {
      drivers: { value: "87+", label: "Drivers on the platform" },
      ratings: { value: "345+", label: "Customer ratings" },
      documents: { value: "145+", label: "Documents verified" },
      years: { value: "1+", label: "Year of trusted service" },
    },
  },

  earn: {
    eyebrow: "Do you drive?",
    title: "Earn with Saaro",
    bodyTop: "Flexible hours. Weekly earnings.",
    bodyBottom: "Transparent 15% commission.",
    cta: "Drive with Saaro",
    driverAlt: "A Saaro driver in uniform",
    perks: {
      hours: "Flexible Hours",
      payouts: "Weekly Payouts",
      rewards: "Golden Driver Rewards",
      growth: "Grow with Saaro",
    },
  },

  footer: {
    lockup: "Acting Call Drivers",
    tagline:
      "Professional acting drivers for your own car or load vehicle - in the city or across Tamil Nadu.",
    quickLinks: "Quick Links",
    legal: "Legal",
    legalLinks: {
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      refunds: "Cancellation & Refund Policy",
      shipping: "Shipping Policy",
    },
    contact: "Contact Us",
    address: [
      "Sairam School Complex, Ground Floor,",
      "HAK Road, Tallakulam, Madurai - 625002,",
      "Tamil Nadu (Opposite OCPM Government",
      "Girls High School)",
    ],
    copyright: "Copyright 2025 © SAARO All Rights Reserved.",
  },

  metadata: {
    title: "Saaro — Your car. Our driver.",
    description:
      "Book a verified professional driver to drive your own vehicle — in the city or across Tamil Nadu. Cars and load vehicles. Fares published, cash on completion.",
  },
};

/** Derived from `en`, so every locale must supply exactly these keys. Note the
 *  absence of `as const` above — the values must widen to `string` for other
 *  dictionaries to be assignable. */
export type Dictionary = typeof en;
