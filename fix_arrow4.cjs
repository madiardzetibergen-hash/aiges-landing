const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

const regex = /\.project-arrow\s*\{[\s\S]*?z-index:\s*5;\s*\}/;

const newStr = `.project-arrow {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--aiges-paper);
  color: var(--aiges-blue);
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 5;
}`;

css = css.replace(regex, newStr);
fs.writeFileSync('src/styles.css', css);
