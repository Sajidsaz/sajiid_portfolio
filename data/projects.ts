export type Project = {
  /** e.g. "01 — 03 · 2025 · Ongoing" */
  indexLabel: string;
  title: string;
  tag: string;
  /** GitHub repo URL. Set to undefined to hide the GitHub chip. */
  github?: string;
  /** Live/demo URL. Set to undefined to hide the Live chip. */
  live?: string;
  desc: string;
  points: string[];
  stack: string[];
  frame: "browser" | "phone";
  /** Browser-frame fake URL label (browser frame only). */
  frameLabel?: string;
  /** Image under /public — e.g. "/assets/erp.png". Falls back to a placeholder if missing. */
  image: string;
  imageAlt: string;
  /** Placeholder text shown until the real image is added. */
  placeholder: string;
};

export const projects: Project[] = [
  {
    indexLabel: "01 — 03 · 2025 · Ongoing",
    title: "ERP System with POS",
    tag: "Business platform",
    github: "https://github.com/Sajidsaz",
    // No public live site yet — remove `live` or set a URL to show the chip.
    live: undefined,
    desc: "A full Enterprise Resource Planning system with an integrated Point-of-Sale module, built to centralise operations for small and medium businesses on a single backend.",
    points: [
      "Engineered 8 core modules on one PHP/MySQL backend — Inventory, Sales & Orders, POS, CRM, HR, Finance, Reporting, and User & Role Management.",
      "Implemented role-based access control and full CRUD workflows across every module.",
      "Built dashboards surfacing real-time operational and financial KPIs.",
    ],
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    frame: "browser",
    frameLabel: "erp-system · dashboard",
    image: "/assets/erp.png",
    imageAlt: "ERP System dashboard",
    placeholder: "assets/erp.png",
  },
  {
    indexLabel: "02 — 03 · 2025 · iOS & Android",
    title: "HEYSAZ Fashion Store",
    tag: "E-commerce app",
    github: "https://github.com/Sajidsaz",
    live: undefined,
    desc: "A cross-platform fashion e-commerce app taken from Figma mockups to a working Flutter build for Android and iOS.",
    points: [
      "Architected with the MVVM pattern and the Provider package for scalable, testable state across 12+ ViewModels.",
      "Shipped the full shopping journey: auth, catalog & detail views, filtered search, cart, wishlist, checkout, order history, notifications, and profile.",
      "Built a custom theming system with reusable widgets and a design language matched to the Figma source.",
    ],
    stack: ["Flutter", "Dart", "Provider (MVVM)", "Firebase", "Figma"],
    frame: "phone",
    image: "/assets/fashionstore.png",
    imageAlt: "HEYSAZ Fashion Store app",
    placeholder: "assets/fashionstore.png",
  },
  {
    indexLabel: "03 — 03 · 2025 · Web",
    title: "HEYSAZ Web Store",
    tag: "MERN e-commerce",
    github: "https://github.com/Sajidsaz",
    live: "https://e-com-app-brown.vercel.app/",
    desc: "A full-stack clothing store for the HEYSAZ brand, built on the MERN stack — the web counterpart to the mobile app, live in production.",
    points: [
      "Built end to end on the MERN stack — MongoDB, Express, React, and Node.js — with a REST API backend and a React storefront.",
      "Implemented the core shopping flow: product catalog, detail pages, cart, and checkout.",
      "Deployed to production on Vercel.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Vercel"],
    frame: "browser",
    frameLabel: "e-com-app · heysaz",
    image: "/assets/heysaz-erp.png",
    imageAlt: "HEYSAZ web store",
    placeholder: "assets/heysaz-erp",
  },
];
