const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

const oldStr = .project-arrow {
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
    right: 18px;
    bottom: 18px;
    z-index: 5;
  };

const newStr = .project-arrow {
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
  };

css = css.replace(oldStr, newStr);
fs.writeFileSync('src/styles.css', css);

