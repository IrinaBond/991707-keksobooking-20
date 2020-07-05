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

  var toggleClassList = function (bool) {
    map.classList.toggle('map--faded', bool);
    advert.classList.toggle('ad-form--disabled', bool);
  };

  var inactivatePage = function () {
    toggleClassList(true);
    adFormElements.forEach(function (adFormElement) {
      adFormElement.setAttribute('disabled', true);
    });
    addressField.value = window.util.calculateAddress(Math.floor(mapPinMain.offsetHeight / 2));
  };

  inactivatePage();

  var activatePage = function () {
    toggleClassList(false);
    adFormElements.forEach(function (adFormElement) {
      adFormElement.removeAttribute('disabled');
    });
    addressField.value = window.util.calculateAddress(Math.floor(mapPinMain.offsetHeight) + 22);

    var SimilarCardList = window.data.createSimilarCards(COUNTS_CARD);
    mapPins.appendChild(window.pin.createFragmentPin(SimilarCardList));
    map.insertBefore(window.card.createFragmentCard(SimilarCardList), filtersContainer);

    mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainClick);

    var allMapPins = mapPins.querySelectorAll('.map__pin');
    var allMapCards = map.querySelectorAll('.map__card');

    var openMapCard = function (pinsList) {
      for (var i = 1; i < pinsList.length; i++) {
        window.popup.onPinClick(pinsList[i], allMapCards[i - 1]);
        window.popup.onPinKeydown(pinsList[i], allMapCards[i - 1]);
        window.popup.onPopupCloseClick(allMapCards[i - 1]);
        window.popup.onPopupCloseKeydown(allMapCards[i - 1]);
      }
    };

    openMapCard(allMapPins);
  };

  var onMapPinMainClick = function (evt) {
    if ((evt.type === 'mousedown' && evt.button === 0) || (evt.type === 'keydown' && evt.key === 'Enter')) {
      evt.preventDefault();
      activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainClick);
  mapPinMain.addEventListener('keydown', onMapPinMainClick);

  mapPinMain.addEventListener('mousedown', window.move.onMapPinMainClickToMove);
})();
