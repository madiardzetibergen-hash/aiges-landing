const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/useEffect\\(\\(\\) => window\\.scrollTo\\(\\{ top: 0, behavior: 'instant' \\}\\), \\[slug\\]\\);/, useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [slug]););
fs.writeFileSync('src/App.jsx', app);

