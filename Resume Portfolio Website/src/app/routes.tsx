import { createBrowserRouter, Outlet, NavLink } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Github,
  ArrowUpRight,
  Download,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  MapPin,
  Calendar,
} from "lucide-react";

// ─── Motion helpers ───────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/96 backdrop-blur-sm border-b border-border"
          : ""
      }`}
    >
      <nav className="max-w-screen-xl mx-auto px-8 lg:px-16 h-[4.5rem] flex items-center justify-between">
        <NavLink
          to="/"
          className="font-['Instrument_Serif'] font-normal text-[1.05rem] text-foreground hover:text-primary transition-colors duration-300"
        >
          Alex Chen
        </NavLink>
        <div className="flex items-center gap-8 sm:gap-10">
          {[
            { to: "/resume", label: "Résumé" },
            { to: "/projects", label: "Projects" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-['Geist'] text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="mailto:alex@alexchen.dev"
            className="font-['Geist'] text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 hidden sm:block"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-28">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="font-['Geist'] text-xs text-muted-foreground tracking-wide font-light">
          © 2025 Alex Chen
        </p>
        <div className="flex items-center gap-6">
          {[
            { href: "https://github.com", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
            { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
            { href: "mailto:alex@alexchen.dev", icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Icon size={14} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function Root() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <main>
      {/* Hero — full viewport split */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_44%]">
        {/* Text */}
        <div className="flex flex-col justify-end px-8 lg:px-16 pb-16 lg:pb-24 pt-32 lg:pt-0">
          <Reveal delay={0.1}>
            <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-primary mb-10">
              Senior Engineer · San Francisco
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mb-10">
              <h1
                className="font-['Instrument_Serif'] font-normal leading-[1.1] text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
              >
                Hi, I&apos;m Nicki.
              </h1>
              <p
                className="font-['Geist'] font-light text-foreground leading-[1.65] mt-4"
                style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
              >
                I lead technology and product initiatives
                <br className="hidden lg:block" /> that help organizations solve real-world problems.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="h-px bg-border w-full mb-9" />
          </Reveal>

          <Reveal delay={0.45}>
            <p className="font-['Geist'] font-light text-[0.95rem] text-muted-foreground leading-[1.85] max-w-[26rem] mb-11">
              Seven years across Vercel, Stripe, and Airbnb — finding
              the quiet clarity in complex systems.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="flex items-center gap-8">
              <NavLink
                to="/projects"
                className="font-['Geist'] text-sm text-foreground border-b border-foreground pb-px hover:border-primary hover:text-primary transition-colors duration-300 flex items-center gap-1.5"
              >
                View work <ArrowUpRight size={12} strokeWidth={1.5} />
              </NavLink>
              <NavLink
                to="/resume"
                className="font-['Geist'] text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Résumé
              </NavLink>
            </div>
          </Reveal>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative bg-muted overflow-hidden"
          style={{ minHeight: "60vh" }}
        >
          <img
            src="https://images.unsplash.com/photo-1772442164006-ba1b8e7bfc32?w=960&h=1200&fit=crop&auto=format"
            alt="Working in warm natural light"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/8 mix-blend-multiply" />
        </motion.div>
      </section>

      {/* Pull quote */}
      <section className="py-28 lg:py-40 px-8 lg:px-16 max-w-screen-xl mx-auto">
        <Reveal>
          <div className="max-w-[38rem] mx-auto text-center">
            <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-8">
              About
            </p>
            <p
              className="font-['Instrument_Serif'] font-normal text-foreground leading-[1.45]"
              style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.75rem)" }}
            >
              "The best technology disappears into experience. Not invisible —
              inevitable."
            </p>
            <div className="h-px bg-border w-12 mx-auto mt-10 mb-10" />
            <p className="font-['Geist'] font-light text-sm text-muted-foreground leading-[1.9]">
              I work across infrastructure, developer tooling, and consumer
              products. A range I think of not as scattered, but complete — each
              layer informing the others. Currently open to senior and staff
              engineering roles.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Disciplines */}
      <div className="border-t border-b border-border">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {[
              { title: "Infrastructure", sub: "Edge, distributed systems" },
              { title: "Frontend", sub: "React, design systems" },
              { title: "Tooling", sub: "DX, CLIs, compilers" },
              { title: "Open source", sub: "2.3k+ GitHub stars" },
            ].map(({ title, sub }) => (
              <div key={title} className="px-6 py-9 lg:px-10 lg:py-11">
                <p className="font-['Instrument_Serif'] font-normal text-[1.05rem] text-foreground mb-1.5">
                  {title}
                </p>
                <p className="font-['Geist'] text-xs font-light text-muted-foreground">
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected work */}
      <section className="py-28 lg:py-40 px-8 lg:px-16 max-w-screen-xl mx-auto">
        <Reveal>
          <div className="flex items-baseline justify-between mb-16">
            <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
              Selected Work
            </p>
            <NavLink
              to="/projects"
              className="font-['Geist'] text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              All projects <ArrowUpRight size={11} strokeWidth={1.5} />
            </NavLink>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10">
          {/* Large card */}
          <Reveal delay={0.1}>
            <a href="https://github.com" className="block group">
              <div
                className="overflow-hidden bg-muted mb-5"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1768471126011-2e2002832826?w=900&h=680&fit=crop&auto=format"
                  alt="Driftmark — collaborative editor"
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['Instrument_Serif'] font-normal text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    Driftmark
                  </p>
                  <p className="font-['Geist'] text-xs font-light text-muted-foreground mt-1">
                    Real-time collaborative editor · 2.3k stars
                  </p>
                </div>
                <ExternalLink
                  size={13}
                  strokeWidth={1.5}
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-300 mt-1 flex-shrink-0"
                />
              </div>
            </a>
          </Reveal>

          {/* Two stacked */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {[
              {
                name: "flux-db",
                desc: "Embedded key-value store in Rust + WASM",
                img: "https://images.unsplash.com/photo-1558801417-308cab5d5af9?w=800&h=480&fit=crop&auto=format",
                alt: "flux-db project",
              },
              {
                name: "Argus",
                desc: "Infrastructure monitoring with ML anomaly detection",
                img: "https://images.unsplash.com/photo-1624918959325-4ab1f51306d1?w=800&h=480&fit=crop&auto=format",
                alt: "Argus monitoring project",
              },
            ].map(({ name, desc, img, alt }, i) => (
              <Reveal key={name} delay={0.15 + i * 0.1}>
                <a href="https://github.com" className="block group">
                  <div
                    className="overflow-hidden bg-muted mb-4"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={img}
                      alt={alt}
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-['Instrument_Serif'] font-normal text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                        {name}
                      </p>
                      <p className="font-['Geist'] text-xs font-light text-muted-foreground mt-0.5">
                        {desc}
                      </p>
                    </div>
                    <ExternalLink
                      size={13}
                      strokeWidth={1.5}
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-300 mt-1 flex-shrink-0"
                    />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────

const experience = [
  {
    company: "Vercel",
    role: "Senior Software Engineer",
    period: "Jan 2022 — Present",
    location: "San Francisco, CA",
    bullets: [
      "Led infrastructure redesign for the edge deployment pipeline, reducing cold start times by 40% across 150+ regions worldwide.",
      "Architected real-time collaboration features — presence, cursors, shared state — now serving 200,000+ daily active users.",
      "Shipped preview deployment environments, the third most-requested product feature of 2023.",
      "Mentored four junior engineers; ran weekly internal TypeScript workshops.",
    ],
  },
  {
    company: "Stripe",
    role: "Software Engineer",
    period: "Jun 2020 — Dec 2021",
    location: "San Francisco, CA",
    bullets: [
      "Worked on the core payments API processing over $1B in daily transactions, maintaining a 99.999% uptime SLA.",
      "Led migration of legacy PHP billing service to Go microservices, reducing p99 latency by 60%.",
      "Built an internal fraud detection pipeline combining heuristic scoring with ML model inference.",
      "Co-authored Stripe's zero-downtime deployment runbook, adopted across 12 teams.",
    ],
  },
  {
    company: "Airbnb",
    role: "Software Engineer",
    period: "Aug 2019 — May 2020",
    location: "San Francisco, CA",
    bullets: [
      "Improved search ranking and relevance algorithms, contributing to an 8% lift in booking conversion.",
      "Rewrote the geospatial indexing layer in Rust, cutting memory usage by 35% under peak traffic.",
      "Integrated real-time pricing signals from third-party data providers into the search ranking model.",
    ],
  },
];

const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "Go", "Rust", "Python", "SQL"],
  Frontend: ["React", "Next.js", "Svelte", "Tailwind CSS"],
  Backend: ["Node.js", "PostgreSQL", "Redis", "Kafka", "GraphQL"],
  Infrastructure: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
};

function Resume() {
  return (
    <main className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-32 pb-20">

      {/* Header */}
      <Reveal>
        <div className="mb-14 pb-10 border-b border-border">
          <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-5">
            Résumé
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1
                className="font-['Instrument_Serif'] font-normal text-foreground leading-[1.1]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
              >
                Nicki
              </h1>
              <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-3 flex items-center gap-2">
                <MapPin size={12} strokeWidth={1.5} />
                Technology &amp; Product Leader · San Francisco, CA
              </p>
            </div>
            <div className="flex items-center gap-6 self-start sm:self-auto">
              {[
                { href: "https://github.com", icon: Github },
                { href: "https://linkedin.com", icon: Linkedin },
                { href: "mailto:alex@alexchen.dev", icon: Mail },
              ].map(({ href, icon: Icon }) => (
                <a key={href} href={href} className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
              <a
                href="#"
                className="inline-flex items-center gap-2 font-['Geist'] text-xs tracking-[0.12em] uppercase text-muted-foreground border-b border-border pb-px hover:text-foreground hover:border-foreground transition-colors duration-300 ml-2"
              >
                <Download size={12} strokeWidth={1.5} /> PDF
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_15rem] gap-16 lg:gap-20">

        {/* Experience */}
        <div>
          <Reveal>
            <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-10">
              Experience
            </p>
          </Reveal>
          <div className="space-y-12">
            {experience.map(({ company, role, period, location, bullets }, i) => (
              <Reveal key={company} delay={i * 0.05}>
                <div className="border-t border-border pt-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div>
                      <p className="font-['Instrument_Serif'] font-normal text-xl text-foreground leading-tight">
                        {company}
                      </p>
                      <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-0.5">
                        {role}
                      </p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <p className="font-['Geist'] font-light text-xs text-muted-foreground">{period}</p>
                      <p className="font-['Geist'] font-light text-xs text-muted-foreground mt-0.5">{location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mt-4">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-primary mt-[0.4rem] flex-shrink-0 text-[0.4rem]">●</span>
                        <p className="font-['Geist'] font-light text-sm text-muted-foreground leading-[1.85]">{b}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10 lg:pt-9">

          {/* Skills */}
          <Reveal delay={0.1}>
            <div>
              <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                Skills
              </p>
              <div className="space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p className="font-['Instrument_Serif'] font-normal text-xs text-foreground mb-1">
                      {category}
                    </p>
                    <p className="font-['Geist'] font-light text-xs text-muted-foreground leading-[1.7]">
                      {items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="h-px bg-border" />

          {/* Education */}
          <Reveal delay={0.12}>
            <div>
              <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                Education
              </p>
              <p className="font-['Instrument_Serif'] font-normal text-base text-foreground">
                UC Berkeley
              </p>
              <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-0.5">
                B.S. Computer Science
              </p>
              <p className="font-['Geist'] font-light text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Calendar size={11} strokeWidth={1.5} /> Class of 2019 · 3.9 GPA
              </p>
            </div>
          </Reveal>

          <div className="h-px bg-border" />

          {/* Contact */}
          <Reveal delay={0.14}>
            <div>
              <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                Contact
              </p>
              <div className="space-y-3">
                {[
                  { label: "Email", value: "nicki@nickidev.com", href: "mailto:nicki@nickidev.com" },
                  { label: "GitHub", value: "github.com/nicki", href: "https://github.com" },
                  { label: "LinkedIn", value: "/in/nicki", href: "https://linkedin.com" },
                ].map(({ label, value, href }) => (
                  <div key={label} className="flex justify-between items-baseline gap-4">
                    <span className="font-['Geist'] text-xs font-light text-muted-foreground flex-shrink-0">
                      {label}
                    </span>
                    <a
                      href={href}
                      className="font-['Geist'] text-xs text-foreground hover:text-primary transition-colors duration-300 text-right"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </main>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────


const projects = [
  {
    name: "Driftmark",
    desc: "Open-source real-time collaborative markdown editor with CRDT-based conflict resolution.",
    tags: ["TypeScript", "WebSockets", "React"],
    stars: "2.3k",
    year: "2024",
    img: "https://images.unsplash.com/photo-1768471126011-2e2002832826?w=900&h=620&fit=crop&auto=format",
    featured: true,
  },
  {
    name: "flux-db",
    desc: "Lightweight embedded key-value store in Rust with WebAssembly bindings for browser use.",
    tags: ["Rust", "WebAssembly"],
    stars: "1.1k",
    year: "2023",
    img: "https://images.unsplash.com/photo-1558801417-308cab5d5af9?w=900&h=620&fit=crop&auto=format",
    featured: true,
  },
  {
    name: "Argus",
    desc: "Self-hosted infrastructure monitoring with ML anomaly detection and Prometheus integration.",
    tags: ["Go", "React", "ML"],
    stars: "890",
    year: "2023",
    img: "https://images.unsplash.com/photo-1624918959325-4ab1f51306d1?w=900&h=620&fit=crop&auto=format",
    featured: false,
  },
  {
    name: "Inkframe",
    desc: "CLI tool generating typed TypeScript design tokens directly from Figma token files.",
    tags: ["TypeScript", "CLI", "Figma API"],
    stars: "412",
    year: "2022",
    img: "https://images.unsplash.com/photo-1558801417-308cab5d5af9?w=900&h=620&fit=crop&crop=right&auto=format",
    featured: false,
  },
  {
    name: "Harbinger",
    desc: "Distributed job queue with at-least-once delivery guarantees and Redis-backed persistence.",
    tags: ["Go", "Redis"],
    stars: "327",
    year: "2022",
    img: "https://images.unsplash.com/photo-1624918959325-4ab1f51306d1?w=900&h=620&fit=crop&crop=top&auto=format",
    featured: false,
  },
  {
    name: "cloudcast",
    desc: "Hyperlocal weather PWA with offline support, service workers, and push notifications.",
    tags: ["TypeScript", "PWA"],
    stars: "208",
    year: "2021",
    img: "https://images.unsplash.com/photo-1772442164006-ba1b8e7bfc32?w=900&h=620&fit=crop&crop=right&auto=format",
    featured: false,
  },
];

type Filter = "All" | "TypeScript" | "Go" | "Rust" | "React";
const filters: Filter[] = ["All", "TypeScript", "Go", "Rust", "React"];

function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.some((t) => t === active));

  return (
    <main className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-32 pb-16">
      {/* Header */}
      <Reveal>
        <div className="border-b border-border pb-12 mb-14">
          <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Work
          </p>
          <h1
            className="font-['Instrument_Serif'] font-normal text-foreground leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            projects
          </h1>
          <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-4 max-w-md leading-[1.8]">
            Open source work, experiments, and side projects. All source on
            GitHub.
          </p>
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.05}>
        <div className="flex items-center gap-6 mb-14 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`font-['Geist'] text-[0.65rem] tracking-[0.18em] uppercase transition-colors duration-300 pb-px ${
                active === f
                  ? "text-foreground border-b border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid — editorial alternating layout */}
      <div className="space-y-6">
        {/* First row: one large + one medium */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr] gap-6">
          {filtered.slice(0, 2).map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <ProjectCard {...p} tall={i === 0} />
            </Reveal>
          ))}
        </div>
        {/* Remaining rows: three equal */}
        {filtered.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(2).map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <ProjectCard {...p} />
              </Reveal>
            ))}
          </div>
        )}
        {filtered.length === 0 && (
          <p className="font-['Geist'] font-light text-sm text-muted-foreground py-20 text-center">
            No projects match this filter.
          </p>
        )}
      </div>
    </main>
  );
}

function ProjectCard({
  name,
  desc,
  tags,
  stars,
  year,
  img,
  alt,
  featured,
  tall = false,
}: {
  name: string;
  desc: string;
  tags: string[];
  stars: string;
  year: string;
  img: string;
  alt?: string;
  featured?: boolean;
  tall?: boolean;
}) {
  return (
    <a href="https://github.com" className="block group">
      <div
        className="overflow-hidden bg-muted mb-5"
        style={{ aspectRatio: tall ? "5/4" : "16/9" }}
      >
        <img
          src={img}
          alt={alt || name}
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-1">
            {featured && (
              <span className="font-['Geist'] text-[0.55rem] tracking-[0.2em] uppercase text-primary">
                Featured
              </span>
            )}
            <p className="font-['Instrument_Serif'] font-normal text-lg text-foreground group-hover:text-primary transition-colors duration-300">
              {name}
            </p>
          </div>
          <p className="font-['Geist'] font-light text-xs text-muted-foreground leading-[1.75]">
            {desc}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Github size={11} strokeWidth={1.5} />
              <span className="font-['Geist'] font-light text-xs">{stars}</span>
            </div>
            <span className="text-border">·</span>
            <span className="font-['Geist'] font-light text-xs text-muted-foreground">
              {tags.join(", ")}
            </span>
          </div>
        </div>
        <ExternalLink
          size={13}
          strokeWidth={1.5}
          className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 mt-1"
        />
      </div>
    </a>
  );
}

// ─── 404 ─────────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <p
        className="font-['Instrument_Serif'] font-normal text-muted leading-none select-none"
        style={{ fontSize: "clamp(6rem, 20vw, 14rem)" }}
      >
        404
      </p>
      <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-4 mb-10">
        This page doesn&apos;t exist.
      </p>
      <NavLink
        to="/"
        className="font-['Geist'] text-xs tracking-[0.15em] uppercase text-muted-foreground border-b border-muted-foreground pb-px hover:text-foreground hover:border-foreground transition-colors duration-300"
      >
        Go home
      </NavLink>
    </main>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "resume", Component: Resume },
      { path: "projects", Component: Projects },
      { path: "*", Component: NotFound },
    ],
  },
]);
