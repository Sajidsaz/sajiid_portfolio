export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-body r">
            <div
              className="section-head"
              style={{ marginBottom: "clamp(24px,4vh,40px)" }}
            >
              <h2>About</h2>
            </div>
            <p>
              I&apos;m an Applied Information Technology undergraduate at SLTC
              Research University, specialising in AI engineering on top of a
              full-stack foundation.
            </p>
            <p>
              I&apos;m most at home self learning and shipping complete products from the Figma
              file to the database across web and mobile. Lately I&apos;ve
              been pulling AI and data work into that, so the things I build can
              make better decisions, not just store information.
            </p>
            <p>
              I&apos;m currently looking for an internship where I can apply
              that mix to real problems.
            </p>
          </div>

          <div className="r">
            <div
              className="section-head"
              style={{ marginBottom: "clamp(24px,4vh,40px)" }}
            >
              <h2 style={{ fontSize: "clamp(24px,3.4vw,34px)" }}>Education</h2>
            </div>

            <div className="edu-item">
              <div className="deg">BSc. Applied Information Technology</div>
              <div className="meta">
                <span>SLTC Research University</span>
                <span className="res">Expected Jun 2027</span>
              </div>
            </div>

            <div className="edu-item">
              <div className="deg">
                G.C.E. Advanced Level — Physical Science
              </div>
              <div className="meta">
                <span>Al-Hilal National School, Polonnaruwa</span>
                <span className="res">2C · 1S</span>
              </div>
            </div>

            <div className="edu-item">
              <div className="deg">G.C.E. Ordinary Level</div>
              <div className="meta">
                <span>D.S. Senanayake College, Colombo 07</span>
                <span className="res">8A · 1B</span>
              </div>
            </div>

            <div className="edu-item">
              <div
                className="deg"
                style={{
                  fontFamily: "var(--mono)",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--grey-1)",
                }}
              >
                Coursework
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 16,
                  color: "#333",
                  lineHeight: 1.5,
                }}
              >
                Data Structures &amp; Algorithms · Statistics &amp; Probability
                · Database Systems · Software Engineering · Web Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
