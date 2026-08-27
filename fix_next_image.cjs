const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/<div className="next-image" style={{ viewTransitionName: \\project-\\\\ }}><Visual type={next\\.visual}\\/><span>[^<]+<\\/span><\\/div>/, '<div className="next-image" style={{ viewTransitionName: \\project-\\\\ }}><Visual type={next.visual}/><span className="project-arrow"><ArrowUpRight size={18} strokeWidth={1.6} /></span></div>');
fs.writeFileSync('src/App.jsx', app);

