const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

css = css.replace(/rgba\(255, 255, 255,/g, 'rgba(244, 243, 239,');
css = css.replace(/rgba\(0, 0, 0,/g, 'rgba(17, 17, 17,');
css = css.replace(/rgba\(5, 5, 5,/g, 'rgba(17, 17, 17,');
css = css.replace(/rgba\(5,5,5,/g, 'rgba(17, 17, 17,');
css = css.replace(/rgba\(255,255,255,/g, 'rgba(244, 243, 239,');
css = css.replace(/rgba\(0,0,0,/g, 'rgba(17, 17, 17,');

css = css.replace(/border: 1px solid #2c2c2c; display: grid; place-items: center; background: #171717; color: #cfcfcf;/g, 'border: 1px solid rgba(244, 243, 239, 0.14); display: grid; place-items: center; background: rgba(17, 17, 17, 1); color: var(--aiges-paper);');

css = css.replace(/\.pill--light \{ background: var\(--aiges-paper\); color: #0b0b0b; \}/g, '.pill--light { background: var(--aiges-paper); color: var(--aiges-black); transition: background-color 0.25s, color 0.25s; }\n.pill--light:hover { background: var(--aiges-blue); color: var(--aiges-paper); }');

fs.writeFileSync('src/styles.css', css);
