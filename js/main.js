'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var advert = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var COUNTS_CARD = 8;

  var calculateAddress = function (offset) {
    return (parseFloat(mapPinMain.style.left) + Math.floor(mapPinMain.offsetWidth / 2)) + ' ,' + (parseFloat(mapPinMain.style.top) + offset);
  };

  var toggleClassList = function (bool) {
    map.classList.toggle('map--faded', bool);
    advert.classList.toggle('ad-form--disabled', bool);
  };

  var inactivatePage = function () {
    toggleClassList(true);
    adFormElements.forEach(function (adFormElement) {
      adFormElement.setAttribute('disabled', true);
    });
    addressField.value = calculateAddress(Math.floor(mapPinMain.offsetHeight / 2));
  };

  var activatePage = function () {
    toggleClassList(false);
    adFormElements.forEach(function (adFormElement) {
      adFormElement.removeAttribute('disabled');
    });
    addressField.value = calculateAddress(Math.floor(mapPinMain.offsetHeight) + 11);

    mapPins.appendChild(window.pin.createFragmentPin(window.data.createSimilarCards(COUNTS_CARD)));
    map.insertBefore(window.card.createFragmentCard(window.data.createSimilarCards(COUNTS_CARD)), filtersContainer);
  };

  inactivatePage();

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      activatePage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activatePage();
    }
  });
})();
