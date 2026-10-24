import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityBar, EditorChrome, Explorer, Minimap, StatusBar, TitleBar } from './components/Workspace.jsx';
import { About, Education, Experience, Hero, Journey, Projects, Skills } from './components/Sections.jsx';
import { CommandPalette, Contact, Terminal } from './components/Interactive.jsx';
import { useMediaQuery, useReadingProgress, useReveal } from './hooks/useWorkspace.js';

export default function App() {
  const [theme, setTheme] = useState(() => window.portfolioTheme?.get() || 'system');
  const [activeJob, setActiveJob] = useState(0);
  const [desktopExplorer, setDesktopExplorer] = useState(true);
  const [mobileExplorer, setMobileExplorer] = useState(false);
  const mobile = useMediaQuery('(max-width:850px)');
  const narrow = useMediaQuery('(max-width:600px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [motionOverride, setMotionOverride] = useState(null);
  const paused = motionOverride ?? reducedMotion;
  const explorerOpen = mobile ? mobileExplorer : desktopExplorer;
  const paletteRef = useRef(null);
  const explorerButtonRef = useRef(null);
  const reading = useReadingProgress();
  useReveal();

  const openPalette = useCallback(() => paletteRef.current?.open(), []);
  const toggleMotion = useCallback(() => setMotionOverride(previous => !(previous ?? reducedMotion)), [reducedMotion]);
  function changeTheme(value) { window.portfolioTheme.set(value); setTheme(value); }
  function toggleExplorer() {
    if (mobile) setMobileExplorer(previous => !previous);
    else setDesktopExplorer(previous => !previous);
  }
  useEffect(() => {
    document.body.classList.toggle('motion-paused', paused);
    return () => document.body.classList.remove('motion-paused');
  }, [paused]);
  useEffect(() => {
    document.body.classList.toggle('explorer-hidden', !mobile && !desktopExplorer);
    document.body.classList.toggle('explorer-mobile-open', mobile && mobileExplorer);
    return () => document.body.classList.remove('explorer-hidden', 'explorer-mobile-open');
  }, [mobile, desktopExplorer, mobileExplorer]);
  useEffect(() => {
    function handleKey(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openPalette(); }
      if (event.key === 'Escape' && mobile && mobileExplorer) { setMobileExplorer(false); explorerButtonRef.current?.focus(); }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [openPalette, mobile, mobileExplorer]);

  return <>
    <a className="skip-link" href="#home">Skip to portfolio</a>
    <div id="reading-progress" role="progressbar" aria-label="Resume reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={reading.percent} style={{ width: `${reading.percent}%` }} />
    <TitleBar theme={theme} onThemeChange={changeTheme} openPalette={openPalette} />
    <ActivityBar explorerOpen={explorerOpen} toggleExplorer={toggleExplorer} openPalette={openPalette} paused={paused} toggleMotion={toggleMotion} explorerButtonRef={explorerButtonRef} />
    <Explorer open={explorerOpen} activeSection={reading.section} percent={reading.percent} onNavigate={() => setMobileExplorer(false)} />
    <div className="editor"><EditorChrome activeSection={reading.section} /><main>
      <Hero paused={paused} /><About /><Journey onSelectJob={setActiveJob} timeline={reading.timeline} />
      <Experience activeJob={activeJob} onSelectJob={setActiveJob} mobile={narrow} />
      <Skills /><Projects /><Education /><Terminal paused={paused} toggleMotion={toggleMotion} /><Contact />
      <footer><span>© <span id="year">{new Date().getFullYear()}</span> Jay Thakkar. Built with curiosity.</span><a href="#home">Back to the first line ↑</a><small>An independent portfolio inspired by the VS Code editor.</small></footer>
    </main></div>
    <Minimap activeSection={reading.section} /><StatusBar activeSection={reading.section} percent={reading.percent} />
    <CommandPalette ref={paletteRef} />
  </>;
}
