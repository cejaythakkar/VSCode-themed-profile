// Apply before styles load to avoid a flash of the wrong theme.
(() => {
 const themes=['system','midnight','light','nord','dracula','monokai'];
 let selection='system';
 try{const saved=localStorage.getItem('jay-vscode-theme');if(themes.includes(saved))selection=saved;}catch{/* Storage may be unavailable in private/file contexts. */}
 function apply(){
  const resolved=selection==='system'?'dracula':selection;
  document.documentElement.dataset.theme=resolved;
  document.documentElement.style.colorScheme=resolved==='light'?'light':'dark';
  const colors={midnight:'#11141d',light:'#f8f9fc',nord:'#2e3440',dracula:'#282a36',monokai:'#272822'};
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',colors[resolved]);
 }
 window.portfolioTheme={get:()=>selection,set(value){if(!themes.includes(value))return;selection=value;try{localStorage.setItem('jay-vscode-theme',selection);}catch{}apply();}};
 apply();
})();
