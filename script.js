(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  $$('.chip[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy')||'';
      try{
        await navigator.clipboard.writeText(text);
        toast('Copied: ' + text);
      }catch(e){
        toast('Copy failed');
      }
    });
  });

  const term = document.querySelector('.site-header .terminal-card code');
  if (term){
    term.addEventListener('click', async () => {
      const m = term.textContent.match(/fingerprint:\s*([^\n]+)/);
      if (m){
        try{ await navigator.clipboard.writeText(m[1].trim()); toast('Fingerprint copied'); }catch{}
      }
    });
  }

  // Theme toggle
  const themes = ['theme-terminal','theme-cyber','theme-ink'];
  const key = 'cv-theme';
  const html = document.documentElement;
  const saved = localStorage.getItem(key);
  if (saved && themes.includes(saved)) {
    html.classList.remove(...themes);
    html.classList.add(saved);
  }
  const btn = $('#themeToggle');

  let foundIdx = themes.findIndex(t => html.classList.contains(t));
  let idx = foundIdx >= 0 ? foundIdx : 0;
  if (btn){
    btn.addEventListener('click', () => {
      html.classList.remove(...themes);
      idx = (idx + 1) % themes.length;
      const next = themes[idx];
      html.classList.add(next);
      localStorage.setItem(key, next);
      btn.setAttribute('aria-pressed', 'true');
      toast('Theme: ' + next.replace('theme-',''));
    });
  }

  let t;
  function toast(msg){
    clearTimeout(t);
    let el = $('#toast');
    if (!el){
      el = document.createElement('div');
      el.id = 'toast';
      Object.assign(el.style,{
        position:'fixed',left:'50%',bottom:'24px',transform:'translateX(-50%)',
        background:'rgba(0,0,0,.8)',color:'#afffd8',padding:'8px 12px',
        border:'1px solid #194a3a',borderRadius:'8px',zIndex:9999
      });
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    t = setTimeout(()=>{ el.style.opacity = '0'; }, 1600);
  }
})();
