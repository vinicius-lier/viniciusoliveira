(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const slides = [...document.querySelectorAll('.sensei-story-slide')];
  const ease = 'cubic-bezier(.16,1,.3,1)';
  let storyIndex = 0;
  let storyBusy = false;
  document.querySelectorAll('[data-story-step]').forEach(button => button.addEventListener('click', async () => {
    if (storyBusy) return;
    storyBusy = true;
    try {
      const previous = slides[storyIndex];
      if (!reduced.matches) await previous.animate([{opacity:1},{opacity:0}],{duration:140,fill:'forwards'}).finished;
      previous.getAnimations().forEach(animation => animation.cancel());
      storyIndex = (storyIndex + Number(button.dataset.storyStep) + slides.length) % slides.length;
      slides.forEach((slide, index) => slide.hidden = index !== storyIndex);
      document.querySelector('[data-story-counter]').textContent = `${storyIndex + 1} / ${slides.length}`;
      if (!reduced.matches) slides[storyIndex].animate([{opacity:0,translate:'0 8px'},{opacity:1,translate:'0 0'}],{duration:380,easing:ease});
    } finally { storyBusy = false; }
  }));
  // Visible by default: motion enhances the content without gating access to it.
  const arrivals = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.closest('[hidden]')) return;
    if (!reduced.matches) {
      const panel = entry.target.querySelector('.sensei-panel,.section__panel');
      if (panel) panel.animate([{opacity:.55,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:ease});
      const art = entry.target.querySelector(':scope > .arte');
      if (art) art.animate([{opacity:0},{opacity:getComputedStyle(art).opacity}],{duration:850,easing:ease});
    }
    arrivals.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('main > .art-section').forEach(section => arrivals.observe(section));
  document.querySelectorAll('.sensei-year').forEach(year => year.addEventListener('toggle', () => {
    if (year.open && !reduced.matches) year.querySelector('.sensei-year-body').animate([{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:ease});
  }));
  const gallery = document.getElementById('senseiGallery');
  const counter = document.getElementById('senseiGalleryCount');
  const retry = document.getElementById('senseiGalleryRetry');
  const modal = document.getElementById('senseiLightbox');
  const large = document.getElementById('senseiLightboxImage');
  const caption = document.getElementById('senseiLightboxCaption');
  const pageSize = 12;
  let items = [];
  let page = 0;
  let activeImage = 0;
  let loading = false;
  let returnFocus = null;
  document.querySelectorAll('[data-gallery-step]').forEach(button => button.disabled = true);
  function renderPage() {
    gallery.replaceChildren();
    const from = page * pageSize;
    items.slice(from, from + pageSize).forEach((item, offset) => {
      const index = from + offset;
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Abrir foto ${index + 1} do acervo`);
      button.dataset.photoIndex = index;
      const image = document.createElement('img');
      image.src = './' + item.thumb;
      image.alt = item.title || `Registro ${index + 1} do acervo de judô de Vinícius`;
      image.loading = 'lazy';
      image.width = 480;
      image.height = 360;
      button.append(image);
      gallery.append(button);
    });
    if (!reduced.matches) gallery.animate([{opacity:.15},{opacity:1}],{duration:380,easing:ease});
    counter.textContent = `${from + 1}–${Math.min(from + pageSize, items.length)} de ${items.length} fotos`;
    document.querySelectorAll('[data-gallery-step]').forEach(button => {
      button.disabled = Number(button.dataset.galleryStep) < 0 ? page === 0 : from + pageSize >= items.length;
    });
  }
  async function loadGallery() {
    if (items.length || loading) return;
    loading = true;
    document.querySelectorAll('[data-gallery-step]').forEach(button => button.disabled = true);
    gallery.textContent = 'Carregando o acervo…';
    retry.hidden = true;
    try {
      const response = await fetch('./assets/sensei/gallery.json');
      if (!response.ok) throw new Error('gallery');
      const data = await response.json();
      if (!Array.isArray(data) || !data.length) throw new Error('empty gallery');
      items = data;
      renderPage();
    } catch {
      gallery.textContent = 'Não foi possível carregar as fotos. Tente novamente.';
      retry.hidden = false;
    } finally { loading = false; }
  }
  retry.addEventListener('click',loadGallery);
  function showPhoto(index) {
    activeImage = (index + items.length) % items.length;
    const item = items[activeImage];
    large.src = './' + item.full;
    large.alt = item.title || `Registro ${activeImage + 1} do acervo de judô de Vinícius`;
    caption.textContent = item.title || `Foto ${activeImage + 1} de ${items.length}`;
  }
  gallery.addEventListener('click',event => {
    const button = event.target.closest('[data-photo-index]');
    if (!button) return;
    returnFocus = button;
    showPhoto(Number(button.dataset.photoIndex));
    modal.showModal();
  });
  document.querySelectorAll('[data-gallery-step]').forEach(button => button.addEventListener('click',()=>{
    page = Math.max(0, Math.min(Math.ceil(items.length / pageSize) - 1, page + Number(button.dataset.galleryStep)));
    renderPage();
  }));
  modal.querySelector('.sensei-lightbox-close').addEventListener('click',()=>modal.close());
  modal.querySelector('.sensei-lightbox-prev').addEventListener('click',()=>showPhoto(activeImage - 1));
  modal.querySelector('.sensei-lightbox-next').addEventListener('click',()=>showPhoto(activeImage + 1));
  modal.addEventListener('keydown',event=>{
    if (event.key === 'ArrowLeft') {event.preventDefault();showPhoto(activeImage - 1);}
    if (event.key === 'ArrowRight') {event.preventDefault();showPhoto(activeImage + 1);}
  });
  modal.addEventListener('click',event=>{
    if (event.target !== modal) return;
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
  });
  modal.addEventListener('close',()=>{
    if (returnFocus?.isConnected && !returnFocus.closest('[hidden]')) returnFocus.focus({preventScroll:true});
  });
  addEventListener('portfolio:worldchange',event=>{
    if (event.detail.world === 'judo') loadGallery();
    else if (modal.open) modal.close();
  });
  if (document.body.dataset.world === 'judo') loadGallery();
})();
