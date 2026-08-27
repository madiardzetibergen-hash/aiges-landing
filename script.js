const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const imports = "import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Instagram, Linkedin, Mail } from 'lucide-react';\n";
code = imports + code;

code = code.replace(/<span>?<\/span>/g, '<span><ArrowUpRight size={18} strokeWidth={1.7} /></span>');
code = code.replace(/<span className="project-arrow">?<\/span>/g, '<span className="project-arrow"><ArrowUpRight size={18} strokeWidth={1.7} /></span>');
code = code.replace(/SCROLL TO EXPLORE v/g, 'SCROLL TO EXPLORE <ArrowDown size={14} strokeWidth={1.5} />');
code = code.replace(/< ALL PROJECTS/g, '<ArrowLeft size={15} strokeWidth={1.5} /> <span>ALL PROJECTS</span>');
code = code.replace(/<a className="circle-link" href="https:\/\/instagram.com"[^>]*>ig<\/a>/g, '<a className="circle-link" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={14} strokeWidth={1.5} /></a>');
code = code.replace(/<a className="circle-link" href="https:\/\/linkedin.com"[^>]*>in<\/a>/g, '<a className="circle-link" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={14} strokeWidth={1.5} /></a>');
code = code.replace(/<a className="circle-link" href="mailto:hello@aiges.kz">@<\/a>/g, '<a className="circle-link" href="mailto:hello@aiges.kz" aria-label="Email"><Mail size={14} strokeWidth={1.5} /></a>');
code = code.replace(/<div className="footer-socials"><span>ig<\/span><span>be<\/span><span>in<\/span><\/div>/g, '<div className="footer-socials"><span aria-label="Instagram"><Instagram size={14} strokeWidth={1.5} /></span><span aria-label="LinkedIn"><Linkedin size={14} strokeWidth={1.5} /></span></div>');
code = code.replace(/<a className="pill pill--light" href="#contact">START A PROJECT<\/a>/g, '<a className="pill pill--light" href="#contact"><span>START A PROJECT</span> <ArrowRight size={16} strokeWidth={1.5} /></a>');
code = code.replace(/<a className="pill pill--light" href="mailto:hello@aiges.kz">START PROJECT<\/a>/g, '<a className="pill pill--light" href="mailto:hello@aiges.kz"><span>START PROJECT</span> <ArrowRight size={16} strokeWidth={1.5} /></a>');

fs.writeFileSync('src/App.jsx', code);

let css = fs.readFileSync('src/styles.css', 'utf8');
css = css.replace('.project-arrow {', '.project-arrow { transition: transform 0.25s ease; ')
css = css.replace('.project-card:hover .project-image {', '.project-card:hover .project-arrow svg { transform: translate(2px, -2px); }\n.project-card:hover .project-image {')
fs.writeFileSync('src/styles.css', css);

