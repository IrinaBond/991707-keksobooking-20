'use strict';

(function () {
  var COUNTS_CARD = 8;

  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  var addPinListeners = function () {
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
  };

  window.activate = {
    renderMapItems: function (adsArray) {
      mapPins.appendChild(window.pin.createFragmentPin(adsArray));
      map.insertBefore(window.card.createFragmentCard(adsArray), filtersContainer);
      addPinListeners();
    },

    activatePage: function () {
      window.inactivate.toggleClassList(false);
      adFormElements.forEach(function (adFormElement) {
        adFormElement.removeAttribute('disabled');
      });
      addressField.value = window.util.calculateAddress(Math.floor(mapPinMain.offsetHeight) + 22);

      mapPinMain.removeEventListener('mousedown', window.inactivate.onMapPinMainClick);
      mapPinMain.removeEventListener('keydown', window.inactivate.onMapPinMainClick);

      mapPinMain.addEventListener('mousedown', window.move.onMapPinMainClickToMove);

      var errorLoad = function (message) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = message;
        document.body.insertAdjacentElement('afterbegin', node);
      };

      var successLoad = function (data) {
        var SimilarCardList = [];
        var allAds = data;
        for (var i = 0; i < COUNTS_CARD; i++) {
          SimilarCardList.push(allAds[i]);
        }

        window.activate.renderMapItems(SimilarCardList);

        var filterForm = document.querySelector('.map__filters');
        var housingType = filterForm.querySelector('#housing-type');

        housingType.addEventListener('change', function () {
          var actualType = housingType.value;

          window.inactivate.removeAllPins();
          window.inactivate.removeAllCards();

          if (actualType === 'any') {
            window.activate.renderMapItems(SimilarCardList);
            return;
          }

          var filterWithHousingType = function (ad) {
            return ad.offer.type === actualType;
          };
          var adsFilteredWithType = allAds.filter(filterWithHousingType);
          var MAX_RENDER_ADS = 5;
          var lastIndex = MAX_RENDER_ADS;
          if (adsFilteredWithType.length <= MAX_RENDER_ADS) {
            lastIndex = adsFilteredWithType.length;
          }
          var adsSliced = adsFilteredWithType.slice(0, lastIndex);
          window.activate.renderMapItems(adsSliced);
        });
      };
      window.load('https://javascript.pages.academy/keksobooking/data', successLoad, errorLoad);
    }
  };
})();
