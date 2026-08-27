const fs = require('fs');

let css = fs.readFileSync('src/styles.css', 'utf8');

// Replace standard colors with CSS variables
css = css.replace(/:root \{([\s\S]*?)\}/, :root {
  --font-primary: "Onest", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  --aiges-blue: #2F5BFF;
  --aiges-orange: #FFB36B;
  --aiges-paper: #F4F3EF;
  --aiges-black: #111111;
  --aiges-white: #FFFFFF;
  font-family: var(--font-primary);
  font-synthesis: none;
  text-rendering: geometricPrecision;
  --shell: min(1600px, calc(100vw - 40px));
});

// Apply global body rules
css = css.replace(/html \{ scroll-behavior: smooth; background: var\(--bg\); \}/, 'html { scroll-behavior: smooth; background: var(--aiges-black); }');
css = css.replace(/body \{ margin: 0; min-width: 320px; background: var\(--bg\); color: var\(--ink\); overflow-x: hidden; \}/, 'body { margin: 0; min-width: 320px; background: var(--aiges-black); color: var(--aiges-paper); overflow-x: hidden; font-family: var(--font-primary); }');
css = css.replace(/::selection \{ background: var\(--blue\); color: white; \}/, '::selection { background: var(--aiges-blue); color: var(--aiges-paper); }');

// General replacements for colors
css = css.replace(/#050505/g, 'var(--aiges-black)');
css = css.replace(/#111111/g, 'var(--aiges-black)');
css = css.replace(/#111(?![0-9a-fA-F])/g, 'var(--aiges-black)');
css = css.replace(/#fff(?![0-9a-fA-F])/g, 'var(--aiges-paper)');
css = css.replace(/#ffffff/g, 'var(--aiges-paper)');
css = css.replace(/var\(--blue\)/g, 'var(--aiges-blue)');
css = css.replace(/var\(--orange\)/g, 'var(--aiges-orange)');
css = css.replace(/var\(--bg\)/g, 'var(--aiges-black)');

// Update typography for large headings
css = css.replace(/\.hero-title \{([^}]*)\}/, '.hero-title { margin: 0; font-family: var(--font-primary); font-size: clamp(72px, 10.7vw, 205px); font-weight: 400; line-height: 0.9; letter-spacing: -0.045em; white-space: nowrap; }');
css = css.replace(/\.section-heading h2 \{([^}]*)\}/, '.section-heading h2 { margin: 0; font-family: var(--font-primary); font-size: clamp(64px, 8.2vw, 140px); font-weight: 500; line-height: 0.9; letter-spacing: -0.045em; }');
css = css.replace(/\.cta-copy h2 \{([^}]*)\}/, '.cta-copy h2 { margin: 0 0 28px; font-family: var(--font-primary); font-size: clamp(60px, 8.1vw, 136px); font-weight: 500; line-height: 0.9; letter-spacing: -0.045em; }');
css = css.replace(/\.case-hero h1 \{([^}]*)\}/, '.case-hero h1 { font-family: var(--font-primary); font-size: clamp(85px, 14vw, 240px); line-height: 0.9; margin: 0 0 34px; letter-spacing: -0.045em; font-weight: 500; }');
css = css.replace(/\.case-section-title h2 \{([^}]*)\}/, '.case-section-title h2 { font-family: var(--font-primary); font-size: clamp(65px, 8vw, 140px); line-height: 0.9; letter-spacing: -0.045em; font-weight: 500; margin: 25px 0 0; }');

// Small technical typography
css = css.replace(/\.micro-label \{([^}]*)\}/, '.micro-label { font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(244, 243, 239, 0.7); }');
css = css.replace(/\.project-card-meta \{([^}]*)\}/, '.project-card-meta { display: flex; justify-content: space-between; gap: 14px; font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; padding: 0 4px 10px; color: rgba(244, 243, 239, 0.55); }');
css = css.replace(/\.case-kicker \{([^}]*)\}/, '.case-kicker { display: grid; grid-template-columns: 1fr 1fr auto; gap: 30px; font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(244, 243, 239, 0.55); margin-bottom: 52px; }');
css = css.replace(/\.case-meta-list span \{([^}]*)\}/, '.case-meta-list span { color: rgba(244, 243, 239, 0.55); font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; }');
css = css.replace(/\.case-section-title > span \{([^}]*)\}/, '.case-section-title > span { font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(244, 243, 239, 0.55); }');
css = css.replace(/\.solution-row > span \{([^}]*)\}/, '.solution-row > span { font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(244, 243, 239, 0.55); }');
css = css.replace(/\.outcome span \{([^}]*)\}/, '.outcome span { font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(244, 243, 239, 0.55); }');
css = css.replace(/\.next-label \{([^}]*)\}/, '.next-label { display: flex; justify-content: space-between; margin-bottom: 44px; font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; }');
css = css.replace(/\.footer-bottom \{([^}]*)\}/, '.footer-bottom { position: absolute; left: 42px; right: 42px; bottom: 24px; border-top: 1px solid rgba(244, 243, 239, 0.14); padding-top: 18px; display: flex; justify-content: space-between; color: rgba(244, 243, 239, 0.55); font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; }');

// Hero kicker
css = css.replace(/\.hero-kicker-row \{([^}]*)\}/, '.hero-kicker-row { display: grid; grid-template-columns: repeat(5, 1fr); font-family: var(--font-mono); font-size: 10px; font-weight: 400; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(244, 243, 239, 0.55); padding: 0 2px 116px; }');

// Project Cards
css = css.replace(/\.project-card \{([^}]*)\}/, '.project-card { border: 0; background: var(--aiges-black); color: var(--aiges-paper); padding: 0; text-align: left; width: 100%; cursor: pointer; }');
css = css.replace(/\.project-image \{([^}]*)\}/, '.project-image { aspect-ratio: 1.45/1; border-radius: 42px; overflow: hidden; position: relative; border: 1px solid rgba(244, 243, 239, 0.14); background: var(--aiges-black); transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.55s cubic-bezier(0.16, 1, 0.3, 1); }');

// Project Arrow replacement
css = css.replace(/\.project-card:hover \.project-arrow svg \{[^}]*\}\s*\.project-arrow svg \{[^}]*\}/g, '');
css = css.replace(/\.project-arrow \{([^}]*)\}/, '.project-arrow { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; padding: 0; border: 0; border-radius: 50%; background: var(--aiges-paper); color: var(--aiges-blue); cursor: pointer; overflow: hidden; transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease; position: absolute; right: 18px; bottom: 18px; z-index: 5; }\n.project-arrow svg { display: block; flex-shrink: 0; transition: transform 0.25s ease; }\n.project-card:hover .project-arrow { background: var(--aiges-blue); color: var(--aiges-paper); transform: scale(1.04); }\n.project-card:hover .project-arrow svg { transform: translate(2px, -2px); }');

// .project-card:nth-child(odd) .project-image { border-top-left-radius:18px; } -> stays same

fs.writeFileSync('src/styles.css', css);
