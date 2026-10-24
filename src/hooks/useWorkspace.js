import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const media = matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export function useReadingProgress() {
  const [reading, setReading] = useState({ percent: 0, section: 'home', timeline: 0 });
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const percent = Math.max(0, Math.min(100, Math.round(scrollY / Math.max(1, max) * 100)));
      const sections = [...document.querySelectorAll('main > section')];
      const current = sections.filter(section => section.getBoundingClientRect().top < innerHeight * .4).at(-1) || sections[0];
      const box = document.getElementById('timeline')?.getBoundingClientRect();
      const timeline = box ? Math.max(0, Math.min(box.height, innerHeight * .65 - box.top)) : 0;
      setReading(previous => previous.percent === percent && previous.section === current?.id && previous.timeline === timeline
        ? previous : { percent, section: current?.id || 'home', timeline });
    }
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resizeObserver = new ResizeObserver(queue);
    resizeObserver.observe(document.querySelector('main'));
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
    };
  }, []);
  return reading;
}

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .05 });
    document.querySelectorAll('section:not(#home) > .section-heading,.about-layout,.impact,.milestone,.skills-grid,.project,.education-card,.languages,.interactive-terminal').forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
}

export function useTypewriter(paused, fullName = 'Jay Thakkar') {
  const [text, setText] = useState(fullName);
  useEffect(() => {
    let timer, count = 0, deleting = false;
    function tick() {
      if (document.hidden) return;
      count += deleting ? -1 : 1;
      setText(fullName.slice(0, count));
      let delay = deleting ? 75 : 150 + (count % 3) * 35;
      if (count === fullName.length) { deleting = true; delay = 4200; }
      else if (count === 0) { deleting = false; delay = 650; }
      timer = setTimeout(tick, delay);
    }
    function restart() {
      clearTimeout(timer);
      if (paused) { setText(fullName); return; }
      if (document.hidden) return;
      count = 0; deleting = false; setText('');
      timer = setTimeout(tick, 550);
    }
    const onVisibility = () => document.hidden ? clearTimeout(timer) : restart();
    document.addEventListener('visibilitychange', onVisibility);
    restart();
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', onVisibility); };
  }, [paused, fullName]);
  return paused ? fullName : text;
}
