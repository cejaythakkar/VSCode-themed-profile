import { useRef, useState } from 'react';
import { CONTENT } from '../content.js';
import { asset } from '../config.js';
import { useTypewriter } from '../hooks/useWorkspace.js';

export function SectionHeading({ number, comment, children, filename }) {
  return <div className="section-heading"><span className="section-number">{number}</span><div>
    <p className="code-comment">// {comment}</p><h2>{children}</h2></div>{filename && <span className="filename">{filename}</span>}</div>;
}
export function Tags({ items }) {
  return <div className="tags">{items.map(item => <span className="tag" key={item}>{item}</span>)}</div>;
}
export function Hero({ paused }) {
  const name = useTypewriter(paused);
  return <section id="home" className="hero">
    <div className="hero-decoration" aria-hidden="true">{'{ }'}</div><p className="code-comment">// welcome to my corner of the internet</p>
    <div className="hero-layout"><div className="hero-copy">
      <div className="code-line"><span className="purple">const</span>{' '}<span className="blue">engineer</span>{' '}<span className="muted">=</span>{' '}<span className="yellow">(</span><span className="yellow">)</span>{' '}<span className="purple">{' =>'}</span>{' '}<span className="yellow">{'{'}</span></div>
      <p className="hello">Hello, world. I'm</p><h1 aria-label="Jay Thakkar"><span className="name-sizer" aria-hidden="true">Jay Thakkar</span><span className="name-typed gradient" id="typed-name" aria-hidden="true">{name}</span></h1>
      <h2>Senior Fullstack Engineer<br /><span className="muted">&amp; Solution Architect.</span></h2>
      <p className="hero-summary">I connect the dots between beautiful interfaces,<br className="desktop-break" /> reliable services, and the infrastructure beneath.</p>
      <div className="hero-actions"><a className="button primary" href="#projects"><span>▷</span> Explore my work</a><a className="button secondary" href={asset('resume-brief.pdf')} download>↓ Download résumé</a></div>
      <div className="code-line closing"><span className="purple">return</span>{' '}<span className="green">{'<BuiltWithPurpose />'}</span><span className="muted">;</span><br /><span className="yellow">{'};'}</span></div>
    </div><div className="profile-file"><div className="profile-title"><span className="purple">◇</span> System_Engineer.config <span className="muted">···</span></div>
      <div className="portrait"><img src={asset('profile.png')} alt="Jay Thakkar, Senior Fullstack Engineer" /><div className="scan-line" aria-hidden="true" /><span className="portrait-caption"><span className="live-dot" /> Ahmedabad, India</span></div>
      <div className="profile-code"><div><span className="line-number">01</span><span><span className="purple">const</span>{' '}<span className="blue">engineer</span>{' = {'}</span></div>
        <div><span className="line-number">02</span><span>&nbsp; experience: <span className="orange">"12+ years"</span>,</span></div>
        <div><span className="line-number">03</span><span>&nbsp; focus: <span className="orange">"end-to-end"</span>,</span></div>
        <div><span className="line-number">04</span><span>&nbsp; learning: <span className="blue">true</span></span></div>
        <div><span className="line-number">05</span><span>{'};'}</span></div></div>
    </div></div>
    <div className="hero-stats"><div><strong>12<span>+</span></strong><p>years of experience</p></div><div><strong>04</strong><p>companies, one journey</p></div><div><strong>40<span>%</span></strong><p>faster engineer onboarding</p></div></div>
    <div className="hero-terminal"><div className="terminal-tabs"><span>TERMINAL</span><span className="muted">bash — portfolio</span><a href="#terminal" aria-label="Open interactive terminal">↗</a></div>
      <p><span className="green">jay@workspace</span><span className="muted">:~/portfolio$</span> npm run introduce</p><p className="terminal-intro"><span className="purple">›</span> Building thoughtful software. <span className="muted">One layer at a time.</span><span className="terminal-caret">▋</span></p>
    </div><a className="scroll-hint" href="#about">↓ Scroll to read the source</a>
  </section>;
}

const highlights = [
  ['01 / THE ARC', 'Frontend → Architecture', 'Interfaces, microservices, and the platforms that connect them.'],
  ['02 / THE SCALE', 'Enterprise manufacturing', 'Solumina i-Series and dependable manufacturing workflows.'],
  ['03 / THE MENTOR', '40% faster onboarding', 'Knowledge transfer that helps engineers become effective sooner.'],
  ['04 / THE GUARDIAN', 'Security in practice', 'VAPT and Snyk vulnerability remediation with cybersecurity teams.'],
  ['05 / THE MIGRATOR', 'MongoDB → SQL', 'Migration utilities that preserve data integrity and service continuity.'],
  ['06 / THE BUILDER', 'A personal SaaS', 'Portfolio Builder, from system design to production deployment.'],
];
export function About() {
  return <section id="about" data-lines={'101\n102\n103'}>
    <SectionHeading number="01" comment="the person behind the commits" filename="about.md">More than <span className="gradient">a job title.</span></SectionHeading>
    <div className="about-layout"><div className="about-copy" id="about-copy">{['about.p1', 'about.p2', 'about.p3'].map(key => <p key={key}>{CONTENT.ui[key]}</p>)}<blockquote>{CONTENT.ui['about.quote']}</blockquote></div>
      <div className="about-info"><div className="small-label">README / AT A GLANCE</div><dl>
        {[['Based in', 'Ahmedabad, Gujarat, India'], ['Languages', 'English · Hindi · Gujarati'], ['Speciality', 'Frontend → Fullstack → Architecture'], ['Approach', 'Own it. Simplify it. Share it.']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl><details className="personal-details"><summary>Personal details</summary><dl id="personal-details">
        {[['Name', 'name.v'], ['Date of birth', 'dob.v'], ['Nationality', 'nat.v'], ['Languages', 'langs.v'], ['Address', 'addr.v'], ['Key expertise', 'expertise.v']].map(([label, key]) => <div key={key}><dt>{label}</dt><dd>{CONTENT.ui['personal.' + key]}</dd></div>)}
      </dl></details></div>
    </div><div id="impact-grid" className="impact-grid">{highlights.map(([number, title, copy]) => <article className="impact" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </section>;
}

const hashes = ['a21f09e', 'c19b742', 'd18a3f0', 'e14d067'];
export function Journey({ onSelectJob, timeline }) {
  return <section id="journey" data-lines={'201\n202\n203'}>
    <SectionHeading number="02" comment="git log --oneline --career" filename="journey.git">A journey of <span className="gradient">continuous commits.</span></SectionHeading>
    <p className="section-description">From frontend foundations to enterprise system ownership. Select a milestone to open its experience details.</p>
    <div className="timeline" id="timeline"><div className="timeline-track"><i id="timeline-fill" style={{ height: `${timeline}px` }} /></div>
      {CONTENT.jobs.map((job, index) => <a className="milestone" href="#experience" data-job={index} key={job.id} onClick={() => onSelectJob(index)}><div><span className="commit-id">{hashes[index]}</span><time>{job.period}</time></div>
        <div><h3>{job.role}</h3><h4>{job.company}</h4><p>{job.summary}</p><span className="open-details">Open experience details ↗</span></div></a>)}
    </div>
  </section>;
}

export function Experience({ activeJob, onSelectJob, mobile }) {
  const tabRefs = useRef([]);
  const job = CONTENT.jobs[activeJob];
  function handleKey(event) {
    let next = activeJob;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (activeJob + 1) % CONTENT.jobs.length;
    else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (activeJob + CONTENT.jobs.length - 1) % CONTENT.jobs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = CONTENT.jobs.length - 1;
    else return;
    event.preventDefault(); onSelectJob(next); tabRefs.current[next]?.focus();
  }
  return <section id="experience" data-lines={'301\n302\n303'}>
    <SectionHeading number="03" comment="experience is the best dependency" filename="experience.js">Built in <span className="gradient">the real world.</span></SectionHeading>
    <div className="experience-layout"><div className="company-tabs" id="company-tabs" role="tablist" aria-label="Employers" aria-orientation={mobile ? 'horizontal' : 'vertical'} onKeyDown={handleKey}>
      {CONTENT.jobs.map((item, index) => <button key={item.id} ref={element => { tabRefs.current[index] = element; }} id={`company-${index}`} role="tab" aria-controls="experience-panel" aria-selected={index === activeJob} tabIndex={index === activeJob ? 0 : -1} data-job={index} className={index === activeJob ? 'active' : undefined} onClick={() => onSelectJob(index)}>{item.company.split(' Pvt.')[0]}</button>)}
    </div><div id="experience-panel" role="tabpanel" tabIndex={0} aria-labelledby={`company-${activeJob}`}>
      <div className="experience-head"><h3>{job.role}</h3><p className="company-name">{job.company}</p><p className="experience-meta">{job.period} &nbsp; / &nbsp; {job.location}</p></div><p className="experience-summary">{job.summary}</p><Tags items={job.stack} />
      <div className="experience-details">{job.sections.map(part => <div key={part.title}><h4>{part.title}</h4><ul>{part.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div>)}</div>
    </div></div>
  </section>;
}

export function Skills() {
  return <section id="skills" data-lines={'401\n402\n403'}>
    <SectionHeading number="04" comment="dependencies I reach for" filename="skills.json">The tools. <span className="gradient">The craft.</span></SectionHeading>
    <p className="section-description">From pixels to production. Portfolio proficiency ratings, between 3 and 4 on a five-point scale.</p>
    <div id="skills-grid" className="skills-grid">{CONTENT.skills.map((group, index) => <article className="skill-group" key={group.title}>
      <h3><span className="muted">0{index + 1} / </span>{group.title}</h3>{group.items.map(([name, score]) => <div className="skill-item" key={name}><div className="skill-top"><span>{name}</span><span>{score.toFixed(1)} / 5</span></div><div className="skill-bar" role="meter" aria-label={name} aria-valuemin={0} aria-valuemax={5} aria-valuenow={score}><i style={{ '--score': `${score * 20}%` }} /></div></div>)}
    </article>)}</div>
  </section>;
}

export function Projects() {
  const [category, setCategory] = useState('all');
  const count = CONTENT.projects.filter(project => category === 'all' || project.cat === category).length;
  return <section id="projects" data-lines={'501\n502\n503'}>
    <SectionHeading number="05" comment="selected work, meaningful contributions" filename="projects.tsx">Ideas turned into <span className="gradient">working systems.</span></SectionHeading>
    <div className="project-toolbar"><div className="filters" role="group" aria-label="Project category">{[['all', 'All projects'], ['enterprise', 'Enterprise'], ['platform', 'Platform & DevOps'], ['saas', 'SaaS & Web']].map(([value, label]) => <button key={value} data-filter={value} className={value === category ? 'active' : undefined} aria-pressed={value === category} onClick={() => setCategory(value)}>{label}</button>)}</div><span id="project-count" className="muted">{count} projects</span></div>
    <div className="projects-grid" id="projects-grid">{CONTENT.projects.map((project, index) => <article key={project.name} className="project" data-category={project.cat} hidden={category !== 'all' && category !== project.cat}>
      <div className="project-header"><span>◇ PROJECT_{String(index + 1).padStart(2, '0')}</span><span>{project.cat.toUpperCase()}</span></div><h3>{project.name}</h3><span className="company">{project.company}</span><p>{project.desc}</p><Tags items={project.tags} /><details><summary>Explore contributions</summary><p className="muted">{project.detail}</p></details>
    </article>)}</div>
  </section>;
}

export function Education() {
  return <section id="education" data-lines={'601\n602\n603'}>
    <SectionHeading number="06" comment="foundations for a lifetime of learning" filename="education.md">Always <span className="gradient">a student.</span></SectionHeading>
    <div id="education-grid" className="education-grid">{CONTENT.education.map(item => <article className="education-card" key={item.year}><time>{item.year}</time><h3>{item.degree}</h3><p>{item.school}</p><small>{item.board}<br />Grade: {item.grade}</small></article>)}</div>
    <div className="languages"><h3>Human languages</h3><div id="language-list">{CONTENT.spoken.map(item => <div key={item.code}><span>{{ gu: 'Gujarati', hi: 'Hindi', en: 'English' }[item.code]}</span><small>{{ native: 'Native', fluent: 'Fluent', pro: 'Professional' }[item.level]}</small></div>)}</div></div>
  </section>;
}
