'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [activeIdx, setActiveIdx] = useState('0');
  const [isScrolled, setIsScrolled] = useState(false);
  const [nameIn, setNameIn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [copied, setCopied] = useState(false);
  const activeIdxRef = useRef('0');

  // Sequential Typewriter States
  const [typedName, setTypedName] = useState('');
  const [nameDone, setNameDone] = useState(false);
  const [typedTagline, setTypedTagline] = useState('');
  const [taglineDone, setTaglineDone] = useState(false);

  // Lightbox Modal Zoom State
  const [zoomedImage, setZoomedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    category: string;
  } | null>(null);

  useEffect(() => {
    // Sequential typewriter: Name types first, then Tagline starts
    const fullName = 'Muqsit Hassan';
    const fullTagline = 'Full Stack Web & Mobile App Developer | REACT & NEXT.JS | AI & Automation Specialist';
    let nameIdx = 0;
    let taglineIdx = 0;
    let nameTimer: ReturnType<typeof setInterval>;
    let taglineTimer: ReturnType<typeof setInterval>;
    let taglineStartDelay: ReturnType<typeof setTimeout>;

    const startDelay = setTimeout(() => {
      nameTimer = setInterval(() => {
        if (nameIdx < fullName.length) {
          setTypedName(fullName.slice(0, nameIdx + 1));
          nameIdx++;
        } else {
          clearInterval(nameTimer);
          setNameDone(true);
          // Pause 350ms, then start typing tagline
          taglineStartDelay = setTimeout(() => {
            taglineTimer = setInterval(() => {
              if (taglineIdx < fullTagline.length) {
                setTypedTagline(fullTagline.slice(0, taglineIdx + 1));
                taglineIdx++;
              } else {
                clearInterval(taglineTimer);
                setTaglineDone(true);
              }
            }, 32);
          }, 350);
        }
      }, 85);
    }, 250);

    // Reveal the name container once on load
    const timer = requestAnimationFrame(() => {
      setNameIn(true);
    });

    let ticking = false;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);

      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = Array.from(document.querySelectorAll<HTMLElement>('.story-section'));
          const viewportCenter = window.innerHeight / 2;
          let closest: HTMLElement | null = null;
          let closestDist = Infinity;

          sections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            const secCenter = rect.top + rect.height / 2;
            const dist = Math.abs(secCenter - viewportCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closest = sec;
            }
          });

          if (closest && (closest as HTMLElement).dataset.idx) {
            const newIdx = (closest as HTMLElement).dataset.idx!;
            if (newIdx !== activeIdxRef.current) {
              activeIdxRef.current = newIdx;
              setActiveIdx(newIdx);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedImage(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();

    return () => {
      cancelAnimationFrame(timer);
      clearTimeout(startDelay);
      if (nameTimer) clearInterval(nameTimer);
      if (taglineStartDelay) clearTimeout(taglineStartDelay);
      if (taglineTimer) clearInterval(taglineTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('muksithassan3@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <>
      {/* Animated Background FX: Aurora Glowing Orbs, Cyber Grid Drift, Starlight Dust & Mouse Glow */}
      <div className="bg-fx" aria-hidden="true">
        <div className="bg-grid"></div>
        <div className="aurora-orb aurora-1"></div>
        <div className="aurora-orb aurora-2"></div>
        <div className="aurora-orb aurora-3"></div>

        {/* Floating dust particles */}
        {[
          { left: '8%', size: 3, delay: '0s', duration: '12s' },
          { left: '18%', size: 2, delay: '2s', duration: '15s' },
          { left: '27%', size: 4, delay: '5s', duration: '18s' },
          { left: '38%', size: 2.5, delay: '1s', duration: '13s' },
          { left: '49%', size: 3.5, delay: '4s', duration: '16s' },
          { left: '62%', size: 2, delay: '7s', duration: '14s' },
          { left: '73%', size: 4, delay: '3s', duration: '19s' },
          { left: '84%', size: 2.5, delay: '6s', duration: '12s' },
          { left: '92%', size: 3, delay: '8s', duration: '17s' },
        ].map((p, i) => (
          <div
            key={i}
            className="dust-particle"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

        {/* Interactive cursor glow */}
        <div
          className="cursor-glow"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      </div>

      <header id="site-header" className={isScrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <nav aria-label="Primary">
            <div className="brand-wrapper">
              <a className="brand" href="#hero">Muqsit Hassan</a>
              <div className="status-badge">
                <span className="status-dot"></span>
                <span>Available</span>
              </div>
            </div>
            <div className="navlinks">
              <a href="#about" className={activeIdx === '1' ? 'active' : ''}>About</a>
              <a href="#experience" className={activeIdx === '2' ? 'active' : ''}>Experience</a>
              <a href="#work" className={activeIdx === '3' ? 'active' : ''}>Work</a>
              <a href="#contact" className={activeIdx === '4' ? 'active' : ''}>Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Stage layout:
            - Section 0 (Hero): Image Center
            - Section 1 (About): Image Right, Content Left
            - Section 2 (Experience): Image Left (gesturing right), Timeline on Right
            - Section 3 (Work): Image Left (pointing right), Stacking Cards on Right
            - Section 4 (Contact): Image Right, Contact Text on Left
        */}
        <div
          className={`stage ${activeIdx === '1' ? 'about-active' : ''} ${
            activeIdx === '2' ? 'experience-active' : ''
          } ${activeIdx === '3' ? 'work-active' : ''} ${
            activeIdx === '4' ? 'contact-active' : ''
          }`}
        >

          {/* Column 1: Name */}
          <div className="stage-name">
            <div className={`name-inner ${nameIn ? 'in' : ''}`} id="name-inner">
              <h1>
                {typedName}
                {!nameDone && <span className="typewriter-cursor">|</span>}
              </h1>
              <p className="role-tag">FULL STACK DEVELOPER | REACT & NEXT.JS | &amp; AI Specialist</p>
            </div>
          </div>

          {/* Media Stack (Floating High-Res Portraits with Animated Rays & Glow) */}
          <div className="stage-media">
            <div className="media-sticky">
              <div className="glow glow-a" aria-hidden="true"></div>
              <div className="glow glow-b" aria-hidden="true"></div>
              <div className="ray ray1" aria-hidden="true"></div>
              <div className="ray ray2" aria-hidden="true"></div>

              <div className="media-stack">
                {/* 0: Hero Portrait */}
                <img
                  data-idx="0"
                  src="/images/hero.png"
                  alt="Portrait of Muqsit Hassan, standing and facing forward"
                  className={activeIdx === '0' ? 'active' : ''}
                />
                {/* 1: About Portrait (Profile, arms crossed, facing left) */}
                <img
                  data-idx="1"
                  src="/images/about.png"
                  alt="Portrait of Muqsit Hassan in profile, arms crossed, facing left"
                  className={activeIdx === '1' ? 'active' : ''}
                />
                {/* 2: Experience Portrait (Smiling, welcoming gesture) */}
                <img
                  data-idx="2"
                  src="/images/experience.png"
                  alt="Muqsit Hassan gesturing welcomingly towards the experience track record"
                  className={activeIdx === '2' ? 'active' : ''}
                />
                {/* 3: Work Portrait (Pointing rightwards towards portfolio cards) */}
                <img
                  data-idx="3"
                  src="/images/work.png"
                  alt="Muqsit Hassan gesturing and pointing towards the portfolio cards"
                  className={activeIdx === '3' ? 'active' : ''}
                />
                {/* 4: Contact Portrait (Holding phone) */}
                <img
                  data-idx="4"
                  src="/images/contact.png"
                  alt="Muqsit Hassan holding a phone showing his contact details"
                  className={activeIdx === '4' ? 'active' : ''}
                />
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="stage-content">

            {/* Section 1: Hero (Center image, Tagline right with typewriter, Name left) */}
            <section
              className={`story-section hero-line ${activeIdx === '0' ? 'active-text' : ''}`}
              id="hero"
              data-idx="0"
            >
              <p className="tagline">
                {typedTagline}
                {nameDone && <span className="typewriter-cursor">|</span>}
              </p>
            </section>

            {/* Section 2: About Us (Image on Right, Content on Left with centered text) */}
            <section
              className={`story-section about-section ${activeIdx === '1' ? 'active-text' : ''}`}
              id="about"
              data-idx="1"
            >
              <div className="kicker">About Me</div>
              <h2>Engineering Scalable Apps &amp; Intelligent Workflows</h2>
              <p className="lede">
                Full Stack Software Engineer (MERN &amp; React|NEXT JS React Native) with 3+ years of experience delivering scalable web apps, mobile solutions, and automated workflows. Proven background in international logistics, US freight dispatching, and client operations, combining technical skill with strong business communication.
              </p>
            </section>

            {/* Section 3: Experience (NEW! Image on Left gesturing right, Timeline Cards on Right) */}
            <section
              className={`story-section ${activeIdx === '2' ? 'active-text' : ''}`}
              id="experience"
              data-idx="2"
            >
              <div className="kicker">Experience &amp; Track Record</div>
              <h2>A decade of driving real growth</h2>
              <p className="lede">
                Bridging high-level strategy with deep operational execution across hyper-growth tech startups and established enterprises.
              </p>

              {/* Experience Timeline Grid */}
              <div className="experience-timeline">

                {/* Milestone 1: Flesta Pro Remote */}
                <div className="exp-card">
                  <div className="exp-header">
                    <h3 className="exp-role">Middle Full-Stack &amp; AI Engineer</h3>
                    <span className="exp-period">Jul 2024 — Present · 2 yrs 3 mos</span>
                  </div>
                  <div className="exp-company">Flesta Pro Remote · Full-time</div>
                  <div className="exp-location">United States · Remote</div>
                  <ul className="exp-bullets">
                    <li className="exp-bullet">
                      Developed and deployed fault-tolerant backend services using NestJS and TypeScript, integrating AI modules and automated AI agents to optimize business processes.
                    </li>
                    <li className="exp-bullet">
                      Designed scalable logic using cloud-native and serverless architectures (Cloud Code), significantly reducing infrastructure overhead and accelerating real-time data processing.
                    </li>
                    <li className="exp-bullet">
                      Optimized data structures and complex PostgreSQL queries to ensure high system performance under heavy operational loads.
                    </li>
                  </ul>
                  <div className="exp-badges">
                    <span className="exp-badge">Full-Stack Development</span>
                    <span className="exp-badge">Machine Learning</span>
                    <span className="exp-badge">NestJS</span>
                    <span className="exp-badge">TypeScript</span>
                    <span className="exp-badge">PostgreSQL</span>
                    <span className="exp-badge">AI Agents</span>
                  </div>
                </div>

                {/* Milestone 2: Freelance / Contract */}
                <div className="exp-card">
                  <div className="exp-header">
                    <h3 className="exp-role">Full-Stack &amp; Mobile app Dev</h3>
                    <span className="exp-period">Jan 2024 — Jun 2024 · 6 mos</span>
                  </div>
                  <div className="exp-company">Freelance / Contract / Self-Employed · Contract</div>
                  <div className="exp-location">United States · Remote</div>
                  <ul className="exp-bullets">
                    <li className="exp-bullet">
                      Architected a SaaS platform for online booking and business management automation (NinjaOnWheel project).
                    </li>
                    <li className="exp-bullet">
                      Deployed cloud backend services and designed a PostgreSQL schema on Supabase, implementing secure authentication and real-time transaction conflict resolution.
                    </li>
                  </ul>
                  <div className="exp-badges">
                    <span className="exp-badge">Agentic AI</span>
                    <span className="exp-badge">Full-Stack Development</span>
                    <span className="exp-badge">React Native</span>
                    <span className="exp-badge">Supabase</span>
                    <span className="exp-badge">PostgreSQL</span>
                  </div>
                </div>

                {/* Milestone 3: Saylani Mass IT Training (SMIT) */}
                <div className="exp-card">
                  <div className="exp-header">
                    <h3 className="exp-role">MERN Stack Developer Intern</h3>
                    <span className="exp-period">Jul 2023 — Dec 2023 · 6 mos</span>
                  </div>
                  <div className="exp-company">Saylani Mass IT Training (SMIT) · Internship</div>
                  <div className="exp-location">Karachi Division, Sindh, Pakistan · On-site</div>
                  <ul className="exp-bullets">
                    <li className="exp-bullet">
                      Completed an intensive internship focused on building modern web interfaces and backend services.
                    </li>
                  </ul>
                  <div className="exp-badges">
                    <span className="exp-badge">Back-End Web Development</span>
                    <span className="exp-badge">TypeScript</span>
                    <span className="exp-badge">MERN Stack</span>
                    <span className="exp-badge">React.js</span>
                    <span className="exp-badge">Node.js</span>
                  </div>
                </div>

                {/* Milestone 4: tanoli transport */}
                <div className="exp-card">
                  <div className="exp-header">
                    <h3 className="exp-role">US Freight Broker, Dispatcher &amp; Technical Support Specialist</h3>
                    <span className="exp-period">Jan 2021 — Dec 2022 · 2 yrs</span>
                  </div>
                  <div className="exp-company">tanoli transport (US Logistics &amp; Operations)</div>
                  <div className="exp-location">United States · Remote</div>
                  <ul className="exp-bullets">
                    <li className="exp-bullet">
                      Managed dual-role operations as both a US Freight Broker and Load Dispatcher, handling freight negotiations, load matching, and carrier coordination.
                    </li>
                    <li className="exp-bullet">
                      Handled high-volume inbound and outbound client calls while coordinating ISP and internet technical support operations.
                    </li>
                    <li className="exp-bullet">
                      Maintained direct, professional communication with US-based clients and carriers for real-time problem-solving and dispute resolution.
                    </li>
                  </ul>
                  <div className="exp-badges">
                    <span className="exp-badge">US Freight Brokerage</span>
                    <span className="exp-badge">Dispatching</span>
                    <span className="exp-badge">Technical Support</span>
                    <span className="exp-badge">Client Operations</span>
                  </div>
                </div>

              </div>

              {/* Metric Highlights */}
              <div className="exp-stats">
                <div className="exp-stat-box">
                  <div className="exp-stat-num">3+</div>
                  <div className="exp-stat-label">Years of Experience</div>
                </div>
                <div className="exp-stat-box">
                  <div className="exp-stat-num">30+</div>
                  <div className="exp-stat-label">Projects Delivered</div>
                </div>
                <div className="exp-stat-box">
                  <div className="exp-stat-num">100%</div>
                  <div className="exp-stat-label">Job Delivery Rate</div>
                </div>
                <div className="exp-stat-box">
                  <div className="exp-stat-num">99%</div>
                  <div className="exp-stat-label">Client Satisfaction</div>
                </div>
              </div>
            </section>

            {/* Section 4: Work / Portfolio (Image on Left pointing right, Stacking Cards on Right like playing cards) */}
            <section
              className={`story-section ${activeIdx === '3' ? 'active-text' : ''}`}
              id="work"
              data-idx="3"
            >
              <div className="kicker">Selected Projects</div>
              <h2>Featured Engineering Work</h2>
              <p className="lede">
                Production-ready SaaS platforms, enterprise portals, and bespoke web solutions engineered for scalability, peak performance, and business growth.
              </p>

              {/* Stacking Card Deck (Taash ke patton ki tarah ek ke upar ek) */}
              <div className="portfolio-deck">

                {/* Card 1: NinjaOn Wheel */}
                <div className="portfolio-card">
                  <div
                    className="card-image-wrap clickable"
                    onClick={() =>
                      setZoomedImage({
                        src: '/images/ninja-on-wheel.png',
                        alt: 'NinjaOn Wheel — SaaS Scheduling Platform Preview',
                        title: 'NinjaOn Wheel — SaaS Scheduling Platform',
                        category: 'SaaS / Web Application',
                      })
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Click to enlarge NinjaOn Wheel preview"
                  >
                    <img
                      src="/images/ninja-on-wheel.png"
                      alt="NinjaOn Wheel — SaaS Scheduling Platform Preview"
                      loading="lazy"
                    />
                    <div className="zoom-hint">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                      <span>Click to zoom</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <span className="card-tag">SaaS / Web Application · Full Stack</span>
                    <a className="card-live-link" href="https://ninjaonwheel.com/en" target="_blank" rel="noopener noreferrer">
                      <span>Live Site</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </a>
                  </div>
                  <h3>NinjaOn Wheel — SaaS Scheduling Platform</h3>
                  <p>
                    Production-ready SaaS platform for appointment scheduling and business operations. Built a scalable React frontend with Supabase backend, conflict prevention, and PostgreSQL schema deployed on Vercel.
                  </p>
                  <div className="card-features">
                    <strong>Key Features:</strong> Real-time scheduling, Role-based auth, PostgreSQL DB, Responsive dashboard, REST APIs.
                  </div>
                  <div className="card-footer">
                    <span className="card-pill">React.js</span>
                    <span className="card-pill">TypeScript</span>
                    <span className="card-pill">Supabase</span>
                    <span className="card-pill">PostgreSQL</span>
                    <span className="card-pill">Tailwind CSS</span>
                    <span className="card-pill">Vercel</span>
                  </div>
                </div>

                {/* Card 2: HaulSafe */}
                <div className="portfolio-card">
                  <div
                    className="card-image-wrap clickable"
                    onClick={() =>
                      setZoomedImage({
                        src: '/images/haulsafe.png',
                        alt: 'HaulSafe — Insurance Portal Preview',
                        title: 'HaulSafe — Insurance Portal',
                        category: 'Web Application / Logistics',
                      })
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Click to enlarge HaulSafe preview"
                  >
                    <img
                      src="/images/haulsafe.png"
                      alt="HaulSafe — Insurance Portal Preview"
                      loading="lazy"
                    />
                    <div className="zoom-hint">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                      <span>Click to zoom</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <span className="card-tag">Web Application / Logistics · Full Stack</span>
                    <a className="card-live-link" href="https://haulsafe-neon.vercel.app/" target="_blank" rel="noopener noreferrer">
                      <span>Live Site</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </a>
                  </div>
                  <h3>HaulSafe — Insurance Portal</h3>
                  <p>
                    Designed and developed a modern insurance management portal focused on usability, performance, and responsive design. Built reusable React components, implemented secure authentication workflows, and delivered a scalable frontend architecture.
                  </p>
                  <div className="card-features">
                    <strong>Key Features:</strong> Responsive management portal, Secure authentication, Mobile-first UI/UX, Component-based architecture, Performance optimization.
                  </div>
                  <div className="card-footer">
                    <span className="card-pill">React.js</span>
                    <span className="card-pill">TypeScript</span>
                    <span className="card-pill">Supabase</span>
                    <span className="card-pill">Tailwind CSS</span>
                    <span className="card-pill">Vercel</span>
                  </div>
                </div>

                {/* Card 3: Ali Cool Point */}
                <div className="portfolio-card">
                  <div
                    className="card-image-wrap clickable"
                    onClick={() =>
                      setZoomedImage({
                        src: '/images/ali-cool-point.png',
                        alt: 'Ali Cool Point — Commercial Business Website Preview',
                        title: 'Ali Cool Point — Commercial Business Website',
                        category: 'Client Project / Business Website',
                      })
                    }
                    role="button"
                    tabIndex={0}
                    aria-label="Click to enlarge Ali Cool Point preview"
                  >
                    <img
                      src="/images/ali-cool-point.png"
                      alt="Ali Cool Point — Commercial Business Website Preview"
                      loading="lazy"
                    />
                    <div className="zoom-hint">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                      <span>Click to zoom</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <span className="card-tag">Client Project / Business Website</span>
                    <a className="card-live-link" href="https://www.alicoolpoint.com/" target="_blank" rel="noopener noreferrer">
                      <span>Live Site</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </a>
                  </div>
                  <h3>Ali Cool Point — Commercial Business Website</h3>
                  <p>
                    Designed and developed the complete business website from initial planning to production deployment, working directly with the client. Delivered a responsive, SEO-friendly, and performance-optimized platform aligned with the client's brand identity.
                  </p>
                  <div className="card-features">
                    <strong>Key Features:</strong> Complete end-to-end client project, Modern responsive UI, SEO-optimized pages, Production deployment.
                  </div>
                  <div className="card-footer">
                    <span className="card-pill">React.js</span>
                    <span className="card-pill">TypeScript</span>
                    <span className="card-pill">Tailwind CSS</span>
                    <span className="card-pill">JavaScript</span>
                    <span className="card-pill">Vercel</span>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 5: Contact (Image on Right, Content on Left with centered text/actions) */}
            <section
              className={`story-section contact-section ${activeIdx === '4' ? 'active-text' : ''}`}
              id="contact"
              data-idx="4"
            >
              <div className="kicker">Contact</div>
              <h2>Let's talk</h2>
              <p className="lede">
                Have a project in mind, or just want to say hello? I'd love to hear from you.
              </p>
              <div className="contact-actions">
                <a className="btn" href="mailto:muksithassan3@gmail.com">Email me</a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                >
                  {copied ? '✓ Copied!' : 'Copy Email'}
                </button>
                <div className="contact-detail">
                  Phone
                  <span>
                    <a href="tel:+92303404564">+92 303 404564</a>
                  </span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          © 2026 Muqsit Hassan. All rights reserved.
        </div>
      </footer>

      {/* Fullscreen Image Lightbox Modal */}
      {zoomedImage && (
        <div
          className="image-lightbox-overlay"
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="image-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="image-lightbox-header">
              <div>
                <span className="image-lightbox-badge">{zoomedImage.category}</span>
                <h3 className="image-lightbox-title">{zoomedImage.title}</h3>
              </div>
              <button
                type="button"
                className="image-lightbox-close"
                onClick={() => setZoomedImage(null)}
                aria-label="Close zoomed image"
              >
                ✕
              </button>
            </div>
            <div className="image-lightbox-body">
              <img src={zoomedImage.src} alt={zoomedImage.alt} />
            </div>
            <div className="image-lightbox-footer">
              <span className="image-lightbox-tip">Tip: Press ESC or click anywhere outside to close</span>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                onClick={() => setZoomedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
