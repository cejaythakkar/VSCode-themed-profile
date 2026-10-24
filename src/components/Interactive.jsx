import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { asset, files } from '../config.js';
import { CONTENT } from '../content.js';
import { SectionHeading } from './Sections.jsx';

export const CommandPalette = forwardRef(function CommandPalette(_, ref) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const [query, setQuery] = useState('');
  const matches = files.filter(file => file.slice(0, 3).join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  useImperativeHandle(ref, () => ({ open() {
    setQuery('');
    if (!dialogRef.current.open) dialogRef.current.showModal();
    inputRef.current.focus();
  } }), []);
  function close() { dialogRef.current.close(); }
  function handleKey(event) {
    const first = resultsRef.current.querySelector('a');
    if (first && event.key === 'ArrowDown') { event.preventDefault(); first.focus(); }
    else if (first && event.key === 'Enter') { event.preventDefault(); first.click(); }
  }
  function clickBackdrop(event) {
    if (event.target !== dialogRef.current) return;
    const rect = event.target.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  }
  return <dialog id="command-palette" ref={dialogRef} onClick={clickBackdrop} aria-label="Find a portfolio section">
    <div className="palette-top"><label htmlFor="palette-input">⌕</label><input id="palette-input" ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} onKeyDown={handleKey} placeholder="Go to a section..." autoComplete="off" aria-label="Search portfolio sections" /><button id="palette-close" aria-label="Close section search" onClick={close}>Esc</button></div>
    <div id="palette-results" ref={resultsRef}>{matches.length ? matches.map(([id, name, label]) => <a key={id} href={`#${id}`} onClick={close}><span>{name}</span>{label}</a>) : <p className="palette-help">No matching sections.</p>}</div><p className="palette-help">Choose a file to explore the portfolio.</p>
  </dialog>;
});

export function Terminal({ paused, toggleMotion }) {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const history = useRef([]);
  const historyIndex = useRef(0);
  const outputRef = useRef(null);
  useEffect(() => { outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [lines]);
  function submit(event) {
    event.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    history.current.push(raw); historyIndex.current = history.current.length; setInput('');
    const key = raw.toLowerCase().replace(/^cd\s+/, '').replace(/^~?\//, '').replace(/\/$/, '');
    if (key === 'clear') { setLines([]); setShowWelcome(false); return; }
    let reply;
    if (key === 'help') reply = 'Commands: whoami, home, about, journey, experience, skills, projects, education, contact, resume, motion, clear. Try cd ~/projects. Arrow keys recall commands.';
    else if (key === 'whoami') reply = 'Jay Thakkar — Senior Fullstack Engineer & Solution Architect. 12+ years. Ahmedabad, India.';
    else if (key === 'motion') { toggleMotion(); reply = `Animations ${paused ? 'enabled' : 'paused'}.`; }
    else {
      const destination = key === 'resume' ? 'contact' : files.find(([id, name]) => key === id || key === name)?.[0];
      if (destination) { reply = `Opening ${destination}...`; document.getElementById(destination)?.scrollIntoView(); }
      else reply = `Command not found: ${raw}. Type help to see the available commands.`;
    }
    setLines(previous => [...previous, `visitor:~/portfolio$ ${raw}`, reply].slice(-60));
  }
  function navigateHistory(event) {
    if (event.key === 'ArrowUp') { event.preventDefault(); historyIndex.current = Math.max(0, historyIndex.current - 1); setInput(history.current[historyIndex.current] || ''); }
    if (event.key === 'ArrowDown') { event.preventDefault(); historyIndex.current = Math.min(history.current.length, historyIndex.current + 1); setInput(history.current[historyIndex.current] || ''); }
  }
  return <section id="terminal" data-lines={'701\n702\n703'}>
    <SectionHeading number="⌘" comment="prefer the command line?">Make yourself <span className="gradient">at home.</span></SectionHeading>
    <div className="interactive-terminal"><div className="terminal-tabs"><span>TERMINAL</span><span className="muted">bash — interactive</span></div>
      <div id="terminal-output" role="log" aria-live="polite" ref={outputRef}>{showWelcome && <p><span className="green">✓</span> Workspace ready. Type <b>help</b> to explore.</p>}{lines.map((line, index) => <p key={index}>{line}</p>)}</div>
      <form id="terminal-form" onSubmit={submit}><label htmlFor="terminal-input"><span className="green">visitor</span><span className="muted">:~/portfolio$</span></label><input id="terminal-input" value={input} onChange={event => setInput(event.target.value)} onKeyDown={navigateHistory} autoComplete="off" spellCheck={false} placeholder="Try: projects" aria-label="Terminal command" /><button type="submit" aria-label="Run command">↵</button></form>
    </div>
  </section>;
}

export function Contact() {
  const [copyLabel, setCopyLabel] = useState('Copy email ⧉');
  const timer = useRef(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(timer.current); }; }, []);
  async function copyEmail() {
    let message;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText('ce.jaythakkar@gmail.com');
      else {
        const field = document.createElement('textarea'); field.value = 'ce.jaythakkar@gmail.com'; document.body.append(field); field.select();
        let copied;
        try { copied = document.execCommand('copy'); } finally { field.remove(); }
        if (!copied) throw Error('Copy unavailable');
      }
      message = 'Copied ✓';
    } catch { message = 'Select the email above to copy'; }
    if (!mounted.current) return;
    setCopyLabel(message); clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyLabel('Copy email ⧉'), 3000);
  }
  return <section id="contact" data-lines={'801\n802\n803'}>
    <SectionHeading number="07" comment="let's start the next chapter" filename="contact.css">Great things begin<br />with <span className="gradient">a conversation.</span></SectionHeading>
    <p className="section-description">An engineering challenge, a product idea, or a shared curiosity.<br />Let's build something worth shipping.</p><a className="contact-email" href="mailto:ce.jaythakkar@gmail.com">ce.jaythakkar@gmail.com <span>↗</span></a>
    <div className="contact-actions"><a className="button primary" href="mailto:ce.jaythakkar@gmail.com">✉ Say hello</a><button className="button secondary" id="copy-email" onClick={copyEmail}>{copyLabel}</button></div>
    <div className="contact-meta"><a href="tel:+919978821813">+91 99788 21813</a><a href="tel:+919427450763">+91 94274 50763</a><span>Ahmedabad, Gujarat, India</span></div>
    <div className="social-links" id="social-links">{CONTENT.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>
    <div className="resume-downloads"><span className="code-comment">// take a copy with you</span><a href={asset('resume-brief.pdf')} download>↓ Brief résumé <span>PDF</span></a><a href={asset('resume-detailed.pdf')} download>↓ Detailed résumé <span>PDF</span></a></div>
  </section>;
}
