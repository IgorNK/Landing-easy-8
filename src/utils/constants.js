const menuSelectors = {
  popup: '.popup-menu',
  visible: 'popup-menu_visible',
  closeButton: '.popup-menu__close-button',
  openButton: '.header__menu-button',
  menuButtons: '.popup-menu__menu-button',
};

const cardSelectors = {
  container: '.looks__image-grid',
  card: '.looks__image-card',
  fade: 'looks__image-card_fade',
};

const fadeTime = 500;
const changeInterval = 300;
const changeAmount = 3;

export { menuSelectors, cardSelectors, fadeTime, changeInterval, changeAmount };
