import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { ContactModal } from './components/ContactModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { projects } from './data.js';

const ease = [0.16, 1, 0.3, 1];

function useSmoothAnchor() {
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
}

function Header({ compact = false }) {
  const navigate = useNavigate();
  const goHome = () => {
    if (document.startViewTransition) document.startViewTransition(() => navigate('/'));
    else navigate('/');
  };
  const openContact = useContext(ContactContext);
  return (
    <header className={`site-header ${compact ? 'site-header--compact' : ''}`}>
      <button className="brand-mini" onClick={goHome} aria-label="AIGES home">
        <img src="/logo.png" alt="AIGES" style={{ height: '14px' }} />
      </button>
      <div className="header-actions">
        <a className="circle-link" href="https://www.instagram.com/aiges.studio" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={14} /></a>
        <a className="circle-link" href="https://www.linkedin.com/in/%D0%B7%D0%B0%D1%80%D0%B8%D0%BD%D0%B0-%D1%81%D0%B5%D1%80%D0%B8%D0%BC%D0%B1%D0%B5%D1%82%D0%BE%D0%B2%D0%B0-2507b142a/?skipRedirect=true" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={14} /></a>
        <a className="circle-link" href="#" onClick={(e) => { e.preventDefault(); openContact(); }} aria-label="Email"><Mail size={14} strokeWidth={1.5} /></a>
        <a className="pill pill--light" href="#" onClick={(e) => { e.preventDefault(); openContact(); }}>GET IN TOUCH</a>
      </div>
    </header>
  );
}

function Reveal({ children, className = '', delay = 0, y = 34 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const heroTiles = [
  ['visual-a', '01'],
  ['visual-b', '02'],
  ['visual-mark', ''],
  ['visual-c', '03'],
  ['visual-d', '04'],
];

function Visual({ type, className = '', original = false }) {
  if (type === 'visual-mark') {
    return (
      <div className={`visual ${type} ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none' }}>
        <img src="/logo-a.png" alt="Icon" style={{ width: '120px', height: 'auto', objectFit: 'contain' }} />
      </div>
    );
  }

  const darMap = {
    'visual-a': '/projects/dar-1.png',
    'visual-b': '/projects/jaryq-1.png',
    'visual-c': '/projects/woman-1.png',
    'visual-d': '/projects/manharrdy-1.png'
  };

  const origMap = {
    'visual-a': '/projects/1.png',
    'visual-b': '/projects/2.png',
    'visual-c': '/projects/3.png',
    'visual-d': '/projects/4.png'
  };

  const imageMap = original ? origMap : darMap;

  return (
    <div 
      className={`visual ${type} ${className}`} 
      style={{ 
        backgroundImage: `url(${imageMap[type] || (original ? '/projects/1.png' : '/projects/dar-1.png')})`, 
        backgroundSize: 'cover', 
        backgroundPosition: original ? 'center' : 'top center' 
      }}
    />
  );
}

function Home() {
  useSmoothAnchor();
  const navigate = useNavigate();
  const goProject = (project) => {
    const go = () => navigate(`/projects/${project.slug}`);
    if (document.startViewTransition) document.startViewTransition(go);
    else go();
  };
  const openContact = useContext(ContactContext);
  return (
    <main className="page page--dark">
      <Header />

      <section className="hero shell" id="top">
        <nav className="hero-kicker-row" aria-label="Capabilities">
          <span>( STRATEGY )</span><span>( DESIGN )</span><span>( TECHNOLOGY )</span><span>( AUTOMATION )</span><span>( AI )</span>
        </nav>

        <div className="hero-title-wrap">
          <motion.h1
            className="hero-title"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease }}
          >
            AIGES &nbsp;STUDIO<sup>®</sup>
          </motion.h1>
        </div>

        <motion.div className="hero-tiles" initial="hidden" animate="show" variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
        }}>
          {heroTiles.map(([type, label], i) => (
            <motion.div
              className={`hero-tile hero-tile--${i + 1}`}
              key={type}
              variants={{ hidden: { opacity: 0, y: 50, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ duration: 0.8, ease }}
              whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }}
            >
              <Visual type={type} original={true} />
              <span className="tile-label">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="hero-statement-grid">
          <Reveal delay={0.15}>
            <p className="micro-label">01 / WHO WE ARE</p>
          </Reveal>
          <Reveal className="hero-statement" delay={0.25}>
            <p className="statement-large"><span className="muted">We build</span> digital products<br />that connect <span className="accent-text">strategy</span>, design<br />and technology.</p>
            <p className="statement-small">AIGES works with businesses that need a stronger digital product, a clearer interface and technology that can scale with growth.</p>
            <a className="pill pill--light" href="#" onClick={(e) => { e.preventDefault(); openContact(); }}><span>START A PROJECT</span> <ArrowRight size={16} strokeWidth={1.5} /></a>
          </Reveal>
        </div>
      </section>

      <section className="projects shell" id="projects">
        <Reveal className="section-heading split-heading">
          <h2>SELECTED<br />PROJECTS<sup>©</sup></h2>
          <span>(2024/26)</span>
        </Reveal>

        <div className="project-grid">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.05}>
              <button className="project-card" onClick={() => goProject(project)}>
                <div className="project-card-meta">
                  <span>( {project.meta} )</span>
                  <span>...{project.year}</span>
                </div>
                <div className="project-image" style={{ viewTransitionName: `project-${project.slug}` }}>
                  <Visual type={project.visual} />
                  <div className="project-card-name">{project.name}</div>
                  <span className="project-arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="success shell">
        <Reveal className="section-heading success-title">
          <h2>WHY<br />AIGES</h2>
          <div className="avatar-stack" aria-hidden="true"><i/><i/><i/><b>+25</b></div>
        </Reveal>

        <div className="success-grid">
          <div className="testimonial-grid">
            <Reveal className="testimonial-card">
              <div className="rating">★★★★★ <span>4.9/5</span></div>
              <p>“From strategy to implementation — one team, one system and one responsibility zone.”</p>
              <div className="person"><i className="avatar"/><div><strong>ONE TEAM</strong><small>Strategy / Design / Development</small></div></div>
            </Reveal>
            <Reveal className="testimonial-card" delay={0.07}>
              <div className="rating">★★★★★ <span>5.0/5</span></div>
              <p>“We start with the business problem, not with effects, trends or a pre-made template.”</p>
              <div className="person"><i className="avatar avatar--two"/><div><strong>BUSINESS FIRST</strong><small>Product thinking / measurable outcome</small></div></div>
            </Reveal>
          </div>

          <div className="metrics">
            <Reveal className="metric"><strong>3</strong><span>Core directions<br /><small>Design / Development / Automation</small></span></Reveal>
            <Reveal className="metric" delay={0.07}><strong>01</strong><span>Integrated workflow<br /><small>From idea to production</small></span></Reveal>
          </div>
        </div>
      </section>

      <section className="floating-cta shell" id="contact">
        <div className="floating-visual floating-visual--1"><Visual type="visual-a" original={true} /></div>
        <div className="floating-visual floating-visual--2"><Visual type="visual-c" original={true} /></div>
        <div className="floating-visual floating-visual--3"><Visual type="visual-b" original={true} /></div>
        <div className="floating-visual floating-visual--4"><Visual type="visual-d" original={true} /></div>
        <span className="cta-spark">✦</span>
        <Reveal className="cta-copy">
          <h2>LET'S BUILD<br /><span>YOUR DIGITAL PRODUCT</span></h2>
          <a className="pill pill--light" href="mailto:hello@aiges.kz"><span>START PROJECT</span> <ArrowRight size={16} strokeWidth={1.5} /></a>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  const openContact = useContext(ContactContext);
  return (
    <footer className="site-footer shell" id="contact">
      <div className="footer-card">
        <div>
          <div className="brand-mini"><img src="/logo.png" alt="AIGES" style={{ height: '14px', filter: 'brightness(10)' }} /></div>
          <p>Digital products through strategy,<br />design and technology.</p>
          <a href="#" onClick={(e) => { e.preventDefault(); openContact(); }}>hello@aiges.kz</a>
          <div className="footer-socials"><span aria-label="Instagram"><FaInstagram size={14} /></span><span aria-label="LinkedIn"><FaLinkedinIn size={14} /></span></div>
        </div>
        <a className="pill pill--light" href="#" onClick={(e) => { e.preventDefault(); openContact(); }}><span>START PROJECT</span> <ArrowRight size={16} strokeWidth={1.5} /></a>
        <div className="footer-bottom"><span>AIGES / DIGITAL STUDIO / ALMATY</span><span>Built with React</span></div>
      </div>
    </footer>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);

  const goProject = (target) => {
    const go = () => navigate(`/projects/${target.slug}`);
    if (document.startViewTransition) document.startViewTransition(go);
    else go();
  };

  return (
    <main className="page page--dark project-page">
      <Header compact />

      <section className="case-hero shell">
        <div className="case-kicker"><span>✦ PROJECT {project.index}</span><span>{project.meta}</span><span>...{project.year}</span></div>
        <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease }}>
          {project.name}<sup>©</sup>
        </motion.h1>
        <div className="case-cover" style={{ viewTransitionName: `project-${project.slug}` }}>
          <Visual type={project.visual} />
          <span className="scroll-cue">SCROLL TO EXPLORE <ArrowDown size={14} strokeWidth={1.5} /></span>
        </div>
      </section>

      <section className="case-intro shell">
        <div className="case-meta-list">
          <div><span>INDUSTRY</span><strong>{project.industry}</strong></div>
          <div><span>YEAR</span><strong>{project.year}</strong></div>
          <div><span>SERVICES</span><strong>{project.services}</strong></div>
        </div>
        <Reveal className="case-intro-copy"><span className="micro-label">01 / OVERVIEW</span><p>{project.intro}</p></Reveal>
      </section>

      <section className="case-block shell">
        <Reveal className="case-section-title"><span>02 / CHALLENGE</span><h2>THE<br />CHALLENGE<sup>©</sup></h2></Reveal>
        <Reveal className="case-copy"><p>{project.challenge}</p></Reveal>
      </section>

      <section className="visual-story shell">
        {project.slug === 'ma-store' ? (
          <div className="custom-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
            <Reveal><img src="/projects/dar-1.png" style={{ width: '100%', borderRadius: '24px' }} alt="Screenshot 1" /></Reveal>
            <Reveal><img src="/projects/dar-2.png" style={{ width: '100%', borderRadius: '24px' }} alt="Screenshot 2" /></Reveal>
            <Reveal><img src="/projects/dar-3.png" style={{ width: '100%', borderRadius: '24px' }} alt="Screenshot 3" /></Reveal>
            <Reveal><img src="/projects/dar-4.png" style={{ width: '100%', borderRadius: '24px' }} alt="Screenshot 4" /></Reveal>
            <Reveal><img src="/projects/dar-5.png" style={{ width: '100%', borderRadius: '24px' }} alt="Screenshot 5" /></Reveal>
          </div>
        ) : project.slug === 'jaryq-home' ? (
          <div className="custom-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
            <Reveal><img src="/projects/jaryq-1.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq Screenshot 1" /></Reveal>
            <Reveal><img src="/projects/jaryq-2.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq Screenshot 2" /></Reveal>
            <Reveal><img src="/projects/jaryq-3.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq Screenshot 3" /></Reveal>
            <Reveal><img src="/projects/jaryq-4.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq Screenshot 4" /></Reveal>
          </div>
        ) : project.slug === 'woman-create' ? (
          <div className="custom-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
            <Reveal><img src="/projects/woman-1.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate Screenshot 1" /></Reveal>
            <Reveal><img src="/projects/woman-2.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate Screenshot 2" /></Reveal>
            <Reveal><img src="/projects/woman-3.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate Screenshot 3" /></Reveal>
            <Reveal><img src="/projects/woman-4.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate Screenshot 4" /></Reveal>
            <Reveal><img src="/projects/woman-5.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate Screenshot 5" /></Reveal>
          </div>
        ) : project.slug === 'manharrdy' ? (
          <div className="custom-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
            <Reveal><img src="/projects/manharrdy-1.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy Screenshot 1" /></Reveal>
            <Reveal><img src="/projects/manharrdy-2.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy Screenshot 2" /></Reveal>
            <Reveal><img src="/projects/manharrdy-3.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy Screenshot 3" /></Reveal>
            <Reveal><img src="/projects/manharrdy-4.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy Screenshot 4" /></Reveal>
            <Reveal><img src="/projects/manharrdy-5.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy Screenshot 5" /></Reveal>
          </div>
        ) : (
          <>
            <Reveal className="story-wide"><Visual type={project.visual} /></Reveal>
            <div className="story-duo">
              <Reveal><Visual type={projects[(index + 1) % projects.length].visual} /></Reveal>
              <Reveal delay={0.06}><Visual type={projects[(index + 2) % projects.length].visual} /></Reveal>
            </div>
          </>
        )}
      </section>

      <section className="case-block shell solution-section">
        <Reveal className="case-section-title"><span>03 / SOLUTION</span><h2>OUR<br />SOLUTION<sup>©</sup></h2></Reveal>
        <div className="solution-list">
          {project.solution.map(([title, text], i) => (
            <Reveal className="solution-row" key={title} delay={i * 0.05}>
              <span>0{i + 1}</span><strong>{title}</strong><p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="case-outcomes shell">
        <Reveal className="case-section-title"><span>04 / OUTCOME</span><h2>PROJECT<br />OUTCOMES<sup>©</sup></h2></Reveal>
        <div className="outcomes-grid">
          {project.outcomes.map((item, i) => <Reveal className="outcome" key={item} delay={i * .05}><span>0{i + 1}</span><strong>{item}</strong></Reveal>)}
        </div>
      </section>

      <section className="next-project shell">
        <Reveal className="next-label"><span>✦ EXPLORE NEXT</span><button onClick={() => navigate('/')}><ArrowLeft size={15} strokeWidth={1.5} /> <span>ALL PROJECTS</span></button></Reveal>
        <button className="next-project-card" onClick={() => goProject(next)}>
          <div className="next-title"><span>NEXT</span><strong>{next.name}<sup>©</sup></strong><em>{next.index} / 04</em></div>
          <div className="next-image" style={{ viewTransitionName: `project-${next.slug}` }}><Visual type={next.visual}/><span className="project-arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span></div>
        </button>
      </section>

      <Footer />
    </main>
  );
}

export const ContactContext = createContext();

function App() {
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <ContactContext.Provider value={() => setContactOpen(true)}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </AnimatePresence>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </ContactContext.Provider>
  );
}

export default App;
