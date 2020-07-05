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

    var onError = function (message) {
      console.error(message);
    };

    var onSuccess = function (data) {
      var SimilarCardList = [];
      for (var i = 0; i < COUNTS_CARD; i++) {
        SimilarCardList.push(data[i]);
      }

      mapPins.appendChild(window.pin.createFragmentPin(SimilarCardList));
      map.insertBefore(window.card.createFragmentCard(SimilarCardList), filtersContainer);

      var allMapPins = mapPins.querySelectorAll('.map__pin');
      var allMapCards = map.querySelectorAll('.map__card');

      allMapPins.forEach(function (mapPin, index) {
        if (index === 0) {
          return;
        }
        window.popup.onPinClick(mapPin, allMapCards[index - 1]);
        window.popup.onPinKeydown(mapPin, allMapCards[index - 1]);
        window.popup.onPopupCloseClick(allMapCards[index - 1]);
        window.popup.onPopupCloseKeydown(allMapCards[index - 1]);
      });

      mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
      mapPinMain.removeEventListener('keydown', onMapPinMainClick);

    };

    window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
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
