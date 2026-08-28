import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import React, { useEffect, useState, createContext, useContext } from 'react';
import { ContactModal } from './components/ContactModal';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { projects } from './data.js';
import { LanguageContext, useLanguage, t } from './i18n.js';

const ease = [0.16, 1, 0.3, 1];
const easeOut = [0.0, 0.0, 0.2, 1];

// Stagger container variants
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease } },
};

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
  const { lang, setLang } = useLanguage();
  return (
    <motion.header
      className={`site-header ${compact ? 'site-header--compact' : ''}`}
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
    >
      <button className="brand-mini" onClick={goHome} aria-label="AIGES home">
        <img src="/logo.png" alt="AIGES" style={{ height: '14px' }} />
      </button>
      <motion.div
        className="header-actions"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.a variants={fadeIn} className="circle-link" href="https://www.instagram.com/aiges.studio" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={14} /></motion.a>
        <motion.a variants={fadeIn} className="circle-link" href="https://www.linkedin.com/in/%D0%B7%D0%B0%D1%80%D0%B8%D0%BD%D0%B0-%D1%81%D0%B5%D1%80%D0%B8%D0%BC%D0%B1%D0%B5%D1%82%D0%BE%D0%B2%D0%B0-2507b142a/?skipRedirect=true" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={14} /></motion.a>
        <motion.a variants={fadeIn} className="circle-link" href="#" onClick={(e) => { e.preventDefault(); openContact(); }} aria-label="Email"><Mail size={14} strokeWidth={1.5} /></motion.a>
        <motion.button variants={fadeIn} className="lang-toggle" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} aria-label="Switch language">{lang === 'ru' ? 'EN' : 'RU'}</motion.button>
        <motion.a variants={fadeUp} className="pill pill--light" href="#" onClick={(e) => { e.preventDefault(); openContact(); }}>{t(lang, 'getInTouch')}</motion.a>
      </motion.div>
    </motion.header>
  );
}

function Reveal({ children, className = '', delay = 0, y = 36 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px -6% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
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
    'visual-d': '/projects/manharrdy-1.png',
  };

  const origMap = {
    'visual-a': '/projects/1.png',
    'visual-b': '/projects/2.png',
    'visual-c': '/projects/3.png',
    'visual-d': '/projects/4.png',
  };

  const imageMap = original ? origMap : darMap;

  return (
    <div
      className={`visual ${type} ${className}`}
      style={{
        backgroundImage: `url(${imageMap[type] || (original ? '/projects/1.png' : '/projects/dar-1.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: original ? 'center' : 'top center',
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
  const { lang } = useLanguage();
  const caps = t(lang, 'heroCaps');

  // Scroll-driven parallax for hero title
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 500], [0, -80]);
  const titleY = useSpring(rawY, { stiffness: 80, damping: 25 });
  const titleOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  return (
    <motion.main
      className="page page--dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Header />

      <section className="hero shell" id="top">
        {/* Kicker row — stagger in */}
        <motion.nav
          className="hero-kicker-row"
          aria-label="Capabilities"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {caps.map((c) => (
            <motion.span key={c} variants={fadeUp}>{c}</motion.span>
          ))}
        </motion.nav>

        {/* Hero title with parallax + blur entry */}
        <div className="hero-title-wrap">
          <motion.h1
            className="hero-title"
            style={{ y: titleY, opacity: titleOpacity }}
            initial={{ y: 100, opacity: 0, filter: 'blur(12px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease }}
          >
            AIGES &nbsp;STUDIO
          </motion.h1>
        </div>

        {/* Hero tiles — stagger with scale + blur */}
        <motion.div
          className="hero-tiles"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
        >
          {heroTiles.map(([type, label], i) => (
            <motion.div
              className={`hero-tile hero-tile--${i + 1}`}
              key={type}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.92, filter: 'blur(8px)' },
                show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
                rotate: i % 2 ? 1.8 : -1.8,
                transition: { duration: 0.35, ease: easeOut },
              }}
            >
              <Visual type={type} original={true} />
              <span className="tile-label">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero statement — stagger */}
        <motion.div
          className="hero-statement-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <motion.div variants={fadeUp}>
            <p className="micro-label">{t(lang, 'heroWhoWeAre')}</p>
          </motion.div>
          <motion.div className="hero-statement" variants={fadeUp}>
            <p className="statement-large">
              <span className="muted">{t(lang, 'heroStatementPre')}</span> {t(lang, 'heroStatementMid')}<br />
              {t(lang, 'heroStatementLine2Pre')} <span className="accent-text">{t(lang, 'heroStatementAccent')}</span>{t(lang, 'heroStatementLine2Post')}<br />
              {t(lang, 'heroStatementLine3')}
            </p>
            <p className="statement-small">{t(lang, 'heroSmall')}</p>
            <motion.a
              className="pill pill--light"
              href="#"
              onClick={(e) => { e.preventDefault(); openContact(); }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <span>{t(lang, 'heroCtaStart')}</span> <ArrowRight size={16} strokeWidth={1.5} />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects — each card animates in */}
      <section className="projects shell" id="projects">
        <Reveal className="section-heading split-heading">
          <h2>{lang === 'ru' ? 'ИЗБРАННЫЕ' : 'SELECTED'}<br />{lang === 'ru' ? 'ПРОЕКТЫ' : 'PROJECTS'}<sup>©</sup></h2>
          <span>(2024/26)</span>
        </Reveal>
        <motion.div
          className="project-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-6% 0px' }}
        >
          {projects.map((project, i) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <motion.button
                className="project-card"
                onClick={() => goProject(project)}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <div className="project-card-meta">
                  <span>( {project.meta} )</span>
                  <span>...{project.year}</span>
                </div>
                <motion.div
                  className="project-image"
                  style={{ viewTransitionName: `project-${project.slug}` }}
                  variants={{
                    rest: { borderRadius: '42px' },
                    hover: { borderRadius: '28px', y: -6, scale: 1.008, transition: { duration: 0.45, ease: easeOut } },
                  }}
                >
                  <Visual type={project.visual} />
                  <div className="project-card-name">{project.name}</div>
                  <motion.span
                    className="project-arrow"
                    variants={{
                      rest: { scale: 1, rotate: 0 },
                      hover: { scale: 1.12, rotate: 12, transition: { duration: 0.3 } },
                    }}
                  >
                    <ArrowUpRight size={18} strokeWidth={1.6} />
                  </motion.span>
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="success shell">
        <Reveal className="section-heading success-title">
          <h2>{lang === 'ru' ? 'ПОЧЕМУ' : 'WHY'}<br />AIGES</h2>
          <div className="avatar-stack" aria-hidden="true"><i /><i /><i /><b>+25</b></div>
        </Reveal>
        <div className="success-grid">
          <div className="testimonial-grid">
            <Reveal className="testimonial-card">
              <div className="rating">★★★★★ <span>4.9/5</span></div>
              <p>{t(lang, 'testimonial1')}</p>
              <div className="person"><i className="avatar" /><div><strong>{t(lang, 'testimonial1Title')}</strong><small>{t(lang, 'testimonial1Sub')}</small></div></div>
            </Reveal>
            <Reveal className="testimonial-card" delay={0.07}>
              <div className="rating">★★★★★ <span>5.0/5</span></div>
              <p>{t(lang, 'testimonial2')}</p>
              <div className="person"><i className="avatar avatar--two" /><div><strong>{t(lang, 'testimonial2Title')}</strong><small>{t(lang, 'testimonial2Sub')}</small></div></div>
            </Reveal>
          </div>
          <div className="metrics">
            <Reveal className="metric"><strong>3</strong><span>{t(lang, 'metric1Label')}<br /><small>{t(lang, 'metric1Sub')}</small></span></Reveal>
            <Reveal className="metric" delay={0.07}><strong>01</strong><span>{t(lang, 'metric2Label')}<br /><small>{t(lang, 'metric2Sub')}</small></span></Reveal>
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
          <h2>{t(lang, 'ctaLine1')}<br /><span>{t(lang, 'ctaLine2')}</span></h2>
          <motion.a
            className="pill pill--light"
            href="#"
            onClick={(e) => { e.preventDefault(); openContact(); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>{t(lang, 'ctaBtn')}</span> <ArrowRight size={16} strokeWidth={1.5} />
          </motion.a>
        </Reveal>
      </section>

      <Footer />
    </motion.main>
  );
}

function Footer() {
  const openContact = useContext(ContactContext);
  const { lang } = useLanguage();
  const taglineRaw = t(lang, 'footerTagline');
  const taglines = taglineRaw.split('\n');
  return (
    <footer className="site-footer shell" id="contact">
      <div className="footer-card">
        <div>
          <div className="brand-mini"><img src="/logo.png" alt="AIGES" style={{ height: '14px', filter: 'brightness(10)' }} /></div>
          <p>{taglines[0]}<br />{taglines[1]}</p>
          <a href="#" onClick={(e) => { e.preventDefault(); openContact(); }}>hello@aiges.kz</a>
          <div className="footer-socials"><span aria-label="Instagram"><FaInstagram size={14} /></span><span aria-label="LinkedIn"><FaLinkedinIn size={14} /></span></div>
        </div>
        <a className="pill pill--light" href="#" onClick={(e) => { e.preventDefault(); openContact(); }}>
          <span>{t(lang, 'ctaBtn')}</span> <ArrowRight size={16} strokeWidth={1.5} />
        </a>
        <div className="footer-bottom"><span>{t(lang, 'footerBottom')}</span><span>{t(lang, 'footerBuilt')}</span></div>
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
  const { lang } = useLanguage();

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]);

  const goProject = (target) => {
    const go = () => navigate(`/projects/${target.slug}`);
    if (document.startViewTransition) document.startViewTransition(go);
    else go();
  };

  const intro = lang === 'ru' ? project.introRu : project.intro;
  const challenge = lang === 'ru' ? project.challengeRu : project.challenge;
  const solution = lang === 'ru' ? project.solutionRu : project.solution;
  const outcomes = lang === 'ru' ? project.outcomesRu : project.outcomes;
  const industry = lang === 'ru' ? project.industryRu : project.industry;
  const services = lang === 'ru' ? project.servicesRu : project.services;

  return (
    <main className="page page--dark project-page">
      <Header compact />

      <section className="case-hero shell">
        <div className="case-kicker">
          <span>✦ {t(lang, 'projectLabel')} {project.index}</span>
          <span>{project.meta}</span>
          <span>...{project.year}</span>
        </div>
        <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
          {project.name}<sup>©</sup>
        </motion.h1>
        <div className="case-cover" style={{ viewTransitionName: `project-${project.slug}` }}>
          <Visual type={project.visual} />
          <span className="scroll-cue">{t(lang, 'scrollCue')} <ArrowDown size={14} strokeWidth={1.5} /></span>
        </div>
      </section>

      <section className="case-intro shell">
        <div className="case-meta-list">
          <div><span>{t(lang, 'labelIndustry')}</span><strong>{industry}</strong></div>
          <div><span>{t(lang, 'labelYear')}</span><strong>{project.year}</strong></div>
          <div><span>{t(lang, 'labelServices')}</span><strong>{services}</strong></div>
        </div>
        <Reveal className="case-intro-copy">
          <span className="micro-label">{t(lang, 'sectionOverview')}</span>
          <p>{intro}</p>
        </Reveal>
      </section>

      <section className="case-block shell">
        <Reveal className="case-section-title">
          <span>{t(lang, 'sectionChallenge')}</span>
          <h2>{t(lang, 'challengeTitle1')}<br />{t(lang, 'challengeTitle2')}<sup>©</sup></h2>
        </Reveal>
        <Reveal className="case-copy"><p>{challenge}</p></Reveal>
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
            <Reveal><img src="/projects/jaryq-1.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq 1" /></Reveal>
            <Reveal><img src="/projects/jaryq-2.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq 2" /></Reveal>
            <Reveal><img src="/projects/jaryq-3.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq 3" /></Reveal>
            <Reveal><img src="/projects/jaryq-4.png" style={{ width: '100%', borderRadius: '24px' }} alt="Jaryq 4" /></Reveal>
          </div>
        ) : project.slug === 'woman-create' ? (
          <div className="custom-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
            <Reveal><img src="/projects/woman-1.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate 1" /></Reveal>
            <Reveal><img src="/projects/woman-2.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate 2" /></Reveal>
            <Reveal><img src="/projects/woman-3.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate 3" /></Reveal>
            <Reveal><img src="/projects/woman-4.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate 4" /></Reveal>
            <Reveal><img src="/projects/woman-5.png" style={{ width: '100%', borderRadius: '24px' }} alt="WomanCreate 5" /></Reveal>
          </div>
        ) : project.slug === 'manharrdy' ? (
          <div className="custom-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
            <Reveal><img src="/projects/manharrdy-1.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy 1" /></Reveal>
            <Reveal><img src="/projects/manharrdy-2.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy 2" /></Reveal>
            <Reveal><img src="/projects/manharrdy-3.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy 3" /></Reveal>
            <Reveal><img src="/projects/manharrdy-4.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy 4" /></Reveal>
            <Reveal><img src="/projects/manharrdy-5.png" style={{ width: '100%', borderRadius: '24px' }} alt="Manharrdy 5" /></Reveal>
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
        <Reveal className="case-section-title">
          <span>{t(lang, 'sectionSolution')}</span>
          <h2>{t(lang, 'solutionTitle1')}<br />{t(lang, 'solutionTitle2')}<sup>©</sup></h2>
        </Reveal>
        <div className="solution-list">
          {solution.map(([title, text], i) => (
            <Reveal className="solution-row" key={title} delay={i * 0.05}>
              <span>0{i + 1}</span><strong>{title}</strong><p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="case-outcomes shell">
        <Reveal className="case-section-title">
          <span>{t(lang, 'sectionOutcome')}</span>
          <h2>{t(lang, 'outcomeTitle1')}<br />{t(lang, 'outcomeTitle2')}<sup>©</sup></h2>
        </Reveal>
        <div className="outcomes-grid">
          {outcomes.map((item, i) => (
            <Reveal className="outcome" key={item} delay={i * 0.05}>
              <span>0{i + 1}</span><strong>{item}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="next-project shell">
        <Reveal className="next-label">
          <span>{t(lang, 'exploreNext')}</span>
          <button onClick={() => navigate('/')}>
            <ArrowLeft size={15} strokeWidth={1.5} /> <span>{t(lang, 'allProjects')}</span>
          </button>
        </Reveal>
        <button className="next-project-card" onClick={() => goProject(next)}>
          <div className="next-title">
            <span>{t(lang, 'nextLabel')}</span>
            <strong>{next.name}<sup>©</sup></strong>
            <em>{next.index} / 04</em>
          </div>
          <div className="next-image" style={{ viewTransitionName: `project-${next.slug}` }}>
            <Visual type={next.visual} />
            <span className="project-arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
          </div>
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
  const [lang, setLang] = useState('ru');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <ContactContext.Provider value={() => setContactOpen(true)}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
          </Routes>
        </AnimatePresence>
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} lang={lang} />
      </ContactContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
