(() => {
  const body = document.body;
  const stage = document.querySelector('.world-stage');
  if (!stage) return;
  const tech = stage.querySelector('.scene-tech');
  const judo = stage.querySelector('.scene-judo');
  const door = document.querySelector('.door-pass');
  const atmosphere = document.createElement('div');
  atmosphere.className = 'world-atmosphere';
  atmosphere.setAttribute('aria-hidden', 'true');
  atmosphere.innerHTML = '<div class="sakura-wind">' + Array.from({length:26},(_,i)=>`<i class="sakura-petal" style="--petal-size:${12+i%5*4}px;left:${i%4*23}%;top:${(i*37)%100}%"></i>`).join('') + '</div><svg class="circuit-wind" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="2">' + Array.from({length:12},(_,i)=>{const y=40+i*65;return `<path pathLength="1" d="M0 ${y} H${150+i%3*90} l65 -30 H${650+i%4*60} l70 60 H1200"/><circle cx="${650+i%4*60}" cy="${y-30}" r="5"/>`;}).join('') + '</svg>';
  atmosphere.append(door.querySelector('.transition-message'));
  body.append(atmosphere);
  function animateAtmosphere(world) {
    atmosphere.dataset.destination = world;
    const animations = [atmosphere.animate([{opacity:0},{opacity:1,offset:.2},{opacity:1,offset:.65},{opacity:0}],{duration:1150,fill:'forwards'})];
    if (world === 'judo') atmosphere.querySelectorAll('.sakura-petal').forEach((petal,i) => {
      animations.push(petal.animate([
        {transform:`translate3d(-45vw,${20+i%3*12}px,0) rotate(${i*23}deg)`,opacity:0},
        {opacity:.9,offset:.2},
        {transform:`translate3d(65vw,${-100-i%4*35}px,0) rotate(${i*23+280}deg)`,opacity:0}
      ],{duration:950+i%4*65,delay:i%5*22,fill:'both',easing:'cubic-bezier(.25,.45,.45,1)'}));
    });
    else atmosphere.querySelectorAll('path').forEach((path,i)=>animations.push(path.animate([
      {strokeDashoffset:1,opacity:0},{opacity:.8,offset:.15},{strokeDashoffset:0,opacity:.8,offset:.65},{strokeDashoffset:-1,opacity:0}
    ],{duration:950,delay:i*14,fill:'both',easing:'cubic-bezier(.4,0,.2,1)'})));
    return Promise.all(animations.map(animation=>animation.finished.catch(()=>{}))).finally(()=>animations.forEach(animation=>animation.cancel()));
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let busy = false;
  let current = 'tech';
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');
  let depthFrame = 0;
  let depthX = 0;
  let depthY = 0;
  function paintDepth() {
    depthFrame = 0;
    if (reduced.matches) return;
    const rect = stage.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= innerHeight) return;
    stage.style.setProperty('--depth-x', `${depthX.toFixed(2)}px`);
    stage.style.setProperty('--depth-y', `${depthY.toFixed(2)}px`);
    stage.style.setProperty('--scroll-depth', Math.min(1, Math.max(0, -rect.top / rect.height)).toFixed(3));
  }
  function queueDepth() {
    if (!depthFrame && !reduced.matches) depthFrame = requestAnimationFrame(paintDepth);
  }
  stage.addEventListener('pointermove', event => {
    if (!finePointer.matches || reduced.matches || busy) return;
    const rect = stage.getBoundingClientRect();
    depthX = ((event.clientX - rect.left) / rect.width - .5) * 18;
    depthY = ((event.clientY - rect.top) / rect.height - .5) * 12;
    queueDepth();
  }, {passive:true});
  stage.addEventListener('pointerleave', () => { depthX = depthY = 0; queueDepth(); });
  addEventListener('scroll', queueDepth, {passive:true});
  function entrance(world) {
    if (reduced.matches) return;
    const scene = world === 'tech' ? tech : judo;
    const character = scene.querySelector('.world-character');
    const background = scene.querySelector('.world-background');
    const copy = scene.querySelector('.world-copy');
    for (const el of [character, background, copy]) el.getAnimations().forEach(animation => animation.cancel());
    const easing = 'cubic-bezier(.16,1,.3,1)';
    character.animate([
      {opacity:0,translate:world === 'tech' ? '35px 14px' : '-35px 14px',filter:'blur(4px)'},
      {opacity:1,translate:'0px 0px',filter:'blur(0px)'}
    ], {duration:850,easing});
    background.animate([{transform:'scale(1.12)',filter:'blur(3px)'},{transform:'scale(1.05)',filter:'blur(0px)'}], {duration:950,easing});
    copy.animate([{opacity:0,clipPath:'inset(0 0 15% 0)',filter:'blur(3px)'},{opacity:1,clipPath:'inset(0)',filter:'blur(0px)'}], {duration:650,easing});
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      stage.style.setProperty('--depth-x','0px');
      stage.style.setProperty('--depth-y','0px');
      stage.style.setProperty('--scroll-depth','0');
      stage.querySelectorAll('.world-character,.world-background,.world-copy').forEach(el => el.getAnimations().forEach(animation => animation.cancel()));
    }
  });
  function applyWorld(world) {
    current = world;
    body.dataset.world = world;
    document.querySelectorAll('[data-world-content]').forEach(el => el.hidden = el.dataset.worldContent !== world);
    for (const [el, inactive] of [[tech, world !== 'tech'], [judo, world !== 'judo']]) {
      el.inert = inactive;
      if (inactive) el.setAttribute('aria-hidden', 'true');
      else el.removeAttribute('aria-hidden');
    }
    document.querySelectorAll('[data-switch-world]').forEach(el => {
      if (el.dataset.switchWorld === world) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
    document.querySelector('[data-project-nav]').href = world === 'judo' ? '#judo-projetos' : '#projects';
    const invitation = document.querySelector('.scroll-invitation');
    const next = world === 'tech' ? 'judo' : 'tech';
    invitation.dataset.switchWorld = next;
    invitation.href = next === 'judo' ? '#judo' : '#tecnologia';
    invitation.innerHTML = (next === 'judo' ? 'Atravessar para o judô' : 'Voltar à tecnologia') + ' <svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
    document.getElementById('contactTopic').value = world === 'judo' ? 'Judô' : 'Tecnologia e projetos';
    document.querySelector('#contact > .arte').src = world === 'judo' ? './assets/worlds/ambiente-dojo.webp' : './assets/worlds/ambiente-ti-v2.webp';
    document.querySelector('.skip-link').href = world === 'judo' ? '#judo-historia' : '#about';
    let sectionNumber = 0;
    document.querySelectorAll('main > section:not([hidden]) .section-number').forEach(el => {
      el.textContent = String(++sectionNumber).padStart(2, '0');
    });
    dispatchEvent(new CustomEvent('portfolio:worldchange',{detail:{world}}));
  }
  function resetScroll() {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({left:0, top:0, behavior:'instant'});
    document.documentElement.style.scrollBehavior = previous;
  }
  async function switchWorld(world, updateUrl = true) {
    if (busy) return;
    if (world === current) {
      resetScroll();
      if (updateUrl) history.replaceState({world}, '', world === 'judo' ? '#judo' : '#tecnologia');
      return;
    }
    busy = true;
    try {
      atmosphere.querySelector('.transition-message').textContent = world === 'judo' ? 'Do código ao tatame.' : 'Do tatame ao código.';
      door.dataset.destination = world;
      const atmosphereDone = reduced.matches ? Promise.resolve() : animateAtmosphere(world);
      if (!reduced.matches) await door.animate([{opacity:0,transform:'translateX(0)'}, {opacity:1,transform:'translateX(0)'}],
        {duration:420,easing:'ease-out',fill:'forwards'}).finished;
      applyWorld(world);
      resetScroll();
      depthX = depthY = 0;
      queueDepth();
      entrance(world);
      if (updateUrl) history.pushState({world}, '', world === 'judo' ? '#judo' : '#tecnologia');
      if (!reduced.matches) await door.animate([{opacity:1,transform:'translateX(0)'}, {opacity:0,transform:'translateX(0)'}],
        {duration:550,easing:'ease-in',fill:'forwards'}).finished;
      await atmosphereDone;
      door.getAnimations().forEach(animation => animation.cancel());
      const heading = (world === 'tech' ? tech : judo).querySelector('h2');
      heading.tabIndex = -1;
      heading.focus({preventScroll:true});
    } finally { busy = false; }
  }
  body.classList.add('worlds-ready', 'story-ready');
  applyWorld(location.hash.startsWith('#judo') ? 'judo' : 'tech');
  requestAnimationFrame(() => entrance(current));
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-switch-world]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    switchWorld(link.dataset.switchWorld);
  });
  addEventListener('popstate', () => {
    if (location.hash.startsWith('#judo')) applyWorld('judo');
    else if (['#tecnologia','#about','#desenvolvimento','#redes','#projects','#resume'].includes(location.hash)) applyWorld('tech');
    else if (history.state?.world) applyWorld(history.state.world);
  });
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('nome') || '').trim();
    const message = String(data.get('mensagem') || '').trim();
    if (!name || !message) return;
    const text = `Olá, Vinícius! Meu nome é ${name}.\nAssunto: ${data.get('assunto')}\n\n${message}`;
    window.open(`https://wa.me/5524999582526?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

