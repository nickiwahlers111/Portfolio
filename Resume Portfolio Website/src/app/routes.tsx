import {
  createBrowserRouter,
  Outlet,
  NavLink,
  useParams,
  Link,
} from "react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Download,
  Mail,
  Linkedin,
  MapPin,
  Calendar,
  ArrowLeft,
  ArrowRight,
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
          Nicki Wahlers
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
            href="mailto:nicki.wahlers@gmail.com"
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
          © 2026 Nicki Wahlers
        </p>
        <div className="flex items-center gap-6">
          {[
            {
              href: "https://www.linkedin.com/in/nicki-wahlers/",
              icon: Linkedin,
              label: "LinkedIn",
            },
            {
              href: "mailto:nicki.wahlers@gmail.com",
              icon: Mail,
              label: "Email",
            },
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
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_44%]">
        <div className="flex flex-col justify-end px-8 lg:px-16 pb-16 lg:pb-24 pt-32 lg:pt-0">
          <Reveal delay={0.1}>
            <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-primary mb-10">
              Director of Technology · Portland, OR
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
                I guide products from concept to launch
                <br className="hidden lg:block" /> by aligning people and
                strategy with technology.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="h-px bg-border w-full mb-9" />
          </Reveal>
          <Reveal delay={0.45}>
            <p className="font-['Geist'] font-light text-[0.95rem] text-muted-foreground leading-[1.85] max-w-[26rem] mb-11">
              Driven by curiosity and collaboration, I enjoy bringing together
              users and technical teams to create products that make a
              difference.
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
                Resume
              </NavLink>
            </div>
          </Reveal>
        </div>

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
              "My favorite part of technology has never been the
              technology—it&apos;s what people can accomplish because of it."
            </p>
            <div className="h-px bg-border w-12 mx-auto mt-10 mb-10" />
            <p className="font-['Geist'] font-light text-sm text-muted-foreground leading-[1.9]">
              I work at the intersection of technology, people, and
              mission-driven organizations. Whether I&apos;m defining a product
              roadmap, translating policy into technical requirements, or
              guiding a team through a complex launch — I care deeply about the
              people on the other side of the screen.
            </p>
          </div>
        </Reveal>
      </section>

      <div className="border-t border-b border-border">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {[
              { title: "Product Leadership", sub: "Vision, roadmap, delivery" },
              {
                title: "Technical Strategy",
                sub: "Systems, data, infrastructure",
              },
              {
                title: "Stakeholder Alignment",
                sub: "Cross-functional collaboration",
              },
              {
                title: "Impact at Scale",
                sub: "26K+ users, 104K interactions",
              },
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

        <div className="space-y-0">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <Link
                to={`/projects/${p.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 border-t border-border hover:bg-muted/30 transition-colors duration-300 px-2 -mx-2"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-['Geist'] text-[0.6rem] text-muted-foreground w-5 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-['Instrument_Serif'] font-normal text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {p.title}
                    </p>
                    <p className="font-['Geist'] font-light text-xs text-muted-foreground mt-0.5">
                      {p.tagline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0 pl-10 sm:pl-0">
                  <span className="font-['Geist'] text-xs text-muted-foreground">
                    {p.role}
                  </span>
                  <span className="font-['Geist'] text-xs text-muted-foreground">
                    {p.timeline}
                  </span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>
    </main>
  );
}

// ─── Resume ───────────────────────────────────────────────────────────────────

const experience = [
  {
    company: "Crime Stoppers of Houston",
    role: "Director of Technology",
    period: "Apr 2026 — Present",
    location: "Houston, TX",
    bullets: [
      "Set technical strategy and organizational vision for multi-program initiatives, aligning technical priorities with organizational goals and leading cross-functional teams to deliver scalable systems and digital products that strengthen data infrastructure and platform capabilities.",
      "Directed technology operations across multiple organizational programs, balancing stakeholder priorities, defining KPIs, managing delivery timelines, and driving continuous process improvements.",
    ],
  },
  {
    company: "",
    role: "Technical Program Manager - All Programs",
    period: "Nov 2025 – Apr 2026",
    location: "Houston, TX",
    bullets: [
      "Led technology initiatives across 8+ product lines, defining roadmaps, prioritizing delivery, and implementing scalable systems that supported a 15x increase in organizational capacity and user demand.",
      "Owned end-to-end program execution including requirements gathering, roadmap planning, prioritization, and bi-monthly release cycles across multiple concurrent initiatives.",
      "Directed development and launch of a student-centered digital platform, achieving 10x projected engagement and driving 26K users and 104K interactions in the first month.",
      "Translated legislative and policy requirements into technical deliverables, enabling data-driven decision-making for Texas state leadership during the 2025 legislative session.",
    ],
  },
  {
    company: "",
    role: "Technical Program Manager - The Glenda Gordy Research Center",
    period: "Feb 2025 - Nov 2025",
    location: "Houston, TX",
    bullets: [
      "Owned technical strategy and end-to-end program execution of the Glenda Gordy Research Center, building scalable data infrastructure and products that expanded access to public safety data.",
      "Facilitated Agile sprint planning, backlog refinement and prioritization with engineering and non-technical teams to align product delivery with organizational goals.",
    ],
  },
  {
    company: "",
    role: "Data Analyst - The Glenda Gordy Research Center",
    period: "June 2024 - Feb 2025",
    location: "Houston, TX",
    bullets: [
      "Designed and delivered interactive dashboards and data products, translating complex datasets into scalable reporting solutions that informed community stakeholders and legislative decisions.",
    ],
  },
  {
    company: "Airship",
    role: "Data Engineering Intern",
    period: "Jan 2022 - Jun 2022",
    location: "Portland, OR",
    bullets: [],
  },
  {
    company: "Nike",
    role: "Data Project Manager",
    period: "Mar 2020 - May 2022",
    location: "Beaverton, OR",
    bullets: [],
  },
  {
    company: "Act-On Software",
    role: "Software Engineering Intern",
    period: "Jun 2021 - Dec 2021",
    location: "Portland, OR",
    bullets: [],
  },
];

const skills: Record<string, string[]> = {
  "Program and Project Management": [
    "Project Management",
    "Software Development Lifecycle",
    "Workplan Management",
    "Budget Management",
    "Agile & Waterfall Methodologies",
    "Technical Roadmap Design",
    "Product Roadmapping",
    "Product Lifecycle Management",
    "Requirements Gathering",
    "Stakeholder Engagement",
    "Cross-Functional Collaboration",
    "Build & Release Coordination",
    "Risk Mitigation",
    "Cross-Functional Leadership",
  ],
  "Systems, Data & Engineering": [
    "Data Infrastructure",
    "Data Products",
    "SQL",
    "Data Analysis & Reporting",
    "KPI Development",
    "Data Visualization",
    "System Reliability",
    "CI/CD",
    "Build Pipelines",
    "Testing & Validation",
    "Version Control (Git)",
  ],
  "Tools and Platforms": [
    "Jira",
    "Asana",
    "Git",
    "AWS",
    "Tableau",
    "Google Analytics",
    "Excel",
    "Smartsheet",
    "Figma",
    "Microsoft Office Suite",
  ],
};

function Resume() {
  return (
    <main className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-32 pb-20">
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
                Nicki Wahlers
              </h1>
              <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-3 flex items-center gap-2">
                <MapPin size={12} strokeWidth={1.5} />
                Technology &amp; Product Leader · Portland, OR
              </p>
            </div>
            <div className="flex items-center gap-6 self-start sm:self-auto">
              {[
                {
                  href: "https://linkedin.com/in/nicki-wahlers/",
                  icon: Linkedin,
                },
                { href: "mailto:nicki.wahlers@gmail.com", icon: Mail },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
              <a
                href="/Nicki_Wahlers_Resume.pdf"
                download="Nicki_Wahlers_Resume.pdf"
                className="inline-flex items-center gap-2 font-['Geist'] text-xs tracking-[0.12em] uppercase text-muted-foreground border-b border-border pb-px hover:text-foreground hover:border-foreground transition-colors duration-300 ml-2"
              >
                <Download size={12} strokeWidth={1.5} /> PDF
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_15rem] gap-16 lg:gap-20">
        <div>
          <Reveal>
            <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-10">
              Experience
            </p>
          </Reveal>
          <div className="space-y-12">
            {experience.map(
              ({ company, role, period, location, bullets }, i) => (
                <Reveal key={`${company}-${role}`} delay={i * 0.04}>
                  <div className="border-t border-border pt-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                      <div>
                        {company && (
                          <p className="font-['Instrument_Serif'] font-normal text-xl text-foreground leading-tight">
                            {company}
                          </p>
                        )}
                        <p
                          className={`font-['Geist'] font-light text-sm text-muted-foreground ${
                            company ? "mt-0.5" : ""
                          }`}
                        >
                          {role}
                        </p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <p className="font-['Geist'] font-light text-xs text-muted-foreground">
                          {period}
                        </p>
                        <p className="font-['Geist'] font-light text-xs text-muted-foreground mt-0.5">
                          {location}
                        </p>
                      </div>
                    </div>
                    {bullets.length > 0 && (
                      <ul className="space-y-2.5 mt-4">
                        {bullets.map((b, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="text-primary mt-[0.4rem] flex-shrink-0 text-[0.4rem]">
                              ●
                            </span>
                            <p className="font-['Geist'] font-light text-sm text-muted-foreground leading-[1.85]">
                              {b}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              )
            )}
          </div>
        </div>

        <div className="space-y-10 lg:pt-9">
          <Reveal delay={0.12}>
            <div>
              <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                Education
              </p>
              <p className="font-['Instrument_Serif'] font-normal text-base text-foreground">
                Portland State University
              </p>
              <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-0.5">
                M.S. Computer Science
              </p>
              <p className="font-['Geist'] font-light text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Calendar size={11} strokeWidth={1.5} /> Class of 2023
              </p>
              <div className="mt-5">
                <p className="font-['Instrument_Serif'] font-normal text-base text-foreground">
                  Gonzaga University
                </p>
                <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-0.5">
                  B.A. Mathematics and International Studies
                </p>
                <p className="font-['Geist'] font-light text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Calendar size={11} strokeWidth={1.5} /> Class of 2019
                </p>
              </div>
            </div>
          </Reveal>

          <div className="h-px bg-border" />

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

          <Reveal delay={0.14}>
            <div>
              <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                Contact
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: "Email",
                    value: "nicki.wahlers@gmail.com",
                    href: "mailto:nicki.wahlers@gmail.com",
                  },
                  {
                    label: "LinkedIn",
                    value: "/in/nicki-wahlers",
                    href: "https://linkedin.com/in/nicki-wahlers/",
                  },
                ].map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="flex justify-between items-baseline gap-4"
                  >
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

// ─── Project data ─────────────────────────────────────────────────────────────

type Outcome = { value: string; label: string };

type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  timeline: string;
  team: string;
  users: string;
  heroImg: string;
  problem: string;
  myRole: string[];
  goals: string[];
  discovery: string;
  constraints: string[];
  process: string[];
  decisions: string;
  challenges: string;
  outcomes: Outcome[];
  learned: string;
};

const projects: Project[] = [
  {
    slug: "safe-connect-texas",
    title: "SafeConnect Texas",
    tagline:
      "A centralized digital platform connecting victims with trusted resources across Texas.",
    role: "Director of Technology",
    timeline: "2025",
    team: "1 Designer · 2 Engineers · Product Lead",
    users: "Victims, service providers, advocates",
    heroImg:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=700&fit=crop&auto=format",
    problem:
      "Victims of crime in Texas often had to search across dozens of disconnected organizations to find support — shelters, legal aid, counseling, financial assistance — each on separate websites with inconsistent information. This created unnecessary friction during already traumatic situations, and many people simply gave up. Service providers had no unified way to refer clients, and advocates lacked visibility into what resources were actually available in each region.",
    myRole: [
      "Defined product vision and aligned stakeholders across legal, social services, and technology teams",
      "Prioritized the roadmap based on survivor feedback and legislative requirements",
      "Led discovery sessions with service providers, survivors, and advocates across Texas",
      "Facilitated sprint planning and managed bi-monthly release cycles",
      "Translated policy mandates from the Governor's Task Force into technical requirements",
      "Defined success metrics and owned reporting to organizational leadership",
      "Coordinated launch across 12 regional partners",
      "Presented platform outcomes to Texas state leadership",
    ],
    goals: [
      "Reduce average time to find relevant resources from hours to minutes",
      "Support mobile-first users with low-bandwidth connections",
      "Centralize data from 200+ service organizations statewide",
      "Meet WCAG 2.1 AA accessibility standards",
      "Enable service providers to self-manage their listings",
    ],
    discovery:
      "We conducted interviews with 24 survivors, 18 service providers, and 6 legislative staffers over six weeks. The most surprising finding: most survivors were discovering resources through word of mouth, not search. Many didn't trust government websites. Several providers were still faxing intake forms. We also uncovered a significant gap in Spanish-language resources — an issue no existing platform had addressed at scale.",
    constraints: [
      "Legislative deadline tied to the 2025 Texas session",
      "No existing centralized database — we were building the data layer from scratch",
      "Small engineering team of two, working across multiple initiatives simultaneously",
      "Strict accessibility requirements from the Governor's Task Force",
      "Grant funding with quarterly reporting obligations",
      "Compliance with state data privacy requirements for sensitive victim information",
      "SafeText SMS integration delays from the vendor pushed our timeline by three weeks",
    ],
    process: [
      "Discovery",
      "User Flows",
      "Prioritization",
      "Wireframes",
      "Development",
      "Testing",
      "Launch",
    ],
    decisions:
      "Rather than build user accounts immediately — which would have added weeks of development and raised privacy concerns for survivors — we focused first on anonymous, frictionless resource discovery. This allowed us to validate the core search experience with real users before introducing any complexity. The decision was controversial internally, but survivor feedback confirmed it was right: the last thing someone in crisis needs is a sign-up form.",
    challenges:
      'The vendor managing the SafeText SMS integration missed their delivery date by three weeks, which rippled into our launch timeline. We had already committed the date to the Governor\'s Task Force. Rather than delay the launch, we shipped without SMS and communicated transparently with stakeholders — then shipped SMS in the following sprint. Stakeholder alignment was also challenging: legal, social services, and technology teams had fundamentally different definitions of what "launch" meant, which required a joint planning session to resolve early in the project.',
    outcomes: [
      { value: "26,000", label: "Users in month one" },
      { value: "104,000", label: "Interactions" },
      { value: "200+", label: "Organizations listed" },
      { value: "10×", label: "Projected engagement" },
    ],
    learned:
      "Building with and for survivors taught me that simplicity is not a design preference — it is an ethical obligation. Every unnecessary step, every confusing label, every broken link has a real cost for real people. I also learned that constraints, when named honestly and early, become creative catalysts rather than blockers. This project changed how I think about what technology is actually for.",
  },
  {
    slug: "student-safety-platform",
    title: "Student Safety Platform",
    tagline:
      "A student-centered digital platform delivering safety education to 90,000 students across Texas.",
    role: "Technical Program Manager",
    timeline: "2025",
    team: "1 Designer · 3 Engineers · Curriculum Partner",
    users: "Students, educators, school administrators",
    heroImg:
      "https://images.unsplash.com/photo-1624918959325-4ab1f51306d1?w=1400&h=700&fit=crop&auto=format",
    problem:
      "Texas schools lacked consistent, accessible safety education resources. Existing materials were siloed by district, difficult to navigate, and not designed with students in mind. There was no unified platform — teachers were piecing together content from unrelated sources, and students had no way to access information independently or anonymously.",
    myRole: [
      "Owned end-to-end product execution from discovery through launch",
      "Managed relationship with curriculum partner and content review cycles",
      "Defined technical architecture requirements for scale and compliance",
      "Coordinated rollout across 150+ school districts",
      "Established engagement KPIs and reported to organizational leadership",
      "Led retrospectives and incorporated educator feedback into subsequent releases",
    ],
    goals: [
      "Reach 90,000+ students in the first year",
      "Provide anonymous access for sensitive topics",
      "Support educators with downloadable classroom materials",
      "Ensure compliance with Texas student data privacy law (FERPA, SOPPA)",
      "Build on reusable infrastructure from the broader platform",
    ],
    discovery:
      "We surveyed 400 students and ran focus groups with teachers across three districts. The clearest signal: students wanted to access information without any record of having done so. That insight shaped our entire approach to anonymity — we designed for zero-login access as the default, not an edge case.",
    constraints: [
      "Texas student data privacy law (FERPA, SOPPA)",
      "Tight launch deadline aligned to school year calendar",
      "Content had to pass legal review from three separate teams",
      "Accessibility requirements for students with disabilities",
      "Limited device diversity — many students only had school-issued Chromebooks",
    ],
    process: [
      "Discovery",
      "Content Strategy",
      "Architecture",
      "Design",
      "Development",
      "Pilot",
      "Statewide Launch",
    ],
    decisions:
      "We chose to build on the existing SafeConnect infrastructure rather than a standalone system. This introduced some constraints on the content model, but cut development time by six weeks and gave us a proven, accessible foundation. The tradeoff was worth it.",
    challenges:
      "Content review cycles took twice as long as estimated, compressing the development and QA window. We managed this by running design and development in parallel with review — a riskier approach that required tight communication between teams but ultimately saved the timeline.",
    outcomes: [
      { value: "90,000", label: "Students reached" },
      { value: "10×", label: "Projected engagement" },
      { value: "150+", label: "School districts" },
      { value: "26,000", label: "Platform users" },
    ],
    learned:
      "Building with educators taught me the importance of validating assumptions early. Teachers have deeply practical constraints — 45-minute class periods, unreliable wifi, 30 students with 30 different devices. Designing for those constraints made the product meaningfully better.",
  },
  {
    slug: "legislative-data-dashboard",
    title: "Legislative Data Dashboard",
    tagline:
      "Real-time data infrastructure and dashboards informing Texas state leadership during the 2025 legislative session.",
    role: "Technical Program Manager",
    timeline: "2025",
    team: "2 Data Engineers · Policy Analyst · Communications Lead",
    users: "Texas legislators, policy staff, organizational leadership",
    heroImg:
      "https://images.unsplash.com/photo-1558801417-308cab5d5af9?w=1400&h=700&fit=crop&auto=format",
    problem:
      "During the Texas legislative session, decision-makers needed accurate, up-to-date public safety data — but existing reporting was manual, slow, and inconsistent. Analysts were spending 40% of their time pulling and cleaning data rather than analyzing it. Legislators were making decisions based on reports that were weeks out of date.",
    myRole: [
      "Defined the data infrastructure roadmap in collaboration with engineering",
      "Translated legislative reporting requirements into product specifications",
      "Managed stakeholder communication with policy staff and leadership",
      "Prioritized which dashboards to build first based on legislative calendar",
      "Oversaw QA process to ensure data accuracy before any presentation to legislators",
      "Presented dashboard outcomes directly to Texas state leadership",
    ],
    goals: [
      "Reduce manual data preparation time by 80%",
      "Deliver real-time dashboards to legislative staff within 6 weeks",
      "Establish reusable data infrastructure for future reporting cycles",
      "Support testimony preparation with reliable, citable data",
    ],
    discovery:
      "We spent two weeks shadowing analysts during their reporting workflow. We identified 14 manual steps that could be automated, and discovered that three teams were maintaining separate, conflicting versions of the same dataset. Consolidation alone cut two days of prep work per week.",
    constraints: [
      "Hard deadline tied to the legislative session calendar — immovable",
      "Sensitive data requiring strict access controls",
      "Existing database architecture that could not be replaced, only extended",
      "Non-technical stakeholders who needed the interface to be completely self-serve",
    ],
    process: [
      "Workflow Analysis",
      "Data Modeling",
      "Infrastructure",
      "Dashboard Design",
      "Validation",
      "Training",
      "Session Support",
    ],
    decisions:
      "We decided to build on the existing database rather than migrate to a modern data warehouse. This was a pragmatic choice — migration would have taken longer than the legislative session. Instead, we built a lightweight transformation layer that cleaned and standardized data at the reporting level, preserving the source system while dramatically improving output quality.",
    challenges:
      "Data quality was worse than anticipated. Several source datasets had years of inconsistent entry conventions. We had to build validation rules for every table, which ate into dashboard development time. We resolved this by bringing a policy analyst into the data review process — something we should have done from day one.",
    outcomes: [
      { value: "80%", label: "Reduction in manual prep time" },
      { value: "14", label: "Automated workflows" },
      { value: "6 weeks", label: "Delivery timeline" },
      { value: "3", label: "Legislative committees supported" },
    ],
    learned:
      "Data quality is a people problem as much as a technical one. The inconsistencies we found weren't the result of bad systems — they were the result of people working in silos without shared standards. The most valuable thing we built wasn't the dashboard. It was the shared vocabulary.",
  },
];

// ─── Projects listing ─────────────────────────────────────────────────────────

function Projects() {
  return (
    <main className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-32 pb-16">
      <Reveal>
        <div className="border-b border-border pb-12 mb-14">
          <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Work
          </p>
          <h1
            className="font-['Instrument_Serif'] font-normal text-foreground leading-[1.1]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Projects
          </h1>
          <p className="font-['Geist'] font-light text-sm text-muted-foreground mt-4 max-w-md leading-[1.8]">
            Selected case studies in technology leadership, product strategy,
            and mission-driven digital products.
          </p>
        </div>
      </Reveal>

      <div className="space-y-0">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link
              to={`/projects/${p.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 lg:gap-14 items-center py-12 border-t border-border"
            >
              {/* Image */}
              <div
                className="overflow-hidden bg-muted"
                style={{ aspectRatio: "16/10" }}
              >
                <img
                  src={p.heroImg}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-between h-full gap-6">
                <div>
                  <span className="font-['Geist'] text-[0.6rem] text-muted-foreground block mb-3">
                    0{i + 1}
                  </span>
                  <h2
                    className="font-['Instrument_Serif'] font-normal text-foreground group-hover:text-primary transition-colors duration-300 leading-[1.2] mb-4"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                  >
                    {p.title}
                  </h2>
                  <p className="font-['Geist'] font-light text-sm text-muted-foreground leading-[1.75] max-w-sm">
                    {p.tagline}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex gap-8">
                    <div>
                      <p className="font-['Geist'] text-[0.55rem] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                        Role
                      </p>
                      <p className="font-['Geist'] text-xs text-foreground">
                        {p.role}
                      </p>
                    </div>
                    <div>
                      <p className="font-['Geist'] text-[0.55rem] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                        Year
                      </p>
                      <p className="font-['Geist'] text-xs text-foreground">
                        {p.timeline}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0"
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
        <div className="border-t border-border" />
      </div>
    </main>
  );
}

// ─── Project detail (case study) ──────────────────────────────────────────────

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-['Geist'] text-muted-foreground">
          Project not found.
        </p>
      </main>
    );
  }

  return (
    <main>
      {/* Hero image */}
      <div
        className="w-full bg-muted overflow-hidden"
        style={{ height: "clamp(260px, 45vw, 560px)", marginTop: "4.5rem" }}
      >
        <img
          src={project.heroImg}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto px-8 lg:px-6 pb-24">
        {/* Back link */}
        <div className="pt-10 pb-12 border-b border-border">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-['Geist'] text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft size={12} strokeWidth={1.5} /> All Projects
          </Link>
        </div>

        {/* Title + metadata */}
        <Reveal>
          <div className="pt-12 pb-12 border-b border-border">
            <h1
              className="font-['Instrument_Serif'] font-normal text-foreground leading-[1.15] mb-5"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {project.title}
            </h1>
            <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.7] max-w-2xl mb-10">
              {project.tagline}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: "Role", value: project.role },
                { label: "Timeline", value: project.timeline },
                { label: "Team", value: project.team },
                { label: "Users", value: project.users },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-['Geist'] text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    {label}
                  </p>
                  <p className="font-['Geist'] font-light text-sm text-foreground leading-[1.5]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* The Problem */}
        <CaseSection label="The Problem" delay={0.05}>
          <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.85]">
            {project.problem}
          </p>
        </CaseSection>

        {/* My Role */}
        <CaseSection label="My Role" delay={0.05}>
          <ul className="space-y-3">
            {project.myRole.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-primary mt-[0.45rem] flex-shrink-0 text-[0.4rem]">
                  ●
                </span>
                <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.75]">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* Goals */}
        <CaseSection label="Goals" delay={0.05}>
          <ul className="space-y-3">
            {project.goals.map((g, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-primary mt-[0.45rem] flex-shrink-0 text-[0.4rem]">
                  ●
                </span>
                <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.75]">
                  {g}
                </p>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* Discovery */}
        <CaseSection label="Discovery" delay={0.05}>
          <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.85]">
            {project.discovery}
          </p>
        </CaseSection>

        {/* Constraints */}
        <CaseSection label="Constraints" delay={0.05}>
          <ul className="space-y-3">
            {project.constraints.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-primary mt-[0.45rem] flex-shrink-0 text-[0.4rem]">
                  ●
                </span>
                <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.75]">
                  {c}
                </p>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* Process */}
        <CaseSection label="Process" delay={0.05}>
          <div className="flex flex-wrap items-center gap-0">
            {project.process.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="font-['Geist'] text-xs text-foreground mt-2 whitespace-nowrap">
                    {step}
                  </p>
                </div>
                {i < project.process.length - 1 && (
                  <div className="w-8 sm:w-12 h-px bg-border mx-1 mb-5 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CaseSection>

        {/* Decisions */}
        <CaseSection label="Key Decision" delay={0.05}>
          <blockquote className="border-l-2 border-primary pl-6">
            <p
              className="font-['Instrument_Serif'] font-normal text-foreground leading-[1.6]"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.2rem)" }}
            >
              {project.decisions}
            </p>
          </blockquote>
        </CaseSection>

        {/* Challenges */}
        <CaseSection label="Challenges" delay={0.05}>
          <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.85]">
            {project.challenges}
          </p>
        </CaseSection>

        {/* Outcome */}
        <CaseSection label="Outcome" delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-0">
            {project.outcomes.map(({ value, label }) => (
              <div key={label} className="border-t-2 border-primary pt-4">
                <p className="font-['Instrument_Serif'] font-normal text-3xl text-foreground leading-none mb-1">
                  {value}
                </p>
                <p className="font-['Geist'] font-light text-xs text-muted-foreground leading-[1.5]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </CaseSection>

        {/* What I Learned */}
        <CaseSection label="What I Learned" delay={0.05}>
          <p className="font-['Geist'] font-light text-base text-muted-foreground leading-[1.85]">
            {project.learned}
          </p>
        </CaseSection>

        {/* Prev / Next */}
        <div className="border-t border-border mt-20 pt-10 grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group flex flex-col gap-4"
            >
              <div
                className="overflow-hidden bg-muted w-full"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={prev.heroImg}
                  alt={prev.title}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                <ArrowLeft
                  size={12}
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                />
                <div>
                  <p className="font-['Geist'] text-[0.55rem] tracking-[0.18em] uppercase text-muted-foreground mb-0.5">
                    Previous
                  </p>
                  <p className="font-['Instrument_Serif'] font-normal text-base text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {prev.title}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex flex-col gap-4"
            >
              <div
                className="overflow-hidden bg-muted w-full"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={next.heroImg}
                  alt={next.title}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                <div className="text-right">
                  <p className="font-['Geist'] text-[0.55rem] tracking-[0.18em] uppercase text-muted-foreground mb-0.5">
                    Next
                  </p>
                  <p className="font-['Instrument_Serif'] font-normal text-base text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {next.title}
                  </p>
                </div>
                <ArrowRight
                  size={12}
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}

function CaseSection({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="pt-12 pb-12 border-b border-border">
        <p className="font-['Geist'] text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mb-6">
          {label}
        </p>
        {children}
      </div>
    </Reveal>
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
      { path: "projects/:slug", Component: ProjectDetail },
      { path: "*", Component: NotFound },
    ],
  },
]);
