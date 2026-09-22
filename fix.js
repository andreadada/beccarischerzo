(() => {
  const commons = (file, width = 1400) =>
    `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width}`;

  const photoMap = {
    riverwalk: commons('RiverWalk.jpg'),
    dallas: commons('Dallas Skyline.jpg'),
    nasa: commons('Space Centre, Houston, Lyndon B. Johnson Space Center (158).JPG'),
    bbq: commons('A plate of Texas barbecue served at Goldee’s Barbecue in Fort Worth, Texas.jpg')
  };

  function replacementFor(img) {
    const key = `${img.alt || ''} ${img.getAttribute('src') || ''}`.toLowerCase();
    if (key.includes('brisket') || key.includes('bbq') || key.includes('barbecue')) return photoMap.bbq;
    if (key.includes('nasa') || key.includes('space center') || key.includes('space centre')) return photoMap.nasa;
    if (key.includes('san antonio') || key.includes('river walk') || key.includes('riverwalk')) return photoMap.riverwalk;
    if (key.includes('dallas')) return photoMap.dallas;
    return null;
  }

  function installImageFallback(img) {
    img.decoding = 'async';
    if (!img.closest('.hero-primary')) img.loading = 'lazy';

    const mapped = replacementFor(img);
    if (mapped) {
      img.src = mapped;
      img.removeAttribute('srcset');
    }

    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied === '1') return;
      img.dataset.fallbackApplied = '1';
      img.src = 'friend_texas.jpg';
      img.removeAttribute('srcset');
    });

    const galleryItem = img.closest('.gallery-item');
    if (galleryItem && mapped && typeof window.openModal === 'function') {
      galleryItem.onclick = () => window.openModal(mapped, img.alt || 'Texas');
    }
  }

  function setupImages() {
    document.querySelectorAll('img').forEach(installImageFallback);
  }

  function setupMobileMenu() {
    const header = document.querySelector('.expedia-header');
    const headerLeft = header?.querySelector('.header-left');
    if (!header || !headerLeft || header.querySelector('.mobile-menu-btn')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-menu-btn';
    button.setAttribute('aria-label', 'Apri menu');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>`;
    headerLeft.appendChild(button);

    const setOpen = (open) => {
      header.classList.toggle('mobile-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
      button.innerHTML = open
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>`;
    };

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      setOpen(!header.classList.contains('mobile-open'));
    });

    header.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) setOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) setOpen(false);
    });
  }

  function setupHeaderState() {
    const bar = document.getElementById('browserBar');
    const hideBtn = bar?.querySelector('.btn-toggle-bar');
    if (bar && hideBtn) {
      hideBtn.addEventListener('click', () => {
        bar.style.display = 'none';
      });
    }
  }

  const init = () => {
    setupImages();
    setupMobileMenu();
    setupHeaderState();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
