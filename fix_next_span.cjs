const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

css = css.replace(/\\.next-image > span \\{[^}]*\\}/g, '');

fs.writeFileSync('src/styles.css', css);

