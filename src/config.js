export const files = [
  ['home', 'welcome.tsx', 'Welcome', 'ts', 'TS'],
  ['about', 'about.md', 'About', 'md', 'M↓'],
  ['journey', 'journey.git', 'Career timeline', 'git', '⑂'],
  ['experience', 'experience.js', 'Experience', 'js', 'JS'],
  ['skills', 'skills.json', 'Skills', 'json', '{ }'],
  ['projects', 'projects.tsx', 'Projects', 'react', '◇'],
  ['education', 'education.md', 'Education', 'md', 'M↓'],
  ['terminal', 'terminal.sh', 'Interactive terminal', 'green', '>_'],
  ['contact', 'contact.css', 'Contact', 'css', '#'],
];
export const themes = [
  ['system', 'System (Dracula)'], ['midnight', 'Midnight'], ['light', 'Light'],
  ['nord', 'Nord'], ['dracula', 'Dracula'], ['monokai', 'Monokai'],
];
export const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
