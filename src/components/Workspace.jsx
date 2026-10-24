import { asset, files, themes } from '../config.js';

export function SectionLink({ file, activeSection, onNavigate, editorTab = false }) {
  const [id, filename, , color, icon] = file;
  const active = id === activeSection;
  return <a href={`#${id}`} data-section={id} className={active ? 'active' : undefined}
    aria-current={active ? 'location' : undefined} onClick={onNavigate}>
    <span className={editorTab ? color : `file-icon ${color}`}>{icon}</span>{' '}{filename}
    {id === 'home' && (editorTab ? <i>●</i> : <span className="file-state">●</span>)}
  </a>;
}

export function TitleBar({ theme, onThemeChange, openPalette }) {
  return <header className="titlebar">
    <a href="#home" className="app-mark" aria-label="Portfolio home">⌘</a>
    <span className="desktop-label">Jay Thakkar <span className="muted">/ Developer Workspace</span></span>
    <button id="palette-trigger" className="search-trigger" aria-haspopup="dialog" onClick={openPalette}>
      <span>⌕</span><span>Go to a section...</span><kbd>Ctrl K</kbd>
    </button>
    <label className="theme-control"><span aria-hidden="true">◐</span>
      <select id="theme-select" aria-label="Color theme" value={theme} onChange={event => onThemeChange(event.target.value)}>
        {themes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
  </header>;
}

export function ActivityBar({ explorerOpen, toggleExplorer, openPalette, paused, toggleMotion, explorerButtonRef }) {
  return <aside className="activitybar" aria-label="Workspace tools">
    <button ref={explorerButtonRef} id="explorer-toggle" className={`activity${explorerOpen ? ' active' : ''}`}
      aria-label="Toggle explorer" aria-expanded={explorerOpen} title="Toggle explorer" onClick={toggleExplorer}>▱</button>
    <button id="search-toggle" className="activity" aria-label="Find a section" title="Find a section" onClick={openPalette}>⌕</button>
    <a className="activity" href="#journey" aria-label="Career timeline" title="Career timeline">⑂</a>
    <a className="activity" href="#projects" aria-label="Projects" title="Projects">▦</a>
    <a className="activity" href="#contact" aria-label="Contact" title="Contact">✉</a>
    <div className="activity-bottom">
      <button id="motion-toggle" className="activity" aria-label={paused ? 'Resume animations' : 'Pause animations'}
        aria-pressed={paused} title={paused ? 'Resume animations' : 'Pause animations'} onClick={toggleMotion}>{paused ? '▷' : 'Ⅱ'}</button>
      <a href="#about" aria-label="About Jay"><img src={asset('profile.png')} alt="" /></a>
    </div>
  </aside>;
}

export function Explorer({ activeSection, percent, open, onNavigate }) {
  return <aside className="explorer" id="explorer" inert={!open}>
    <div className="explorer-heading">EXPLORER <span>···</span></div>
    <details open className="file-tree"><summary>JAY-THAKKAR / PORTFOLIO</summary>
      <nav aria-label="Portfolio sections">
        {files.filter(([id]) => id !== 'terminal').map(file => <SectionLink key={file[0]} file={file} activeSection={activeSection} onNavigate={onNavigate} />)}
      </nav>
      <details className="asset-tree"><summary>assets</summary>
        <a href={asset('resume-brief.pdf')} download>↳ resume-brief.pdf ↓</a>
        <a href={asset('resume-detailed.pdf')} download>↳ resume-detailed.pdf ↓</a>
        <a href={asset('profile.png')} target="_blank" rel="noopener noreferrer">↳ profile.png ↗</a>
      </details>
    </details>
    <div className="explorer-note"><span className="live-dot" /> A HUMAN BEHIND THE CODE
      <p>12+ years of turning complex problems into dependable software.</p><a href="#contact" onClick={onNavigate}>Start a conversation ↗</a>
    </div>
    <div className="outline"><h3>⌄ OUTLINE</h3>
      {[['about', 'The person'], ['journey', 'The journey'], ['projects', 'The work'], ['contact', 'The next chapter']].map(([id, label]) =>
        <a key={id} href={`#${id}`} onClick={onNavigate}>◇ {label}</a>)}
    </div>
    <div className="explorer-progress"><div><span>RESUME EXPLORED</span><b id="reading-label">{percent}%</b></div>
      <div className="progress-track"><i id="reading-fill" style={{ width: `${percent}%` }} /></div>
    </div>
  </aside>;
}

export function EditorChrome({ activeSection }) {
  const current = files.find(([id]) => id === activeSection) || files[0];
  return <div className="editor-chrome">
    <nav className="editor-tabs" aria-label="Open portfolio files">
      {files.filter(([id]) => ['home', 'experience', 'projects', 'contact'].includes(id)).map(file =>
        <SectionLink key={file[0]} file={file} activeSection={activeSection} editorTab />)}
    </nav>
    <div className="breadcrumb"><span>portfolio</span><span>›</span><span id="breadcrumb-file">{current[1]}</span><span>›</span>
      <span className="purple">◇</span><span id="breadcrumb-section">{current[2]}</span>
      <span className="saved"><span className="live-dot" /> All changes saved</span>
    </div>
  </div>;
}

export function Minimap({ activeSection }) {
  return <nav className="minimap" aria-label="Resume minimap"><span>OUTLINE</span>
    {files.filter(([id]) => id !== 'terminal').map(([id, , title]) => <a key={id} href={`#${id}`} aria-label={title} title={title}
      className={activeSection === id ? 'active' : undefined} aria-current={activeSection === id ? 'location' : undefined} />)}
  </nav>;
}

export function StatusBar({ activeSection, percent }) {
  const current = files.find(([id]) => id === activeSection) || files[0];
  return <div className="statusbar"><div><span className="remote-symbol">{'><'}</span><a href="#journey">⑂ main*</a>
    <span className="status-desktop">✓ Portfolio ready</span></div><div><span id="status-section">{current[1]}</span>
    <span id="status-progress">Read {percent}%</span><span className="status-desktop">UTF-8</span><span>{'{ }'} JavaScript</span><span>◉</span></div>
  </div>;
}
