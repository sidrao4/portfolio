/* ==========================================================================
   Intro page, Experience/Projects pages and channels.
   Content comes from js/content.js. Routes use the URL hash:
     #/experience  #/projects  (pages)     #/microcart  #/resume  #/contact  (channels)
   ========================================================================== */
(() => {
'use strict';

const S = window.SITE;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isExt = u => /^https?:/i.test(u);

/* ------------------------------------------------------------------ icons */
const svg = (inner, vb = 64, extra = '') =>
  `<svg viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extra}>${inner}</svg>`;
const T = 'fill="currentColor" fill-opacity=".14"';

const ART = {
  antenna: `<path d="M32 27v27M22 54h20M32 27L23 54M32 27l9 27M26.5 42h11"/><circle cx="32" cy="22" r="4" fill="currentColor"/><path d="M23 14a13 13 0 0 0 0 16M41 14a13 13 0 0 1 0 16M16 9a22 22 0 0 0 0 26M48 9a22 22 0 0 1 0 26"/>`,
  music: `<circle cx="20" cy="46" r="7" ${T}/><circle cx="42" cy="41" r="7" ${T}/><path d="M27 46V17l22-5v29M27 26l22-5"/>`,
  mic: `<rect x="24" y="7" width="16" height="30" rx="8" ${T}/><path d="M15 29a17 17 0 0 0 34 0M32 46v10M23 56h18"/>`,
  search: `<circle cx="27" cy="27" r="16" ${T}/><path d="M39 39l16 16M20 23h14M20 31h9"/>`,
  briefcase: `<rect x="8" y="20" width="48" height="34" rx="7" ${T}/><path d="M24 20v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4M8 35h48M28 35v6h8v-6"/>`,
  folder: `<path d="M8 17a4 4 0 0 1 4-4h14l6 7h20a4 4 0 0 1 4 4v25a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z" ${T}/>`,
  plus: `<circle cx="32" cy="32" r="22" stroke-dasharray="4 6"/><path d="M32 22v20M22 32h20"/>`,
  resume: `<path d="M17 8h22l10 10v38H17z" ${T}/><path d="M39 8v10h10"/><circle cx="33" cy="30" r="5"/><path d="M24 46a9 9 0 0 1 18 0"/>`,
  mail: `<rect x="8" y="14" width="48" height="36" rx="7" ${T}/><path d="M11 20l21 15 21-15"/>`,
  doc: `<path d="M17 8h22l10 10v38H17z" ${T}/><path d="M39 8v10h10M24 30h18M24 38h18M24 46h10"/>`,
};
const artSVG = name => svg(ART[name] || ART.doc);
const I = {
  ext: svg('<path d="M24 8h16v16M40 8L20 28M32 34v8a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4h8"/>', 48),
  dl: svg('<path d="M24 8v24M14 24l10 10 10-10M8 40h32"/>', 48),
  reload: svg('<path d="M38 24a14 14 0 1 1-4.5-10.3M38 8v8h-8"/>', 48),
  phone: svg('<rect x="13" y="5" width="22" height="38" rx="5"/><path d="M21 37h6"/>', 48),
  close: svg('<path d="M10 10l28 28M38 10L10 38"/>', 48, 'stroke-width="5"'),
  chevL: svg('<path d="M30 8L14 24l16 16"/>', 48, 'stroke-width="5"'),
  chevR: svg('<path d="M18 8l16 16-16 16"/>', 48, 'stroke-width="5"'),
  chevD: svg('<path d="M8 16l16 16 16-16"/>', 48, 'stroke-width="5"'),
  home: svg('<path d="M6 23L24 8l18 15M11 20v20h9V30h8v10h9V20"/>', 48, 'stroke-width="3.5"'),
  mail: svg(ART.mail),
};

/* ------------------------------------------------------------------- data */
const CONTACT = { id: 'contact', title: 'Message Board', subtitle: 'Get in touch', meta: S.email, kind: 'Contact', color: '#1ea7e1', art: 'mail', contact: true };
const secById = new Map(S.sections.map(s => [s.id, s]));
const chById = new Map();
S.sections.forEach(s => s.channels.forEach(c => chById.set(c.id, { ch: c, parent: s.id })));
chById.set(S.resume.id, { ch: S.resume, parent: null });
chById.set('contact', { ch: CONTACT, parent: null });

const stage = $('#stage'), homeEl = $('#view-home'), secEl = $('#view-section'), channelEl = $('#channel');
const orbHome = $('#orb-home'), orbMail = $('#orb-mail');
let curView = 'home', currentCh = null, pendingFrom = null, lastFrom = null, firstRoute = true;

/* ------------------------------------------------------------------ intro */
function renderHome() {
  const it = S.intro;
  let i = 0;
  const name = S.name.split(' ').map(w => `<span class="w" aria-hidden="true">${[...w].map(ch => `<span class="ch" style="--i:${i++}">${esc(ch)}</span>`).join('')}</span>`).join(' ');
  homeEl.innerHTML = `
    <div class="home-inner">
      <div class="hero">
        <div class="hero-text">
          <p class="status"><span class="dot" aria-hidden="true"></span>${esc(S.status)}</p>
          <p class="hi">${esc(it.greeting)}</p>
          <h1 class="name" aria-label="${esc(S.name)}">${name}</h1>
          <p class="sub">${esc(S.title)}</p>
          <p class="build">I build <span class="rotor" aria-label="${esc(it.build.join(', '))}">${it.build.map((w, k) => `<span class="rw${k === 0 ? ' on' : ''}" aria-hidden="${k !== 0}">${esc(w)}</span>`).join('')}</span></p>
          ${it.bio.map(p => `<p class="bio">${esc(p)}</p>`).join('')}
          <div class="skills" aria-label="Skills">${it.skills.map((s, k) => `<span style="--i:${k}">${esc(s)}</span>`).join('')}</div>
        </div>
        <div class="photo-wrap">
          <div class="photo-float">
            <div class="photo-card"><img src="${esc(it.photo)}" alt="${esc(it.photoAlt || S.name)}" style="object-position:${esc(it.photoPos || '50% 50%')}"><i class="gloss"></i></div>
            ${(it.chips || []).map((c, k) => `<span class="float-chip c${k + 1}">${esc(c)}</span>`).join('')}
          </div>
        </div>
      </div>
      <nav class="navtiles" aria-label="Sections">
        ${S.nav.map((n, k) => `<button class="navbtn" data-nav="${esc(n.id)}" style="--c:${esc(n.color)};--n:${k}">
          <span class="nb-ico">${artSVG(n.art)}</span>
          <span class="nb-text"><b>${esc(n.label)}</b><small>${esc(n.caption)}</small></span>
          ${I.chevR.replace('<svg', '<svg class="nb-go"')}
        </button>`).join('')}
      </nav>
    </div>`;
}

// "I build [rotating words]"
function startRotor() {
  const words = $$('.rw', homeEl);
  if (words.length < 2 || reduced()) return;
  let i = 0;
  setInterval(() => {
    if (document.hidden || curView !== 'home' || currentCh) return;
    const cur = words[i]; i = (i + 1) % words.length; const nxt = words[i];
    cur.classList.remove('on'); cur.classList.add('out'); nxt.classList.add('on');
    setTimeout(() => cur.classList.remove('out'), 560);
  }, 2700);
}

// Photo tilt and bubble drift follow the pointer, eased.
function startParallax() {
  if (reduced() || !matchMedia('(pointer: fine)').matches) return;
  const root = document.documentElement;
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const step = () => {
    cx += (tx - cx) * .08; cy += (ty - cy) * .08;
    root.style.setProperty('--px', cx.toFixed(3)); root.style.setProperty('--py', cy.toFixed(3));
    raf = Math.abs(tx - cx) > .002 || Math.abs(ty - cy) > .002 ? requestAnimationFrame(step) : 0;
  };
  addEventListener('pointermove', e => { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; if (!raf) raf = requestAnimationFrame(step); });
}

/* ---------------------------------------------------------------- sections */
function tileHTML(ch, n) {
  const art = ch.image
    ? `<img src="${esc(ch.image)}" alt="" style="object-position:${esc(ch.imagePos || '50% 50%')}">`
    : artSVG(ch.art);
  return `<button class="tile" data-id="${esc(ch.id)}" style="--c:${esc(ch.color)};--n:${n}" aria-label="${esc(ch.title)}${ch.subtitle ? ', ' + esc(ch.subtitle) : ''}">
    <span class="tile-art">${art}<i class="gloss"></i></span>
    <span class="tile-label"><b>${esc(ch.title)}</b><small>${esc(ch.subtitle || '')}</small>${ch.blurb ? `<span class="blurb">${esc(ch.blurb)}</span>` : ''}</span>
  </button>`;
}
function sectionHTML(sec) {
  const cols = 4, slots = Math.max(0, Math.ceil(sec.channels.length / cols) * cols - sec.channels.length);
  let n = 0;
  return `<div class="sec">
    <header class="sec-head"><button class="crumb" data-crumb>${I.chevL}Home</button><div class="sec-titles"><h2>${esc(sec.title)}</h2><p>${esc(sec.blurb || '')}</p></div></header>
    <div class="sec-grid">${sec.channels.map(c => tileHTML(c, n++)).join('')}${'<div class="slot" aria-hidden="true"></div>'.repeat(slots)}</div>
    <p class="sec-hint">Select a channel to open it.</p>
  </div>`;
}

/* -------------------------------------------------- views (slide + fade) */
const cancelAnims = el => (el._anims || []).forEach(a => a.cancel());
function setView(id, animate) {
  if (id === curView) return;
  const from = curView === 'home' ? homeEl : secEl;
  let to;
  if (id === 'home') to = homeEl; else { secEl.innerHTML = sectionHTML(secById.get(id)); secEl.scrollTop = 0; to = secEl; }
  const dir = id === 'home' ? -1 : 1;
  curView = id;
  [from, to].forEach(cancelAnims);
  to.classList.remove('is-hidden');
  to.inert = !!currentCh;
  if (from === to) return;
  const hideFrom = () => { from.classList.add('is-hidden'); from.inert = true; };
  if (!animate || reduced()) { hideFrom(); return; }
  const a = to.animate([{ opacity: 0, transform: `translateX(${46 * dir}px) scale(.985)` }, { opacity: 1, transform: 'none' }], { duration: 460, easing: 'cubic-bezier(.2,.8,.2,1)' });
  const b = from.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-46 * dir}px) scale(.985)` }], { duration: 280, easing: 'ease-in', fill: 'forwards' });
  to._anims = [a]; from._anims = [b];
  b.onfinish = () => { hideFrom(); b.cancel(); };
}

/* ---------------------------------------------------------------- channels */
const linkHTML = l => {
  if (!l.url) return `<span class="btn sm disabled" aria-disabled="true" title="Link coming soon">${esc(l.label)} <small>add link</small></span>`;
  const ext = isExt(l.url);
  return `<a class="btn" href="${esc(l.url)}" ${ext ? 'target="_blank" rel="noopener"' : ''} ${l.download ? `download="${esc(l.download === true ? '' : l.download)}"` : ''}>${esc(l.label)}${l.download ? I.dl : ext ? I.ext : ''}</a>`;
};

function screenHTML(ch) {
  const m = ch.media;
  if (!m) {
    const soon = ch.soon || { title: 'Demo coming soon', text: `Photos, screenshots and a walkthrough of ${ch.title} will go here.` };
    return `<div class="screen"><div class="soon" style="--c:${esc(ch.color)}">${artSVG(ch.art)}<b>${esc(soon.title)}</b><span>${esc(soon.text)}</span></div></div>`;
  }
  if (m.type === 'image' && m.fit === 'scroll') return `<div class="screen">
    <div class="screen-bar"><span class="url">${esc(m.label || m.src)}</span><a class="btn sm" href="${esc(m.src)}" target="_blank" rel="noopener">Open${I.ext}</a></div>
    <div class="screen-view scroll" tabindex="0" role="region" aria-label="${esc(m.alt || ch.title)}, scrollable"><img src="${esc(m.src)}" alt="${esc(m.alt || ch.title)}"></div>
    <div class="scroll-hint" aria-hidden="true">Scroll to read the full poster${I.chevD}</div>
  </div>`;
  if (m.type === 'image') return `<div class="screen"><div class="screen-view"><img src="${esc(m.src)}" alt="${esc(m.alt || ch.title)}" style="object-position:${esc(m.pos || '50% 50%')}"></div></div>`;
  const isPdf = m.type === 'pdf';
  const url = isPdf ? m.src : m.url;
  const frame = isPdf
    ? `<iframe src="${esc(url)}#view=FitH&navpanes=0" title="${esc(ch.title)} PDF"></iframe>`
    : `<iframe src="${esc(url)}" title="${esc(ch.title)} demo" referrerpolicy="strict-origin-when-cross-origin"
         sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
         allow="${esc(m.allow || 'fullscreen; clipboard-write')}"></iframe>`;
  return `<div class="screen">
    <div class="screen-bar">
      <span class="url" title="${esc(m.label || url)}">${esc(m.label || url.replace(/^https?:\/\//, ''))}</span>
      ${isPdf ? '' : `<button class="btn sm" data-act="reload">${I.reload}Reload</button><button class="btn sm" data-act="phone">${I.phone}Phone</button>`}
      <a class="btn sm" href="${esc(url)}" target="_blank" rel="noopener">Open${I.ext}</a>
    </div>
    <div class="screen-view"><div class="loader"><i></i></div>${frame}</div>
  </div>${m.note ? `<p class="screen-note">${esc(m.note)}</p>` : ''}`;
}

function infoHTML(ch) {
  const blocks = [];
  (ch.sections || []).forEach(s => {
    let h = `<h3>${esc(s.title)}</h3>`;
    if (s.text) h += s.text.map(p => `<p>${esc(p)}</p>`).join('');
    if (s.list) h += `<ul>${s.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    blocks.push(h);
  });
  if (ch.tags && ch.tags.length) blocks.push(`<h3>${ch.kind === 'Project' || ch.kind === 'Experience' ? 'Built with' : 'Skills'}</h3><div class="tags">${ch.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>`);
  if (ch.links && ch.links.length) blocks.push(`<h3>Links</h3><div class="links">${ch.links.map(linkHTML).join('')}</div>`);
  return blocks.map((b, i) => `<section class="blk" style="--i:${i}">${b}</section>`).join('');
}

function contactHTML() {
  const links = [{ label: 'Email', url: `mailto:${S.email}`, handle: S.email }, ...(S.links || [])];
  return `<div class="contact">
    <form autocomplete="off">
      <div class="field"><label for="c-name">Your name</label><input id="c-name" name="name" type="text"></div>
      <div class="field"><label for="c-sub">Subject</label><input id="c-sub" name="subject" type="text" placeholder="Say hi"></div>
      <div class="field"><label for="c-msg">Message</label><textarea id="c-msg" name="message"></textarea></div>
      <button class="btn primary" type="submit">Send message</button>
      <p class="note">Opens your email app with the message filled in, addressed to ${esc(S.email)}.</p>
    </form>
    <div class="side">
      ${links.map((l, i) => l.url
        ? `<a class="btn" style="--i:${i}" href="${esc(l.url)}" ${isExt(l.url) ? 'target="_blank" rel="noopener"' : ''}><span>${esc(l.label)}<small>${esc(l.handle || '')}</small></span>${isExt(l.url) ? I.ext : ''}</a>`
        : `<span class="btn disabled" style="--i:${i}" aria-disabled="true"><span>${esc(l.label)}<small>${esc(l.handle || 'add link')}</small></span></span>`).join('')}
    </div>
  </div>`;
}

function channelHTML(ch) {
  const chip = ch.image ? `<span class="chip"><img src="${esc(ch.image)}" alt="" style="object-position:${esc(ch.imagePos || '50% 50%')}"></span>` : `<span class="chip">${artSVG(ch.art)}</span>`;
  const sub = [ch.subtitle, ch.meta].filter(Boolean).join(' · ');
  return `<header class="channel-head">
      ${chip}
      <div class="titles"><h2 id="channel-title" tabindex="-1">${esc(ch.title)}</h2><p>${esc(sub)}</p></div>
      ${ch.badge ? `<span class="badge">${esc(ch.badge)}</span>` : ''}
      <span class="kind">${esc(ch.kind)}</span>
      <button class="close" data-act="close" aria-label="Close">${I.close}</button>
    </header>
    ${ch.contact ? contactHTML() : `<div class="channel-body"><div class="screen-col">${screenHTML(ch)}</div><aside class="info-col">${infoHTML(ch)}</aside></div>`}`;
}

function wireChannel() {
  const view = $('.screen-view', channelEl), iframe = $('iframe', channelEl), loader = $('.loader', channelEl);
  const done = () => loader && loader.classList.add('done');
  if (iframe) { iframe.addEventListener('load', done); setTimeout(done, 8000); }
  const poster = $('.screen-view.scroll', channelEl);
  if (poster) poster.addEventListener('scroll', () => { if (poster.scrollTop > 24) poster.closest('.screen').classList.add('seen'); }, { passive: true });
  const form = $('form', channelEl);
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const sub = encodeURIComponent(f.get('subject') || `Hello from ${f.get('name') || 'your website'}`);
    const msg = encodeURIComponent(`${f.get('message') || ''}\n\n${f.get('name') ? '- ' + f.get('name') : ''}`);
    location.href = `mailto:${S.email}?subject=${sub}&body=${msg}`;
  });
  channelEl.onclick = e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    if (act === 'close') closeToParent();
    if (act === 'reload' && iframe) { loader.classList.remove('done'); iframe.setAttribute('src', iframe.getAttribute('src')); setTimeout(done, 8000); }
    if (act === 'phone' && view) { const on = view.classList.toggle('phone'); b.lastChild.textContent = on ? 'Desktop' : 'Phone'; }
  };
}

const inertViews = flag => [homeEl, secEl].forEach(v => { v.inert = flag || v.classList.contains('is-hidden'); });

function openChannel(id, from, animate) {
  const ch = chById.get(id).ch;
  currentCh = id;
  channelEl.style.setProperty('--c', ch.color);
  channelEl.innerHTML = channelHTML(ch);
  wireChannel();
  channelEl.hidden = false; channelEl.inert = false;
  stage.classList.add('dim'); inertViews(true);
  orbMail.setAttribute('aria-pressed', id === 'contact' ? 'true' : 'false');

  channelEl.getAnimations().forEach(a => a.cancel());
  if (animate && !reduced()) {
    const c = channelEl.getBoundingClientRect();
    const r = from && document.contains(from) ? from.getBoundingClientRect() : null;
    if (r && r.width) {
      // the panel grows out of the tile or button it came from
      channelEl.animate([
        { clipPath: `inset(${r.top - c.top}px ${c.right - r.right}px ${c.bottom - r.bottom}px ${r.left - c.left}px round 20px)`, opacity: .25 },
        { clipPath: 'inset(0px 0px 0px 0px round 24px)', opacity: 1 },
      ], { duration: 420, easing: 'cubic-bezier(.22,.8,.2,1)' });
    } else {
      channelEl.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' });
    }
  }
  $('#channel-title', channelEl).focus({ preventScroll: true });
}

function closeChannel() {
  if (!currentCh) return;
  const from = lastFrom && document.contains(lastFrom) ? lastFrom : null;
  currentCh = null;
  stage.classList.remove('dim'); inertViews(false);
  orbMail.setAttribute('aria-pressed', 'false');
  const hide = () => { if (!currentCh) { channelEl.hidden = true; channelEl.inert = true; channelEl.innerHTML = ''; } };
  channelEl.getAnimations().forEach(a => a.cancel());
  if (reduced()) { hide(); return; }
  const c = channelEl.getBoundingClientRect(), r = from ? from.getBoundingClientRect() : null;
  const to = r && r.width && !from.closest('.is-hidden')
    ? { clipPath: `inset(${r.top - c.top}px ${c.right - r.right}px ${c.bottom - r.bottom}px ${r.left - c.left}px round 20px)`, opacity: .2 }
    : { clipPath: 'inset(0px round 24px)', opacity: 0 };
  const a = channelEl.animate([{ clipPath: 'inset(0px 0px 0px 0px round 24px)', opacity: 1 }, to], { duration: 300, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
  a.onfinish = hide;
  if (from && !from.closest('.is-hidden')) from.focus({ preventScroll: true });
}

/* ----------------------------------------------------------------- routing */
const hashId = () => (location.hash.match(/^#\/?([\w-]+)/) || [])[1] || null;
const baseURL = () => location.href.split('#')[0];

function route() {
  const id = hashId();
  let view = 'home', chId = null;
  if (id && secById.has(id)) view = id;
  else if (id && chById.has(id)) { chId = id; view = chById.get(id).parent || (firstRoute ? 'home' : curView); }
  const animate = !firstRoute;
  setView(view, animate);
  if (chId) { if (chId !== currentCh) openChannel(chId, pendingFrom, animate); }
  else if (currentCh) closeChannel();
  pendingFrom = null; firstRoute = false;
}
function go(id, from) {
  pendingFrom = from || null;
  if (id) lastFrom = from || null;
  const url = id ? '#/' + id : baseURL();
  try { history.pushState({ ui: true }, '', url); } catch (_) { location.hash = id ? '#/' + id : ''; return; }
  route();
}
function back() {                                   // step back one screen
  if (history.state && history.state.ui) { history.back(); return; }
  const p = currentCh && chById.get(currentCh).parent;
  const url = p ? '#/' + p : baseURL();
  try { history.replaceState(null, '', url); } catch (_) { location.hash = p ? '#/' + p : ''; return; }
  route();
}
const closeToParent = back;
addEventListener('popstate', route);
addEventListener('hashchange', route);

/* ------------------------------------------------------------------ events */
homeEl.addEventListener('click', e => { const b = e.target.closest('[data-nav]'); if (b) go(b.dataset.nav, b); });
secEl.addEventListener('click', e => {
  const t = e.target.closest('.tile'); if (t) { go(t.dataset.id, t); return; }
  if (e.target.closest('[data-crumb]')) back();
});
$('#scrim').addEventListener('click', () => { if (currentCh) back(); });
orbHome.addEventListener('click', () => { if (currentCh || curView !== 'home') go('', orbHome); });
orbMail.addEventListener('click', () => { if (currentCh === 'contact') back(); else go('contact', orbMail); });
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (currentCh) back(); else if (curView !== 'home') back();
});

// soft ripple on anything pressable
document.addEventListener('pointerdown', e => {
  if (reduced()) return;
  const t = e.target.closest('.navbtn, .tile, .orb, .btn:not(.disabled), .close, .crumb'); if (!t) return;
  const r = t.getBoundingClientRect(), d = Math.max(r.width, r.height) * 1.25;
  const s = document.createElement('span');
  s.className = 'ripple';
  s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
  t.appendChild(s);
  s.addEventListener('animationend', () => s.remove());
});

/* ------------------------------------------------------------------- clock */
function tick() {
  const d = new Date();
  let h = d.getHours(); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
  $('#time').innerHTML = `${h}:${String(d.getMinutes()).padStart(2, '0')}<small>${ap}</small>`;
  $('#date').textContent = d.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' });
}

/* -------------------------------------------------------------------- init */
document.title = S.name;
orbHome.innerHTML = `${I.home}<span>Home</span>`;
orbMail.innerHTML = I.mail;
renderHome();
startRotor();
startParallax();
tick(); setInterval(tick, 15000);
route();
})();
