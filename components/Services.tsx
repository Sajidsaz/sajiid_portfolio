const SERVICES = [
  {
    num: "01",
    title: "UI/UX Design",
    desc: "Figma-based interface design — wireframing, prototyping, and design systems, from concept to developer handoff.",
  },
  {
    num: "02",
    title: "Web App Development",
    desc: "Full-stack web apps with React, Node, Django, and the MERN stack — APIs, dashboards, and storefronts end to end.",
  },
  {
    num: "03",
    title: "Mobile App Development",
    desc: "Cross-platform iOS and Android apps built with Flutter — from Figma mockups to store-ready builds.",
  },
  {
    num: "04",
    title: "AI / ML Integration",
    desc: "Bringing models and data into products — fair-pricing engines, recommendations, and other smart features.",
  },
  {
    num: "05",
    title: "ERP & Business Systems",
    desc: "Custom ERP and POS platforms — inventory, sales, CRM, HR, finance, and reporting unified on one backend.",
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head r">
          <h2>Services</h2>
          <span className="eyebrow">What I can build for you</span>
        </div>
        <div className="services-list">
          {SERVICES.map((s) => (
            <div className="service r" key={s.num}>
              <div className="service-head">
                <span className="service-num">{s.num}</span>
                <h3 className="service-title">{s.title}</h3>
              </div>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
