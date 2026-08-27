const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');
css = css.replace('.project-arrow { transition: transform 0.25s ease;  position:absolute;', '.project-arrow { position:absolute;');
css = css.replace('.project-card:hover .project-arrow svg { transform: translate(2px, -2px); }', '.project-card:hover .project-arrow svg { transform: translate(2px, -2px); }\n.project-arrow svg { transition: transform 0.25s ease; }');
fs.writeFileSync('src/styles.css', css);

