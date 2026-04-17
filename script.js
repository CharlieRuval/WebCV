
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebarNav');
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const sectionTitle = document.getElementById('sectionTitle');
const sectionSubtitle = document.getElementById('sectionSubtitle');
const iframe = document.getElementById('targetacciones');
const loader = document.getElementById('iframeLoader');

function showLoader() {
  if (loader) loader.classList.add('is-visible');
}

function hideLoader() {
  if (loader) loader.classList.remove('is-visible');
}

function setActiveNav(item, updateHeader = true) {
  if (!item) return;
  navItems.forEach((nav) => nav.classList.remove('is-active'));
  item.classList.add('is-active');

  if (updateHeader) {
    if (sectionTitle) sectionTitle.textContent = item.dataset.title || 'Portfolio';
    if (sectionSubtitle) sectionSubtitle.textContent = item.dataset.subtitle || '';
  }
}

function inferGroupFromPath(pathname) {
  const file = pathname.split('/').pop().toLowerCase();
  if (file === 'home.htm') return 'about';
  if (file === 'tec.htm') return 'bachelor';
  if (file === 'cinves.htm') return 'master';
  if (file === 'profesional_experience.htm') return 'experience';
  if (file === 'projects.htm' || file.startsWith('sub_pj_')) return 'projects';
  return null;
}

function syncFromIframe() {
  if (!iframe) return;

  try {
    const iframePath = iframe.contentWindow.location.pathname;
    const group = inferGroupFromPath(iframePath);
    const matchingNav = navItems.find((item) => item.dataset.group === group);

    if (matchingNav) {
      setActiveNav(matchingNav, true);
    }

    const file = iframePath.split('/').pop().toLowerCase();
    if (file.startsWith('sub_pj_')) {
      const projectHeading = iframe.contentDocument.querySelector('#encabezado');
      if (projectHeading) {
        if (sectionTitle) sectionTitle.textContent = projectHeading.textContent.trim();
        if (sectionSubtitle) sectionSubtitle.textContent = 'Project detail view within the portfolio workspace.';
      }
    }
  } catch (error) {
    // Ignore cross document access issues. Local iframe pages remain functional.
  }

  hideLoader();
}

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    showLoader();
    setActiveNav(item, true);
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (iframe) {
  showLoader();
  iframe.addEventListener('load', syncFromIframe);
}
