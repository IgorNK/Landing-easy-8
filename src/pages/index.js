'use strict';
// ** IMPORTS ** //
//---------------//
import './style.sass';
import {
  menuSelectors,
  cardSelectors,
  fadeTime,
  changeInterval,
  changeAmount,
} from '../utils/constants.js';
import { images } from '../components/data.js';
import { shuffle, difference } from '../utils/utility.js';

function addEventListeners() {
  const menuOpenButton = document.querySelector(menuSelectors.openButton);
  const menuCloseButton = document.querySelector(menuSelectors.closeButton);
  const menuPopup = document.querySelector(menuSelectors.popup);
  const menuButtons = Array.from(
    document.querySelectorAll(menuSelectors.menuButtons)
  );

  menuOpenButton.addEventListener('click', () => {
    menuPopup.classList.add(menuSelectors.visible);
  });

  menuCloseButton.addEventListener('click', () => {
    menuPopup.classList.remove(menuSelectors.visible);
  });

  menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      menuPopup.classList.remove(menuSelectors.visible);
    });
  });

  window.addEventListener('resize', setSlideImages);
}

function randomizeImages() {
  const container = document.querySelector(cardSelectors.container);
  const cards = Array.from(container.querySelectorAll(cardSelectors.card));
  randomizeCards(cards, images, cards.length);
  scheduleImageRandomizer(
    cards,
    images,
    changeAmount,
    fadeTime,
    changeInterval
  );
}

function randomizeCards(cards, images, amount) {
  const randImages = shuffle(images);
  let i = 0;
  while (randImages.length > 0 && i < amount) {
    const image = randImages.pop();
    cards[i].style.backgroundImage = `url(${image})`;
    i++;
  }
}

function fadeOut(card) {
  card.classList.add(cardSelectors.fade);
}

function fadeIn(card) {
  card.classList.remove(cardSelectors.fade);
}

function getUnusedImages(cards, images) {
  var cardImages = [];
  for (const card of cards) {
    const image = card.style.backgroundImage.split(`"`)[1];
    if (image != 'undefined') {
      cardImages.push(image);
    }
  }
  const unusedImages = difference(cardImages, images);
  return unusedImages;
}

function scheduleImageRandomizer(cards, images, amount, fadeTime, interval) {
  setInterval(() => {
    const randImages = shuffle(getUnusedImages(cards, images));
    const randomCards = shuffle(cards);
    const randAmount = Math.floor(Math.random() * amount + 1);
    for (let i = 0; i < randAmount; i++) {
      fadeOut(randomCards[i]);
      setTimeout(() => {
        randomCards[i].style.backgroundImage = `url(${randImages[i]})`;
        fadeIn(randomCards[i]);
      }, fadeTime);
    }
  }, fadeTime * 2 + interval);
}

function setSlideImages() {
  const images = Array.from(document.querySelectorAll('.slide-in'));
  window.addEventListener('scroll', () => {
    checkPosition(images);
  });
}

function checkPosition(images) {
  const windowHeight = window.innerHeight;
  for (const image of images) {
    var positionFromTop = image.getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= -windowHeight / 3) {
      image.classList.add('slide-in_visible');
    }
  }
}

addEventListeners();
randomizeImages();
setSlideImages();
