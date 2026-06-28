"use client";

import { useRef, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "ok"; text: string }
  | { type: "err" };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    _gotcha: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const year = new Date().getFullYear();

  function update<K extends keyof typeof values>(key: K, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
    if (key in errors && errors[key as keyof Errors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Your name is required";
    if (!values.subject.trim()) next.subject = "A subject is required";
    if (!values.message.trim()) next.message = "A short message is required";
    if (!values.email.trim()) next.email = "Email is required";
    else if (!emailRe.test(values.email.trim()))
      next.email = "Enter a valid email";

    setErrors(next);
    const order: (keyof typeof refs)[] = [
      "name",
      "email",
      "subject",
      "message",
    ];
    const firstBad = order.find((k) => next[k]);
    if (firstBad) {
      refs[firstBad].current?.focus();
      return false;
    }
    return true;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // honeypot — silently "succeed" for bots
    if (values._gotcha) {
      setStatus({ type: "ok", text: "Thanks — your message was sent." });
      return;
    }
    if (!validate()) return;

    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus({ type: "ok", text: "Thanks — I'll get back to you soon." });
      setValues({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        _gotcha: "",
      });
    } catch {
      setStatus({ type: "err" });
    }
  }

  const statusClass =
    status.type === "ok"
      ? "cform-status ok"
      : status.type === "err"
        ? "cform-status err"
        : "cform-status";

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left r">
            <span className="eyebrow">Open to internships &amp; projects</span>
            <h2 className="lead" style={{ marginTop: 18 }}>
              Let&apos;s
              <br />
              build.
            </h2>
            <a className="contact-mail" href="mailto:sajidhwork@gmail.com">
              sajidhwork@gmail.com <span aria-hidden="true">↗</span>
            </a>
            <p className="contact-note">
              Tell me about the role or project — I read every message and reply
              soon.
            </p>
          </div>

          <div className="contact-right r">
            <form className="cform" onSubmit={onSubmit} noValidate>
              <div className="field-row">
                <div className={`field${errors.name ? " invalid" : ""}`}>
                  <label htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    ref={refs.name}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={errors.name ? true : undefined}
                  />
                  <span className="field-err">{errors.name}</span>
                </div>
                <div className={`field${errors.email ? " invalid" : ""}`}>
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    ref={refs.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={errors.email ? true : undefined}
                  />
                  <span className="field-err">{errors.email}</span>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="cf-company">
                    Company <span className="opt">(optional)</span>
                  </label>
                  <input
                    id="cf-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => update("company", e.target.value)}
                  />
                </div>
                <div className={`field${errors.subject ? " invalid" : ""}`}>
                  <label htmlFor="cf-subject">Subject</label>
                  <input
                    id="cf-subject"
                    ref={refs.subject}
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    aria-invalid={errors.subject ? true : undefined}
                  />
                  <span className="field-err">{errors.subject}</span>
                </div>
              </div>

              <div className={`field${errors.message ? " invalid" : ""}`}>
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  ref={refs.message}
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                />
                <span className="field-err">{errors.message}</span>
              </div>

              {/* honeypot — hidden from users, catches bots */}
              <input
                className="hp"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={values._gotcha}
                onChange={(e) => update("_gotcha", e.target.value)}
              />

              <div className="cform-foot">
                <button
                  type="submit"
                  className="cform-submit"
                  disabled={status.type === "sending"}
                >
                  {status.type === "sending" ? "Sending…" : "Send message"}{" "}
                  <span className="arr" aria-hidden="true">↗</span>
                </button>
                <p className={statusClass} role="status" aria-live="polite">
                  {status.type === "ok" && status.text}
                  {status.type === "err" && (
                    <>
                      Couldn&rsquo;t send right now — email me at{" "}
                      <a href="mailto:sajidhwork@gmail.com">
                        sajidhwork@gmail.com
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-row">
          <div className="footer-links">
            <a href="https://github.com/Sajidsaz" target="_blank" rel="noopener">
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/sajidh-ahamed-ba14aa267"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a href="tel:+94704490444">+94 70 449 0444</a>
          </div>
          <div className="colophon">
            Sajidh Ahamed ·
            {year} 
          </div>
        </div>
      </div>
    </section>
  );
}
