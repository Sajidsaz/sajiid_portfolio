import ProfileCard from "./ProfileCard";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-main">
          <div className="hero-eyebrow">
            <span className="eyebrow">Colombo, Sri Lanka</span>
            <span className="dot" aria-hidden="true" />
            <span className="eyebrow">Full-stack &amp; AI</span>
          </div>

          <h1 className="bigname" aria-label="Sajidh">
            <span className="line">
              <span>Sajidh</span>
            </span>
          </h1>

          <p className="hero-statement r">
            I build web and mobile products end to end — and I&apos;m going deep
            on the <em>AI</em> that makes them smarter.
          </p>

          <div className="hero-links r">
            <a className="chip chip-primary" href="#work">
              Selected work <span className="arr" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <aside className="hero-aside r">
          <ProfileCard />
        </aside>
      </div>
    </section>
  );
}
