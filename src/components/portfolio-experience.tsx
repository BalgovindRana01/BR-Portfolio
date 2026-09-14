"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, ChevronRight, CircleDot, Database, Download, ExternalLink, Mail, Menu, Network, Terminal, X, Zap } from "lucide-react";
import DataUniverse from "@/components/data-universe";
import { portfolio } from "@/data/portfolio";

const navItems = ["home", "about", "work", "skills", "experience", "contact"];

function useSystemMode() {
  const [systemMode, setSystemMode] = useState(false);
  const sequence = useRef("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!["b", "r"].includes(event.key.toLowerCase())) return;
      sequence.current = `${sequence.current}${event.key.toLowerCase()}`.slice(-2);
      if (sequence.current === "br") {
        setSystemMode(true);
        window.setTimeout(() => setSystemMode(false), 7000);
        sequence.current = "";
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return systemMode;
}

function useCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isTextHover, setIsTextHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!cursor.current) return;
        const hue = Math.round(((event.clientX / window.innerWidth) * 220 + (event.clientY / window.innerHeight) * 140) % 360);
        cursor.current.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
        cursor.current.style.setProperty("--cursor-color", `hsl(${hue} 92% 70%)`);
        cursor.current.style.setProperty("--cursor-glow", `hsl(${hue} 92% 58% / .42)`);
      });
    };
    window.addEventListener("pointermove", move);
    const isTextElement = (target: EventTarget | null) => target instanceof HTMLElement && Boolean(target.closest("h1, h2, h3, h4, p, .display-heading, .body-copy, .section-label, .project-meta, .tech-list, .stat, .hero-kicker, .hero-summary"));
    const over = (event: PointerEvent) => setIsTextHover(isTextElement(event.target));
    const out = (event: PointerEvent) => {
      if (event.relatedTarget instanceof Node && isTextElement(event.relatedTarget)) return;
      setIsTextHover(false);
    };
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); window.removeEventListener("pointerout", out); };
  }, []);

  return { cursor, cursorLabel, setCursorLabel, isTextHover };
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <div className="section-label"><span>{number}</span><span>{label}</span><span className="section-rule" /></div>;
}

export default function PortfolioExperience() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeProject, setActiveProject] = useState(0);
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeSkill, setActiveSkill] = useState("DATA ENGINEERING");
  const systemMode = useSystemMode();
  const { cursor, cursorLabel, setCursorLabel, isTextHover } = useCursor();
  const skillPositions = useMemo(() => portfolio.skills.map((skill, index) => ({ ...skill, x: `${50 + Math.cos(index / portfolio.skills.length * Math.PI * 2) * 38}%`, y: `${50 + Math.sin(index / portfolio.skills.length * Math.PI * 2) * 36}%` })), []);

  useEffect(() => {
    const timer = window.setInterval(() => setProgress((value) => {
      if (value >= 100) { window.clearInterval(timer); window.setTimeout(() => setLoading(false), 500); return 100; }
      return Math.min(value + 4, 100);
    }), 35);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: "-18% 0px -55%" });
    navItems.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const currentProject = portfolio.projects[activeProject];

  return (
    <main className={`portfolio-shell ${systemMode ? "system-mode" : ""}`}>
      <div ref={cursor} className={`custom-cursor ${cursorLabel ? "has-label" : ""} ${isTextHover ? "text-hover" : ""}`}><span>{cursorLabel}</span></div>
      {loading && <div className="preloader"><div className="preloader-grid" /><div className="preloader-content"><span className="preloader-kicker">BR / SYSTEM 001</span><div className="preloader-title">INITIALIZING<br /><em>EXPERIENCE</em></div><div className="preloader-status"><span>LOADING DATA...</span><strong>{String(progress).padStart(2, "0")} %</strong></div><div className="preloader-bar"><span style={{ width: `${progress}%` }} /></div></div><span className="preloader-foot">DATA → PROCESSING → INSIGHT</span></div>}
  <header className={`topbar ${activeSection !== "home" ? "scrolled" : ""}`}>
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Back to home">BR<span>.</span></button>
        <div className="desktop-nav">{navItems.map((item, index) => <button className={activeSection === item ? "active" : ""} key={item} onClick={() => scrollTo(item)}><span>0{index + 1}</span>{item}</button>)}</div>
        <div className="availability"><span className="pulse-dot" /> AVAILABLE FOR OPPORTUNITIES</div>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
      </header>
  {menuOpen && <div className="mobile-menu"><button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button><span className="preloader-kicker">NAV / BR_2026</span><div className="mobile-menu-links">{navItems.map((item, index) => <button key={item} onClick={() => scrollTo(item)}><span>0{index + 1}</span>{item}</button>)}</div><div className="mobile-menu-footer">{portfolio.role}<br />{portfolio.location}</div></div>}
  <section className="data-hero section-dark" id="home"><DataUniverse systemMode={systemMode} /><div className="hero-vignette" /><div className="hero-content"><div className="hero-eyebrow"><span>01 / 07</span><span>PERSONAL DATA LABORATORY</span><span>SCROLL TO DESCEND <ArrowDown size={13} /></span></div><div className="hero-title-wrap"><p className="hero-kicker">{portfolio.role}</p><h1><span>BALGO<span className="outlined">VIND</span></span><span>RANA<span className="hero-dot">.</span></span></h1><p className="hero-summary">Building full-stack products,<br />intelligent data systems<br />and real-time digital experiences.</p></div><div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo("work")} onMouseEnter={() => setCursorLabel("ENTER")} onMouseLeave={() => setCursorLabel("")}><span>EXPLORE MY WORK</span><ArrowRight size={17} /></button><a className="button button-ghost" href="/resume.pdf" download onMouseEnter={() => setCursorLabel("GET")} onMouseLeave={() => setCursorLabel("")}><Download size={15} /><span>DOWNLOAD RESUME</span></a></div><div className="hero-location"><span><CircleDot size={13} /> BASED IN {portfolio.location.toUpperCase()}</span><span>BUILDING FOR THE FUTURE</span></div></div><div className="hero-metrics"><span>CORE / 01</span><span>08.42.17</span><span>● LIVE</span></div></section>
  <section className="about-section section-light" id="about"><div className="content-frame"><SectionLabel number="02" label="DIGITAL IDENTITY" /><div className="about-layout"><div><h2 className="display-heading">I BUILD<br /><span className="accent-text">WITH DATA.</span><br />I THINK<br />IN SYSTEMS.</h2><p className="body-copy">Computer Science student focused on full-stack development, data systems, and useful digital experiences. Currently building {portfolio.currentFocus} and always excited to build something new.</p><div className="profile-details">{portfolio.profileDetails.map((detail) => <div className="profile-detail" key={detail.label}><span>{detail.label}</span><strong>{detail.value}</strong></div>)}</div></div><div className="identity-object" aria-label="Interactive 3D profile identity"><div className="identity-halo halo-one" /><div className="identity-halo halo-two" /><div className="identity-core"><div className="identity-scanlines" /><span className="identity-initials">BR</span><span className="identity-core-label">PROFILE<br />CORE</span><i className="identity-point point-one" /><i className="identity-point point-two" /><i className="identity-point point-three" /></div><div className="identity-chip chip-top">ROLE / BUILDER</div><div className="identity-chip chip-bottom">FOCUS / {portfolio.focus.toUpperCase()}</div><div className="identity-caption">IDENTITY_CORE / 3D PROFILE<br />HOVER TO ROTATE</div></div></div><div className="stats-grid">{portfolio.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div></section>
  <section className="skills-section section-dark" id="skills"><div className="content-frame"><SectionLabel number="03" label="TECHNOLOGY CONSTELLATION" /><div className="skills-heading"><h2 className="display-heading">THE TOOLS<br /><span className="accent-text">BEHIND THE SIGNAL.</span></h2><p className="body-copy">A working constellation of languages, platforms, and ideas. Select a node to surface its role in the system.</p></div><div className="constellation"><div className="constellation-grid" />{skillPositions.map((skill) => <button className={`skill-node ${activeSkill === skill.name ? "selected" : ""}`} style={{ left: skill.x, top: skill.y }} key={skill.name} onClick={() => setActiveSkill(skill.name)} onMouseEnter={() => { setActiveSkill(skill.name); setCursorLabel("VIEW"); }} onMouseLeave={() => setCursorLabel("")}><span className="node-pulse" /><span>{skill.name}</span><small>{skill.group}</small></button>)}<div className="skill-center"><Database size={22} /><span>DATA<br />ENGINEERING</span></div><div className="skill-readout"><span>ACTIVE NODE</span><strong>{activeSkill}</strong><p>{activeSkill === "DATA ENGINEERING" ? "The connective tissue between raw signals and useful decisions." : "A component in the system, ready to be combined with the next idea."}</p></div></div></div></section>
  <section className="work-section section-light" id="work"><div className="content-frame"><SectionLabel number="04" label="SELECTED WORK" /><div className="work-heading"><h2 className="display-heading">SYSTEMS<br /><span className="accent-text">IN MOTION.</span></h2><span className="project-index">0{activeProject + 1} / 0{portfolio.projects.length}</span></div><div className="project-stage"><div className={`project-visual ${currentProject.accent}`}><div className="project-grid" /><div className="project-visual-core"><div className="core-ring" /><div className="core-dot" /></div><span className="visual-label">LIVE SYSTEM / {currentProject.number}</span><span className="visual-coordinate">GITHUB / PUBLIC<br />SOURCE AVAILABLE</span></div><div className="project-detail"><span className="project-number">PROJECT {currentProject.number}</span><h3>{currentProject.title}</h3><h4>{currentProject.subtitle}</h4><p>{currentProject.description}</p><div className="project-meta"><div><span>ROLE</span><strong>{currentProject.role}</strong></div><div><span>DOMAIN</span><strong>{currentProject.domain}</strong></div></div><div className="tech-list">{currentProject.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-actions">{currentProject.demoUrl && <a className="button button-primary" href={currentProject.demoUrl} target="_blank" rel="noreferrer"><span>VIEW DEMO</span><ArrowUpRight size={16} /></a>}<a className="button button-dark" href={currentProject.url} target="_blank" rel="noreferrer"><span>VIEW REPOSITORY</span><ArrowUpRight size={16} /></a><a href={currentProject.url} target="_blank" rel="noreferrer" className="icon-link" aria-label={`View ${currentProject.title} source code`}><Terminal size={17} /></a><a href={currentProject.url} target="_blank" rel="noreferrer" className="icon-link" aria-label={`Open ${currentProject.title} repository`}><ExternalLink size={17} /></a></div></div></div><div className="project-switcher">{portfolio.projects.map((project, index) => <button key={project.number} className={activeProject === index ? "active" : ""} onClick={() => setActiveProject(index)}><span>{project.number}</span><strong>{project.title}</strong><ChevronRight size={15} /></button>)}</div></div></section>
  <section className="architecture-section section-dark"><div className="content-frame"><SectionLabel number="05" label="SYSTEM ARCHITECTURE" /><div className="architecture-layout"><div><h2 className="display-heading">FROM RAW<br /><span className="accent-text">TO REAL.</span></h2><p className="body-copy">I turn a rough idea into a usable product by connecting interface, logic, data, and deployment into one clear system.</p><div className="architecture-aside"><Terminal size={17} /><span>PRODUCT FLOW / NOMINAL<br /><strong>6 LAYERS CONNECTED</strong></span></div></div><div className="pipeline">{["USER SIGNALS", "REACT / NEXT.JS", "NODE / EXPRESS", "DATABASE", "CLOUD DEPLOY", "LIVE PRODUCT"].map((node, index) => <div className="pipeline-node" key={node}><span>0{index + 1}</span><strong>{node}</strong><small>{index === 0 ? "idea in" : index === 5 ? "experience out" : "connected"}</small>{index < 5 && <div className="pipeline-line"><i /></div>}</div>)}</div></div></div></section>
  <section className="experience-section section-light" id="experience"><div className="content-frame"><SectionLabel number="06" label="THE SHORT VERSION" /><div className="experience-heading"><div><h2 className="display-heading">MY<br /><span className="accent-text">JOURNEY.</span></h2><p className="journey-intro">A living map of what I&apos;m learning, building, and moving toward.</p></div><div className="resume-card"><div className="resume-card-top"><span>BR / CV_2026</span><Download size={16} /></div><strong>Computer Science<br />× Full-Stack Development</strong><span className="resume-lines">EDUCATION / PROJECTS / FUTURE</span><a href="/resume.pdf" download>DOWNLOAD RESUME <ArrowDown size={14} /></a></div></div><div className="journey-map"><div className="journey-rail"><span className="journey-progress" style={{ height: `${(activeJourney / (portfolio.timeline.length - 1)) * 100}%` }} /></div><div className="timeline">{portfolio.timeline.map((event, index) => <button className={`timeline-item ${activeJourney === index ? "active" : ""}`} key={event.phase} onClick={() => setActiveJourney(index)} onMouseEnter={() => setCursorLabel("OPEN")} onMouseLeave={() => setCursorLabel("")}><span className="timeline-phase">{event.phase}</span><div className="timeline-dot" /><div className="timeline-copy"><span>{event.year} / {event.tag}</span><h3>{event.title}</h3><p>{event.detail}</p><strong>{event.outcome}</strong><small>{event.tools}</small></div><ChevronRight className="timeline-arrow" size={16} /></button>)}</div><div className="journey-readout"><span>ACTIVE MILESTONE</span><strong>0{activeJourney + 1} / {portfolio.timeline[activeJourney].title.toUpperCase()}</strong><i /></div></div></div></section>
  <section className="contact-section section-dark" id="contact"><DataUniverse systemMode={systemMode} /><div className="hero-vignette" /><div className="contact-content"><SectionLabel number="07" label="OPEN CHANNEL" /><h2 className="contact-heading">LET&apos;S BUILD<br /><span>SOMETHING</span><br />MEANINGFUL<span className="accent-text">.</span></h2><p>Have an idea, opportunity,<br />or interesting problem? Let&apos;s talk.</p><a className="button button-primary" href={`mailto:${portfolio.email}`} onMouseEnter={() => setCursorLabel("OPEN")} onMouseLeave={() => setCursorLabel("")}><span>START A CONVERSATION</span><ArrowUpRight size={17} /></a><div className="contact-direct"><a href={`mailto:${portfolio.email}`}><span>EMAIL</span>{portfolio.email}</a><a href={`tel:${portfolio.phone}`}><span>PHONE</span>{portfolio.phone}</a></div></div><div className="contact-links"><a href={portfolio.social.github}><Terminal size={15} /> GITHUB</a><a href={portfolio.social.linkedin}><Network size={15} /> LINKEDIN</a><a href={`mailto:${portfolio.email}`}><Mail size={15} /> EMAIL</a></div></section>
      <footer className="site-footer"><div><strong>{portfolio.name.toUpperCase()}</strong><span>{portfolio.role.toUpperCase()}</span></div><div><span>© 2026</span><button onClick={() => scrollTo("home")}>BACK TO TOP <ArrowUp size={14} /></button></div></footer>
      {systemMode && <div className="system-console"><div><Zap size={15} /> SYSTEM MODE / ACTIVE</div><span>BR_001 :: VISUALIZATION_LAYER</span><span>PACKETS: {String(Math.floor(progress * 42)).padStart(4, "0")}</span><span>PRESS B R TO EXIT / AUTO-OFFLINE IN 07 SEC</span></div>}
    </main>
  );
}
