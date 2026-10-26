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
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.dataset.caption;
    lightboxCaption.textContent = button.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('lightbox-open');
  });
});
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
