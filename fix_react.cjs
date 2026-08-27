const fs = require('fs');

// main.jsx
let main = fs.readFileSync('src/main.jsx', 'utf8');
main = main.replace("import App from './App.jsx';", "import '@fontsource/onest/400.css';\nimport '@fontsource/onest/500.css';\nimport '@fontsource/onest/600.css';\nimport '@fontsource/ibm-plex-mono/400.css';\nimport '@fontsource/ibm-plex-mono/500.css';\nimport App from './App.jsx';");
fs.writeFileSync('src/main.jsx', main);

// App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/strokeWidth=\{1\.7\}/g, 'strokeWidth={1.6}');
fs.writeFileSync('src/App.jsx', app);

