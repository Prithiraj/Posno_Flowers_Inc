const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) document.documentElement.classList.add('motion-ready');

// Mobile navigation
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  };

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    mobileMenu.hidden = open;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

// Motion is progressive enhancement. Content remains visible without JS.
const reveals = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  reveals.forEach((el) => observer.observe(el));
}

// Accessible lightbox for the editorial gallery.
const dialog = document.querySelector('[data-lightbox]');
const dialogImage = document.querySelector('[data-lightbox-image]');
const dialogClose = document.querySelector('[data-lightbox-close]');
let lastGalleryTrigger = null;

if (dialog && dialogImage) {
  document.querySelectorAll('[data-lightbox-src]').forEach((button) => {
    button.addEventListener('click', () => {
      lastGalleryTrigger = button;
      dialogImage.src = button.dataset.lightboxSrc;
      dialogImage.alt = button.dataset.lightboxAlt || '';
      dialog.showModal();
      dialogClose?.focus();
    });
  });

  const closeDialog = () => {
    if (dialog.open) dialog.close();
  };

  dialogClose?.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener('close', () => {
    dialogImage.removeAttribute('src');
    lastGalleryTrigger?.focus();
  });
}

// Footer year.
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

// Optional Three.js accent: a small field of slow, translucent petals behind the hero.
// It never replaces photography, it is disabled for reduced motion, and the page remains complete if the CDN/WebGL fails.
async function initPetals() {
  if (reducedMotion) return;
  const root = document.querySelector('[data-three-root]');
  if (!root || !('WebGLRenderingContext' in window)) return;

  try {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js');
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 3;

    const geometry = new THREE.CircleGeometry(0.035, 12);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xb35b63, transparent: true, opacity: 0.16, depthWrite: false }),
      new THREE.MeshBasicMaterial({ color: 0xd39c7d, transparent: true, opacity: 0.14, depthWrite: false }),
      new THREE.MeshBasicMaterial({ color: 0x7a2d3b, transparent: true, opacity: 0.09, depthWrite: false })
    ];

    const petals = Array.from({ length: 20 }, (_, index) => {
      const petal = new THREE.Mesh(geometry, materials[index % materials.length]);
      petal.scale.set(1.0, 0.48, 1);
      petal.position.set((Math.random() * 2 - 1) * 1.15, Math.random() * 2.3 - 1.1, 0);
      petal.rotation.z = Math.random() * Math.PI;
      petal.userData.speed = 0.00005 + Math.random() * 0.00006;
      petal.userData.drift = Math.random() * Math.PI * 2;
      scene.add(petal);
      return petal;
    });

    let width = 0;
    let height = 0;
    const resize = () => {
      width = root.clientWidth;
      height = root.clientHeight;
      renderer.setSize(width, height, false);
      const aspect = width / Math.max(height, 1);
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let last = performance.now();
    let raf = 0;
    const tick = (now) => {
      const delta = Math.min(now - last, 34);
      last = now;
      petals.forEach((petal, index) => {
        petal.position.y -= petal.userData.speed * delta;
        petal.position.x += Math.sin(now * 0.00035 + petal.userData.drift) * 0.00009 * delta;
        petal.rotation.z += 0.00009 * delta * (index % 2 ? 1 : -1);
        if (petal.position.y < -1.15) {
          petal.position.y = 1.15;
          petal.position.x = (Math.random() * 2 - 1) * Math.max(1.1, width / Math.max(height, 1));
        }
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
  } catch (error) {
    // Static hero remains intact if Three.js cannot load or WebGL is unavailable.
    console.info('Petal enhancement unavailable:', error);
  }
}

initPetals();
