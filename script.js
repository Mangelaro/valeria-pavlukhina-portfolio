const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

document.querySelectorAll('[data-booking]').forEach(link => {
  link.href = `https://t.me/pavlukhina_valery?text=${encodeURIComponent(`Валерия, здравствуйте! ${link.dataset.booking}`)}`;
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let imageTrigger;
let activeImages = [];
let imageIndex = 0;
const galleryNavigation = document.querySelector('.lightbox-navigation');
const imageCounter = document.querySelector('.lightbox-counter');
const imageError = document.querySelector('.lightbox-error');
function renderImage() {
  imageError.hidden = true;
  lightboxImage.src = activeImages[imageIndex];
  lightboxImage.alt = `${imageTrigger.dataset.caption}${activeImages.length > 1 ? ` — фото ${imageIndex + 1}` : ''}`;
  imageCounter.textContent = `${imageIndex + 1} / ${activeImages.length}`;
}
function changeImage(step) {
  imageIndex = (imageIndex + step + activeImages.length) % activeImages.length;
  renderImage();
}
document.querySelectorAll('[data-image], [data-images]').forEach(button => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    activeImages = button.dataset.images ? button.dataset.images.split('|') : [button.dataset.image];
    imageIndex = 0;
    galleryNavigation.hidden = activeImages.length < 2;
    renderImage();
    lightboxCaption.textContent = button.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('lightbox-open');
  });
});
document.querySelector('.lightbox-previous').addEventListener('click', () => changeImage(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => changeImage(1));
lightbox.addEventListener('keydown', event => {
  if (activeImages.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  changeImage(event.key === 'ArrowRight' ? 1 : -1);
});
let touchStart;
lightboxImage.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
lightboxImage.addEventListener('touchend', event => {
  if (!touchStart || activeImages.length < 2) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) changeImage(dx < 0 ? 1 : -1);
  touchStart = null;
}, { passive: true });
lightboxImage.addEventListener('error', () => { imageError.hidden = false; });
lightboxImage.addEventListener('load', () => { imageError.hidden = true; });
document.querySelector('.lightbox-retry').addEventListener('click', renderImage);
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('lightbox-open');
  imageTrigger?.focus({ preventScroll: true });
});
