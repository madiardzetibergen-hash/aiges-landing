const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

css = css.replace(/var\\(--blue\\)/g, 'var(--aiges-blue)');
css = css.replace(/var\\(--orange\\)/g, 'var(--aiges-orange)');
css = css.replace(/var\\(--bg\\)/g, 'var(--aiges-black)');

fs.writeFileSync('src/styles.css', css);

