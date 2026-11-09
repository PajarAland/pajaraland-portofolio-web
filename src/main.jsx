import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import headshot from './assets/Fajar_Headshot.jpg';
import shelfDashboard from './assets/ShelfLink_Dashboard.png';
import shelfCatalog from './assets/ShelfLink_Catalog.png';
import shelfReturns from './assets/ShelfLink_ReturnManagement.png';

import dcHome from './assets/DiagramCoffee_CustHome.png';
import dcProduct from './assets/DiagramCoffee_Product.png';
import dcCheckout from './assets/DiagramCoffee_Checkout.png';
import dcXendit from './assets/DiagramCoffee_Xendit.png';
import dcOrderMonitor from './assets/DiagramCoffee_OrderMonitorStaff.png';
import dcEditProduct from './assets/DiagramCoffee_EditProduct.png';

const projects = [
  {
    number: '01', name: 'DiagramCoffee', type: 'E-COMMERCE PLATFORM', featured: true,
    description: 'A coffee shop platform bringing together menu discovery, personalized recommendations, customer ordering, and branch administration.',
    contribution: 'Frontend development and integration across the customer and admin experience. Also used as the subject of my Test-Driven Development research.',
    stack: ['React.js', 'Vite', 'Laravel', 'Flask', 'MySQL', 'Vitest'],
    note: 'Featured project · Academic capstone',
    screenshots: [dcHome, dcProduct, dcCheckout, dcXendit, dcOrderMonitor, dcEditProduct],
  },
  {
    number: '02', name: 'e-Laman Hati', type: 'REST API DEVELOPMENT',
    description: 'A service platform project developed during an internship, with the Bandung government as the client. The project involved building REST API modules to support a Flutter mobile application and web platform.',
    contribution: 'Backend development of REST API modules at CoE CAATIS, Telkom University.',
    stack: ['Laravel', 'REST API', 'MySQL', 'Postman'],
    note: 'Internship project · CAATIS Telkom University'
  },
  {
    number: '03', name: 'ShelfLink', type: 'WEB APPLICATION',
    description: 'A web-based book management application built as a collaborative project.',
    contribution: 'Worked on authentication, CRUD functionality, and project management.',
    stack: ['Laravel 12', 'Breeze', 'MySQL', 'Docker'],
    note: 'Collaborative project',
    screenshots: [shelfDashboard, shelfCatalog, shelfReturns],
  },
  {
    number: '04', name: 'StudyIT', type: 'FULL-STACK APPLICATION',
    description: 'A online learning platform built as a collaborative project.',
    contribution: 'Worked on frontend and backend development.',
    stack: ['Laravel', 'MySQL', 'Flutter', 'Express.js'],
    note: 'Team project'
  }
];

const skillGroups = [
  { title: 'Frontend', items: ['React.js', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'Vite'] },
  { title: 'Backend', items: ['Laravel', 'PHP', 'Express.js', 'Flask'] },
  { title: 'Database', items: ['MySQL'] },
  { title: 'Tools & Practices', items: ['Git & GitHub', 'Docker', 'Postman', 'Vitest', 'Testing Library', 'SonarQube'] }
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function SectionLabel({ children }) {
  return <div className="section-label"><span className="label-line" />{children}</div>;
}

function Lightbox({ screenshots, projectName, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = useCallback(() => setIdx(i => (i - 1 + screenshots.length) % screenshots.length), [screenshots.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % screenshots.length), [screenshots.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${projectName} screenshot lightbox`}>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">✕</button>
        <img src={screenshots[idx]} alt={`${projectName} screenshot ${idx + 1} of ${screenshots.length}`} className="lightbox-img" />
        {screenshots.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous screenshot">‹</button>
            <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next screenshot">›</button>
            <div className="lightbox-dots">
              {screenshots.map((_, i) => <i key={i} className={i === idx ? 'active' : ''} />)}
            </div>
          </>
        )}
        <div className="lightbox-counter">{idx + 1} / {screenshots.length}</div>
      </div>
    </div>
  );
}

function ScreenshotSlider({ screenshots, projectName }) {
  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + screenshots.length) % screenshots.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % screenshots.length); };
  return (
    <>
      <div className="screenshot-slider" aria-label={`${projectName} screenshot preview`}>
        <button
          className="slider-img-btn"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Expand ${projectName} screenshot`}
          title="Click to expand"
        >
          <img src={screenshots[idx]} alt={`${projectName} screenshot ${idx + 1}`} />
          <span className="expand-hint" aria-hidden="true">⤢</span>
        </button>
        {screenshots.length > 1 && (
          <div className="slider-controls">
            <button onClick={prev} aria-label="Previous screenshot">‹</button>
            <span className="slider-dots">
              {screenshots.map((_, i) => <i key={i} className={i === idx ? 'active' : ''} />)}
            </span>
            <button onClick={next} aria-label="Next screenshot">›</button>
          </div>
        )}
      </div>
      {lightboxOpen && (
        <Lightbox
          screenshots={screenshots}
          projectName={projectName}
          startIdx={idx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const closeMenu = () => setMenuOpen(false);


  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" onClick={closeMenu}>FJR<span>.</span></a>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'CLOSE' : 'MENU'}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {[['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Experience', '#experience']].map(([label, href]) =>
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          )}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <Arrow diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="pulse" /> OPEN TO DEVELOPER OPPORTUNITIES</div>
            <p className="eyebrow">SOFTWARE DEVELOPER <span>·</span> BANDUNG, INDONESIA</p>
            <h1>Turning ideas<br />into <em>working</em><br />software<span className="accent">.</span></h1>
            <p className="hero-intro">Hi, I'm <strong>Fajar Jelang Ramadhan</strong> — a software developer with experience building web applications, backend services, and practical digital solutions.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <Arrow diagonal /></a>
              <a className="text-link" href="#contact">Get in touch <Arrow /></a>
            </div>
            <div className="hero-meta"><span>REACT</span><i /> <span>LARAVEL</span><i /> <span>MYSQL</span><i /> <span>AND MORE</span></div>
          </div>
          <div className="hero-visual" aria-label="Abstract decorative developer graphic">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-center"><img src={headshot} alt="Fajar Jelang Ramadhan" className="headshot-img" /></div>
            <div className="float-card card-top"><span className="tiny-dot" /> AVAILABLE TO BUILD</div>
            <div className="float-card card-bottom"><span className="mono">01—04</span><span>SELECTED PROJECTS</span></div>
            <span className="visual-cross cross-one">+</span><span className="visual-cross cross-two">+</span>
          </div>
          <a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="intro-strip"><div className="strip-inner"><span>CURIOUS BY NATURE</span><b>✳</b><span>BUILT THROUGH PRACTICE</span><b>✳</b><span>ALWAYS LEARNING</span><b>✳</b><span>FOCUSED ON THE DETAILS</span></div></section>

        <section className="section-wrap about-section" id="about">
          <div className="section-heading"><SectionLabel>01 / ABOUT ME</SectionLabel><h2>Developer mindset.<br /><em>Practical</em> execution.</h2></div>
          <div className="about-grid">
            <div className="about-main"><p className="large-copy">I enjoy turning complex requirements into applications that are useful, maintainable, and straightforward to work with.</p><p>My experience spans frontend interfaces and backend development. I've worked with React and Laravel, built REST APIs, collaborated on team projects, and explored software quality through automated testing and code analysis.</p><p>I'm open to developer opportunities where I can contribute, keep learning, and grow alongside a team.</p></div>
            <div className="about-facts">
              <div className="fact"><span className="fact-number">3.76</span><span className="fact-label">GPA · TELKOM UNIVERSITY</span></div>
              <div className="fact"><span className="fact-number">04</span><span className="fact-label">PROJECTS HIGHLIGHTED</span></div>
              <div className="fact"><span className="fact-number">02</span><span className="fact-label">INTERNSHIP EXPERIENCES</span></div>
              <div className="fact-note">Software Engineering<br />Telkom University</div>
            </div>
          </div>
        </section>

        <section className="skills-section" id="skills"><div className="section-wrap"><div className="section-heading"><SectionLabel>02 / TOOLKIT</SectionLabel><h2>Tools I work <em>with.</em></h2><p className="section-description">A practical toolkit built through coursework, internships, and hands-on projects.</p></div><div className="skills-grid">{skillGroups.map((group, i) => <article className="skill-group" key={group.title}><span className="skill-index">0{i + 1}</span><h3>{group.title}</h3><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div></div></section>

        <section className="section-wrap projects-section" id="projects"><div className="projects-top"><div className="section-heading"><SectionLabel>03 / SELECTED WORK</SectionLabel><h2>Things I've <em>built.</em></h2></div><p className="section-description">A selection of academic, collaborative, and professional work. Each project represents a different part of my development experience.</p></div>
          <div className="project-list">{projects.map(project => <article className={project.featured ? 'project-card featured' : 'project-card'} key={project.name}>
            <div className="project-number">{project.number}</div>
            <div className="project-content"><div className="project-type">{project.type}{project.featured && <span className="featured-tag">FEATURED</span>}</div><h3>{project.name}</h3><p>{project.description}</p><div className="project-stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
              <button className="details-toggle" onClick={() => setExpanded(expanded === project.name ? null : project.name)} aria-expanded={expanded === project.name}>{expanded === project.name ? 'Hide contribution' : 'View my contribution'} <span>{expanded === project.name ? '−' : '+'}</span></button>
              {expanded === project.name && <div className="project-details"><strong>MY ROLE</strong><p>{project.contribution}</p><span>{project.note}</span></div>}
            </div>
            {project.screenshots
              ? <ScreenshotSlider screenshots={project.screenshots} projectName={project.name} />
              : <div className="project-art" aria-hidden="true"><div className="art-window"><div className="window-bar"><i/><i/><i/></div><div className="art-content"><span className="art-kicker">{project.number} / PROJECT</span><div className="art-title-line"/><div className="art-title-line short"/><div className="art-blocks"><i/><i/><i/></div><div className="art-footer-line"/></div></div><span className="art-orbit"/></div>}
          </article>)}</div>
        </section>

        <section className="experience-section" id="experience"><div className="section-wrap"><div className="section-heading"><SectionLabel>04 / EXPERIENCE & EDUCATION</SectionLabel><h2>Where I've <em>grown.</em></h2></div><div className="timeline">
          <article className="timeline-item"><div className="timeline-date">APR — JUL 2026</div><div className="timeline-body"><span className="timeline-kind">Client-Based Thesis Project</span><h3>Frontend Web Developer</h3><h4>Diagram Coffee · Bandung</h4><p>Developed and integrated the frontend components for a client-based thesis project using React + Vite.</p></div></article>
          <article className="timeline-item"><div className="timeline-date">JUL — SEP 2025</div><div className="timeline-body"><span className="timeline-kind">INTERNSHIP</span><h3>Full-Stack Web Developer</h3><h4>Telkom Indonesia · Bandung</h4><p>Contributed to a confidential project as a full-stack web developer.</p></div></article>
          <article className="timeline-item"><div className="timeline-date">MAY — JUL 2025</div><div className="timeline-body"><span className="timeline-kind">INTERNSHIP</span><h3>Backend Developer</h3><h4>CoE CAATIS, Telkom University · Bandung</h4><p>Developed backend functionality for a Flutter mobile application and web platform using Laravel and MySQL.</p></div></article>
          {/* <article className="timeline-item"><div className="timeline-date">2026</div><div className="timeline-body"><span className="timeline-kind">EDUCATION</span><h3>S1 Rekayasa Perangkat Lunak</h3><h4>Telkom University</h4><p>GPA: 3.76</p></div></article>
          <article className="timeline-item"><div className="timeline-date">2022</div><div className="timeline-body"><span className="timeline-kind">EDUCATION</span><h3>MIPA</h3><h4>MAN 2 Kota Bogor</h4></div></article> */}
        </div></div></section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><SectionLabel>05 / GET IN TOUCH</SectionLabel><p className="contact-kicker">HAVE A ROLE, PROJECT, OR IDEA?</p><h2>Let's make<br /><em>something</em> work.</h2><a className="contact-email" href="mailto:jihonsky@gmail.com">jihonsky@gmail.com <Arrow diagonal /></a><div className="contact-bottom"><span>BASED IN BANDUNG, INDONESIA</span><span>OPEN TO DEVELOPER OPPORTUNITIES</span></div></div></section>
      </main>
      <footer className="footer"><a className="wordmark" href="#home">FJR<span>.</span></a><span>DESIGNED & BUILT WITH CARE · 2026</span><a href="#home">BACK TO TOP ↑</a></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
