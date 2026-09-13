import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  BookOpen,
  Cpu,
  Check,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  FileDown,
  Filter,
  Github,
  Globe2,
  GraduationCap,
  HeartPulse,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  Palette,
  Play,
  Plus,
  Radar,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Trophy,
  X,
  Zap,
  Lightbulb,
  Users,
  Workflow,
  Volume2,
  VolumeX,
} from "lucide-react";

type Project = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  category: "all" | "web" | "ai" | "research";
  metric: string;
  metricLabel: string;
  accent: string;
  icon: typeof BrainCircuit;
};

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["challenge", "SIH 2026"],
  ["team", "Team"],
  ["collaboration", "Collab"],
  ["skills", "Skills"],
  ["work", "Work"],
  ["journey", "Journey"],
  ["genfahh", "Genfahh"],
  ["contact", "Contact"],
];

const projects: Project[] = [
  {
    id: 1,
    eyebrow: "01 / Product prototype",
    title: "Automated Advanced Parking Slot Management System",
    description:
      "An intelligent parking and pre-booking platform with live slot availability, digital confirmation, and EV charging support.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    metric: "24/7",
    metricLabel: "availability view",
    accent: "cyan",
    icon: Globe2,
  },
  {
    id: 2,
    eyebrow: "02 / Healthcare AI",
    title: "CareFlow AI",
    description:
      "An AI-powered patient case-taking flow that asks adaptive questions, processes medical reports, and creates structured summaries for doctors.",
    tags: ["Python", "Streamlit", "OCR"],
    category: "ai",
    metric: "01",
    metricLabel: "clearer care flow",
    accent: "violet",
    icon: HeartPulse,
  },
  {
    id: 3,
    eyebrow: "03 / Climate intelligence",
    title: "AI-Based Landslide Risk Monitoring System",
    description:
      "A monitoring system that combines rainfall and environmental signals to predict landslide risk and support earlier warnings.",
    tags: ["Python", "ML", "Data analysis"],
    category: "research",
    metric: "early",
    metricLabel: "risk signal",
    accent: "lime",
    icon: Radar,
  },
  {
    id: 4,
    eyebrow: "04 / Explainable security",
    title: "Explainable Phishing URL Detection",
    description:
      "A lightweight machine learning framework for phishing detection, designed to show the reasoning behind each prediction.",
    tags: ["Python", "SHAP", "LIME"],
    category: "ai",
    metric: "XAI",
    metricLabel: "by design",
    accent: "orange",
    icon: ShieldCheck,
  },
  {
    id: 5,
    eyebrow: "05 / Graph learning",
    title: "Electricity Theft Detection Using GNNs",
    description:
      "An AI system that uses graph neural networks to surface suspicious consumption patterns and make utility data more actionable.",
    tags: ["Python", "GNN", "ML"],
    category: "research",
    metric: "GNN",
    metricLabel: "pattern lens",
    accent: "blue",
    icon: Network,
  },
];

const skillGroups = [
  {
    label: "Build / engineer",
    title: "Technical stack",
    icon: Code2,
    skills: [
      ["Python", 92],
      ["Machine Learning", 84],
      ["Data Analysis", 82],
      ["JavaScript / React", 78],
      ["HTML / CSS", 90],
      ["C++ / Java", 72],
    ],
  },
  {
    label: "Shape / communicate",
    title: "Creative toolkit",
    icon: Palette,
    skills: [
      ["Graphic design", 88],
      ["Content creation", 86],
      ["Video editing / VFX", 74],
      ["CAD & PCB design", 68],
      ["Canva", 94],
      ["Presentation design", 90],
    ],
  },
];

const services = [
  ["01", "Web development", "Responsive websites and focused web applications with a strong visual system.", Globe2],
  ["02", "AI & machine learning", "Intelligent prototypes that turn messy inputs into useful decisions.", BrainCircuit],
  ["03", "Data analysis", "Clear analysis, visualizations, and stories hidden inside real-world data.", BarChart3],
  ["04", "Visual communication", "Posters, decks, social content, and graphic systems that hold attention.", Palette],
  ["05", "Content & motion", "Educational technology content, edits, animation, and VFX experiments.", Play],
  ["06", "CAD & PCB design", "Engineering-minded design support for physical and digital systems.", Layers3],
] as const;

const certificationItems = [
  ["AI & Data Science", "Learning track", "2025"],
  ["Hackathon participation", "Innovation sprint", "2025"],
  ["Smart street light + water level monitoring", "Hardware mini engineering project · IoT", "2025"],
];

const teamMembers = [
  {
    name: "Monisha T",
    role: "AI & Data Science Collaborator · Team Member",
    skills: "AI · Data Science · Web Development · Research",
    description: "A collaborative AI and Data Science creator contributing thoughtful systems, research projects, and digital experiences with a creative edge.",
    initials: "MT",
    accent: "cyan",
  },
  {
    name: "Nanthika S",
    role: "Collaborative Innovator · Research Partner",
    skills: "Research · Ideation · Data Projects",
    description: "A collaborative thinker bringing curiosity, structure, and fresh perspective to student innovation projects.",
    initials: "NS",
    accent: "violet",
  },
  {
    name: "John Aaron J",
    role: "Technology Collaborator · Project Builder",
    skills: "Technology · Prototyping · Solution Design",
    description: "A hands-on technology collaborator helping turn ambitious concepts into practical, testable solutions.",
    initials: "JA",
    accent: "lime",
  },
];

const collaborationAreas = [
  ["Artificial Intelligence & Machine Learning", BrainCircuit],
  ["Data Science Projects", BarChart3],
  ["Web Applications", Globe2],
  ["Research Papers", BookOpen],
  ["Student Innovation Projects", Lightbulb],
  ["Hackathons", Trophy],
  ["Technology Solutions", Cpu],
  ["AI-powered Digital Content", Workflow],
] as const;

function useCountUp(target: number, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      if (now < start) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - start) / 900, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, delay]);
  return value;
}

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="section-heading reveal-up">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function MiniLogo() {
  return (
    <span className="mini-logo" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [projectFilter, setProjectFilter] = useState<"all" | "web" | "ai" | "research">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formError, setFormError] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const challengeVideo = useRef<HTMLVideoElement>(null);

  const countProjects = useCountUp(5, 150);
  const countSkills = useCountUp(18, 220);
  const countCerts = useCountUp(3, 290);
  const countProblems = useCountUp(120, 360);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 720);
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      setShowTop(window.scrollY > 560);
    };
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(loadingTimer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
  }, [isDark]);

  useEffect(() => {
    if (!selectedProject) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedProject(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProject]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleProjects = useMemo(
    () => projects.filter((project) => projectFilter === "all" || project.category === projectFilter),
    [projectFilter],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const downloadResume = () => {
    const resume = `PRADHEEP\nAI & DATA SCIENCE STUDENT\n\nFocus: Artificial Intelligence, Data Science, Web Development, Design\n\nGoal\nBuild innovative AI-powered solutions and contribute to real-world technology projects.\n\nSelected work\n- CareFlow AI\n- Automated Advanced Parking Slot Management System\n- Explainable Phishing URL Detection\n- AI-Based Landslide Risk Monitoring System\n- Electricity Theft Detection Using Graph Neural Networks\n\nContact: genfahh@gmail.com`;
    const blob = new Blob([resume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "pradheep-resume.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("Resume download started.");
  };

  const showPlaceholderToast = (message: string) => setToast(message);

  const toggleVoiceover = async () => {
    const video = challengeVideo.current;
    if (!video) return;
    if (video.paused) await video.play();
    video.muted = !video.muted;
    setIsVoicePlaying(!video.muted);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setFormError("Please complete every field so I know how to respond.");
      setFormSent(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setFormError("Please enter a valid email address.");
      setFormSent(false);
      return;
    }
    setFormError("");
    setFormSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-mark"><MiniLogo /></div>
        <div className="loading-line"><span /></div>
        <p>initializing portfolio<span>_</span></p>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); scrollTo("home"); }}>
          <MiniLogo />
          <span>pradheep<span className="brand-dot">.</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <a key={id} className={activeSection === id ? "active" : ""} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollTo(id); }}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button theme-button" type="button" onClick={() => setIsDark((value) => !value)} aria-label="Toggle color theme">
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="nav-cta" type="button" onClick={() => scrollTo("contact")}>Let&apos;s talk <ArrowUpRight size={15} /></button>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section section-pad">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="hero-network" aria-hidden="true">
            <span className="network-node node-a" /><span className="network-node node-b" /><span className="network-node node-c" /><span className="network-node node-d" />
            <svg viewBox="0 0 470 420" role="presentation"><path d="M40 300 C145 220, 160 120, 270 170 S360 280, 450 75" /><path d="M58 300 C145 342, 210 305, 280 200 S365 112, 424 82" /></svg>
          </div>
          <div className="hero-content container">
            <div className="hero-copy reveal-up">
              <div className="status-pill"><span className="status-dot" /> Available for meaningful projects <span className="pill-arrow">↗</span></div>
              <p className="hero-kicker">AI / DATA / TEAM INNOVATION</p>
              <h1>Building the next layer of <em>useful</em> technology.</h1>
              <p className="hero-intro">Hi, I&apos;m <strong>Pradheep</strong> — an AI &amp; Data Science student, developer, researcher, and curious maker turning ambitious ideas into clear, human-centered digital experiences.</p>
              <div className="hero-actions">
                <button className="button button-primary" type="button" onClick={() => scrollTo("work")}>Explore my work <ArrowDownRight size={17} /></button>
                <button className="button button-quiet" type="button" onClick={downloadResume}><FileDown size={16} /> Download resume</button>
              </div>
              <div className="hero-meta"><span><MapPin size={14} /> India · open to remote</span><span className="meta-separator" /><span><Zap size={14} /> learning in public</span></div>
            </div>
            <div className="hero-visual reveal-up delay-2">
              <div className="visual-topline"><span>PRADHEEP / 01</span><span>BUILD / EXPLORE</span></div>
              <div className="code-orbit">
                <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" />
                <div className="orbit-core"><BrainCircuit size={45} strokeWidth={1.2} /><span>AI</span></div>
                <span className="float-chip chip-python">Python</span><span className="float-chip chip-ml">ML / 84%</span><span className="float-chip chip-react">React</span>
                <span className="code-fragment fragment-one">if (idea) &#123;</span><span className="code-fragment fragment-two">learn( ) → build( )</span><span className="code-fragment fragment-three">return impact;</span>
              </div>
              <div className="visual-bottomline"><span>systems / stories / solutions</span><span>scroll to inspect <ChevronDown size={14} /></span></div>
            </div>
          </div>
          <div className="hero-scroll container"><span>Scroll to explore</span><div className="scroll-rule" /></div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="container about-layout">
            <SectionHeading kicker="01 — About" title="A technologist with a creative edge." copy="I like the space where rigorous engineering meets a strong point of view." />
            <div className="about-body reveal-up delay-1">
              <p className="about-lede">I&apos;m a passionate Artificial Intelligence and Data Science student with strong interests in machine learning, web development, data analysis, and digital creativity.</p>
              <p>I enjoy transforming ideas into real-world projects — from an explainable security model to a patient-first healthcare flow — and continuously learning new technologies along the way.</p>
              <div className="about-note"><span className="note-mark">↳</span><span>My north star: make technology feel less intimidating and more <strong>useful.</strong></span></div>
            </div>
          </div>
          <div className="container stat-grid">
            <div className="stat-card reveal-up"><span className="stat-index">A / 01</span><strong>{countProjects.toString().padStart(2, "0")}<sup>+</sup></strong><span>projects completed</span></div>
            <div className="stat-card reveal-up delay-1"><span className="stat-index">A / 02</span><strong>{countSkills.toString().padStart(2, "0")}<sup>+</sup></strong><span>skills &amp; tools</span></div>
            <div className="stat-card reveal-up delay-2"><span className="stat-index">A / 03</span><strong>{countCerts.toString().padStart(2, "0")}</strong><span>learning milestones</span></div>
            <div className="stat-card reveal-up delay-3"><span className="stat-index">A / 04</span><strong>{countProblems.toString()}<sup>+</sup></strong><span>coding problems solved</span></div>
          </div>
        </section>

        <section id="challenge" className="challenge-section section-pad section-dark">
          <video ref={challengeVideo} className="challenge-video" autoPlay muted loop playsInline poster="/sih-update-poster.jpg" aria-label="SIH 2026 update video with voiceover">
            <source src="/sih-update.mp4" type="video/mp4" />
          </video>
          <div className="challenge-overlay" aria-hidden="true" />
          <div className="container challenge-content">
            <div className="challenge-heading">
              <SectionHeading kicker="SIH 2026 — Portal update" title="More problems. More ways to build impact." copy="The Smart India Hackathon update expands the problem-statement range from 229 to 240 — 11 new opportunities for student innovation." />
              <div className="challenge-actions">
                <button className="button button-audio" type="button" onClick={toggleVoiceover} aria-pressed={isVoicePlaying}>{isVoicePlaying ? <VolumeX size={16} /> : <Volume2 size={16} />} {isVoicePlaying ? "Mute voiceover" : "Enable voiceover"}</button>
                <a className="button button-primary" href="/sih-2026-problem-statements.pdf" download><FileDown size={16} /> Download full PDF</a>
              </div>
            </div>
            <div className="challenge-panel reveal-up delay-1">
              <div className="challenge-panel-top"><span>PROBLEM STATEMENTS</span><span>SIH 2026 / UPDATE</span></div>
              <div className="challenge-range"><strong>229</strong><span>→</span><strong>240</strong></div>
              <div className="challenge-count"><span className="challenge-count-number">11</span><span>new problem statements<br />now available</span></div>
              <div className="challenge-codes"><span>SIH26230</span><span>SIH26240</span></div>
              <p>Each problem statement is identified by a unique SIH code for easy tracking. Review the official portal before selecting your next challenge.</p>
              <a className="challenge-portal" href="https://www.sih.gov.in/" target="_blank" rel="noreferrer">Check the SIH portal <ArrowUpRight size={15} /></a>
            </div>
            <div className="challenge-theme reveal-up delay-2"><span className="kicker">Theme details</span><span>Dark tech / cyan signal / orange urgency</span><span>Update · Growth · Codes · Action</span><span>AI • TECH • HACKATHONS • RESEARCH</span><strong>Follow our page for more updates.</strong></div>
          </div>
        </section>


        <section id="team" className="team-section section-pad section-dark">
          <div className="container">
            <div className="team-intro"><SectionHeading kicker="02 — Meet the team" title="One portfolio. Three perspectives." copy="We are a passionate team of young innovators working together to create impactful solutions using Artificial Intelligence, Data Science, Web Development, Research, and emerging technologies." /><div className="team-signature reveal-up delay-1"><Users size={18} /><span>Personal identity, shared momentum.</span></div></div>
            <div className="team-grid">{teamMembers.map((member, index) => <article className={`member-card member-${member.accent} reveal-up delay-${Math.min(index, 3)}`} key={member.name}><div className="member-card-top"><span>TEAM / 0{index + 1}</span><Users size={17} /></div><div className="profile-placeholder"><div className="profile-glow" /><span>{member.initials}</span><small>photo placeholder</small></div><div className="member-copy"><h3>{member.name}</h3><span className="member-role">{member.role}</span><p>{member.description}</p><div className="member-skills">{member.skills.split(" · ").map((skill) => <span key={skill}>{skill}</span>)}</div></div><div className="member-links"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={14} /> GitHub <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn <ArrowUpRight size={13} /></a></div></article>)}</div>
          </div>
        </section>

        <section id="skills" className="skills-section section-pad section-dark">
          <div className="container">
            <SectionHeading kicker="02 — Capabilities" title="A stack built for curiosity." copy="Technical foundations, creative tools, and the habit of making things clearer." />
            <div className="skill-groups">
              {skillGroups.map((group) => {
                const SkillIcon = group.icon;
                return <div className="skill-panel reveal-up" key={group.title}><div className="panel-top"><span className="panel-label">{group.label}</span><SkillIcon size={19} /></div><h3>{group.title}</h3><div className="skill-list">{group.skills.map(([skill, value]) => <div className="skill-row" key={skill}><div className="skill-label"><span>{skill}</span><span>{value}%</span></div><div className="skill-track"><span style={{ width: `${value}%` }} /></div></div>)}</div></div>;
              })}
            </div>
            <div className="tool-cloud reveal-up delay-1"><span className="cloud-label">Current toolkit</span>{["Python", "React", "JavaScript", "Streamlit", "SQLite", "GitHub", "VS Code", "Canva", "SHAP", "LIME", "Figma", "Excel"].map((tool, index) => <span className={`tool-tag tag-${index % 4}`} key={tool}>{tool}</span>)}</div>
          </div>
        </section>


        <section id="collaboration" className="collab-section section-pad">
          <div className="container collab-layout"><SectionHeading kicker="03 — Our collaboration" title="Different strengths. One direction." copy="Our team collaborates across the full innovation loop — from the first research question to the final demo, paper, or piece of content." /><div className="collab-grid">{collaborationAreas.map(([title, Icon], index) => <div className="collab-card reveal-up" key={title}><span>0{index + 1}</span><Icon size={21} /><h3>{title}</h3><ArrowUpRight className="collab-arrow" size={16} /></div>)}</div></div>
        </section>

        <section className="services-section section-pad">
          <div className="container">
            <SectionHeading kicker="03 — What I can do" title="From first sketch to working signal." copy="I bring an end-to-end mindset to projects — strategy, structure, craft, and iteration." />
            <div className="services-grid">{services.map(([number, title, copy, Icon], index) => <article className={`service-card reveal-up delay-${Math.min(index % 4, 3)}`} key={title}><div className="service-head"><span>{number}</span><Icon size={22} /></div><h3>{title}</h3><p>{copy}</p><ArrowUpRight className="service-arrow" size={19} /></article>)}</div>
          </div>
        </section>

        <section id="work" className="work-section section-pad section-dark">
          <div className="container">
            <div className="work-heading"><SectionHeading kicker="04 — Selected work" title="Ideas, made tangible." copy="A few projects where I explored how technology can be more useful, explainable, and human." /><div className="project-filters"><Filter size={15} />{(["all", "web", "ai", "research"] as const).map((filter) => <button key={filter} className={projectFilter === filter ? "active" : ""} type="button" onClick={() => setProjectFilter(filter)}>{filter === "all" ? "All work" : filter}</button>)}</div></div>
            <div className="projects-grid">{visibleProjects.map((project, index) => { const ProjectIcon = project.icon; return <article className={`project-card accent-${project.accent} reveal-up delay-${Math.min(index % 4, 3)}`} key={project.id} onClick={() => setSelectedProject(project)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setSelectedProject(project)}><div className="project-card-top"><span>{project.eyebrow}</span><ProjectIcon size={20} /></div><div className="project-visual"><div className="visual-grid" /><div className="project-icon-wrap"><ProjectIcon size={30} /></div><span className="project-metric">{project.metric}<small>{project.metricLabel}</small></span></div><div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-link">View case study <ArrowUpRight size={15} /></div></article>; })}</div>
            <div className="work-footer"><span><Sparkles size={16} /> More experiments in progress</span><button type="button" onClick={() => showPlaceholderToast("The full project archive is coming soon.")}>View archive <ArrowUpRight size={15} /></button></div>
          </div>
        </section>

        <section id="journey" className="journey-section section-pad">
          <div className="container journey-layout">
            <SectionHeading kicker="05 — Journey" title="Still learning. Already shipping." copy="The best work happens when research, experiments, and real people meet." />
            <div className="timeline reveal-up delay-1"><div className="timeline-line" /><div className="timeline-item current"><span className="timeline-dot" /><span className="timeline-date">Now / 2024 — present</span><div><h3>B.Tech — Artificial Intelligence &amp; Data Science</h3><p>Current engineering student exploring artificial intelligence, data science, machine learning, web development, and research.</p><div className="timeline-tags"><span>AI</span><span>Data science</span><span>Research</span></div></div></div><div className="timeline-item"><span className="timeline-dot" /><span className="timeline-date">Milestone / ongoing</span><div><h3>Building a portfolio of useful systems</h3><p>From healthcare and climate intelligence to cybersecurity and creative communication — learning by making.</p></div></div></div>
          </div>
          <div className="container achievement-row"><div className="achievement-intro"><span className="kicker">Proof of motion</span><p>Small signals add up. These are the moments that keep the momentum going.</p></div>{[["01", "Smart India Hackathon", "Participant"], ["02", "Multiple AI & web projects", "Builder"], ["03", "Research paper development", "Explorer"], ["04", "Continuous tech learning", "Always on"]].map(([number, title, label], index) => <div className={`achievement-card reveal-up delay-${Math.min(index, 3)}`} key={title}><span>{number}</span><strong>{title}</strong><small>{label}</small></div>)}</div>
        </section>

        <section className="certifications-section section-pad section-dark">
          <div className="container cert-layout"><div><SectionHeading kicker="06 — Credentials" title="Learning, documented." copy="A growing shelf of certificates, challenges, and milestones. Add new proof points as the journey continues." /><button className="button button-quiet" type="button" onClick={() => showPlaceholderToast("Certificate upload is ready for your next credential.")}><Plus size={16} /> Add certificate</button></div><div className="cert-list">{certificationItems.map(([title, org, year], index) => <div className="cert-card reveal-up" key={title}><div className="cert-icon"><GraduationCap size={18} /></div><div><span>{org}</span><h3>{title}</h3><small>{year} · credential placeholder</small></div><button type="button" aria-label={`View ${title}`} onClick={() => showPlaceholderToast("Add your certificate URL to make this card live.")}><ExternalLink size={16} /></button></div>)}</div></div>
        </section>


        <section id="genfahh" className="social-section section-pad section-dark">
          <div className="container social-card reveal-up"><div className="social-orbit" aria-hidden="true"><Instagram size={42} /></div><div className="social-copy"><span className="kicker">08 — Follow our journey</span><h2>Meet <em>GENFAHH</em>.</h2><p>Follow Genfahh for innovation, technology, AI, research, web development, student projects, educational content, and our journey of building the future with technology.</p><a className="instagram-button" href="https://www.instagram.com/genfahh/" target="_blank" rel="noreferrer"><Instagram size={18} /> Follow @genfahh on Instagram <ArrowUpRight size={16} /></a></div><div className="social-handle"><span>official team page</span><strong>@genfahh</strong><small>innovation / research / build</small></div></div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="container contact-layout"><div className="contact-copy"><SectionHeading kicker="07 — Contact" title="Have an idea with a little spark?" copy="Tell me what you&apos;re building, researching, or imagining. I&apos;d love to hear the thinking behind it." /><div className="contact-links"><a href="mailto:genfahh@gmail.com"><Mail size={17} /><span>genfahh@gmail.com</span><ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={17} /><span>LinkedIn / connect</span><ArrowUpRight size={15} /></a><a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={17} /><span>GitHub / explore</span><ArrowUpRight size={15} /></a><a href="https://www.instagram.com/genfahh/" target="_blank" rel="noreferrer"><Instagram size={17} /><span>@genfahh / follow</span><ArrowUpRight size={15} /></a></div></div><form className="contact-form reveal-up delay-1" onSubmit={handleSubmit}><div className="form-heading"><span>Start a conversation</span><Send size={18} /></div><label>Name<input type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><label>Subject<input type="text" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="What are you working on?" /></label><label>Message<textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="A few words about the idea..." rows={4} /></label>{formError && <p className="form-message error">{formError}</p>}{formSent && <p className="form-message success"><Check size={15} /> Message received — I&apos;ll get back to you soon.</p>}<button className="button button-primary form-submit" type="submit">Send message <ArrowUpRight size={17} /></button></form></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><a className="brand" href="#home" onClick={(event) => { event.preventDefault(); scrollTo("home"); }}><MiniLogo /><span>pradheep<span className="brand-dot">.</span></span></a><p>Building technology with intent — together.</p><button type="button" onClick={() => scrollTo("home")}><ArrowUpRight size={16} /> Back to top</button></div><div className="container footer-bottom"><span>© 2025 Pradheep + Genfahh. Designed &amp; built with curiosity.</span><span>AI / DATA / TEAM INNOVATION</span></div></footer>

      {showTop && <button className="scroll-top" type="button" onClick={() => scrollTo("home")} aria-label="Scroll to top"><ArrowUpRight size={17} /></button>}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={19} /></button><span className={`modal-icon accent-${selectedProject.accent}`}><selectedProject.icon size={25} /></span><span className="kicker">{selectedProject.eyebrow}</span><h2 id="project-modal-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modal-data"><div><span>Focus</span><strong>{selectedProject.category === "web" ? "Product design" : selectedProject.category === "ai" ? "Applied AI" : "Research system"}</strong></div><div><span>Tools</span><strong>{selectedProject.tags.join(" · ")}</strong></div><div><span>Status</span><strong>Concept / prototype</strong></div></div><div className="modal-actions"><button className="button button-primary" type="button" onClick={() => showPlaceholderToast("Demo link ready to connect.")}>Open demo <ExternalLink size={15} /></button><button className="button button-quiet" type="button" onClick={() => showPlaceholderToast("GitHub link ready to connect.")}>View code <Github size={15} /></button></div></div></div>}
    </div>
  );
}
