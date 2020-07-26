'use strict';

(function () {
  var advert = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  window.inactivate = {
    toggleClassList: function (bool) {
      map.classList.toggle('map--faded', bool);
      advert.classList.toggle('ad-form--disabled', bool);
    },
    removeAllPins: function () {
      var allMapPins = mapPins.querySelectorAll('.map__pin');
      if (allMapPins.length > 1) {
        var fragmentPinsToRemove = document.createDocumentFragment();
        for (var i = 1; i < allMapPins.length; i++) {
          fragmentPinsToRemove.appendChild(allMapPins[i]);
        }
      }
    },

    removeAllCards: function () {
      var allMapCards = map.querySelectorAll('.map__card');
      if (allMapCards) {
        var fragmentCardsToRemove = document.createDocumentFragment();
        for (var i = 0; i < allMapCards.length; i++) {
          fragmentCardsToRemove.appendChild(allMapCards[i]);
        }
      }
    },

    onMapPinMainClick: function (evt) {
      if ((evt.type === 'mousedown' && evt.button === 0) || (evt.type === 'keydown' && evt.key === 'Enter')) {
        evt.preventDefault();
        window.activate.activatePage();
      }
    },

    inactivatePage: function () {
      window.inactivate.toggleClassList(true);
      adFormElements.forEach(function (adFormElement) {
        adFormElement.setAttribute('disabled', true);
      });

      window.inactivate.removeAllPins();
      window.inactivate.removeAllCards();

      addressField.value = window.util.calculateAddress(Math.floor(mapPinMain.offsetHeight / 2));

      mapPinMain.addEventListener('mousedown', window.inactivate.onMapPinMainClick);
      mapPinMain.addEventListener('keydown', window.inactivate.onMapPinMainClick);
    }
  };
})();
