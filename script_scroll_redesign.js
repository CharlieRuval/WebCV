const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const currentYear = document.getElementById('currentYear');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalButtons = document.querySelectorAll('.open-modal');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function closeAllModals() {
  modals.forEach((modal) => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  });
  modalBackdrop.hidden = true;
  document.body.classList.remove('modal-open');
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  closeAllModals();
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
}

modalButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modal));
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeAllModals);
});

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeAllModals);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAllModals();
  }
});
