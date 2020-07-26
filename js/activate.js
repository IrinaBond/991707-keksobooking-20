'use strict';

(function () {
  var COUNTS_CARD = 5;

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
        var housingPrice = filterForm.querySelector('#housing-price');
        var housingRooms = filterForm.querySelector('#housing-rooms');
        var housingGuests = filterForm.querySelector('#housing-guests');
        var housingFeatures = filterForm.querySelector('#housing-features');
        var allCheckbox = Array.from(filterForm.querySelectorAll('input[type="checkbox"]'));

        var filterWithPrice = function (filterField, adField) {
          return (filterField === 'any' ||
            (filterField === 'middle' && adField >= 10000 && adField < 50000) ||
            (filterField === 'low' && adField < 10000) ||
            (filterField === 'high' && adField >= 50000));
        };

        var filterAds = function () {
          window.inactivate.removeAllPins();
          window.inactivate.removeAllCards();
          var checkboxChecked = allCheckbox.filter(function (checkbox) {
            return checkbox.checked;
          });
          var checkboxCheckedValues = checkboxChecked.map(function (checkbox) {
            return checkbox.value;
          });

          var isFeaturesFilteredMatchesAd = function (adFeaturesList) {
            for (var j = 0; j < checkboxCheckedValues.length; j++) {
              if (adFeaturesList.indexOf(checkboxCheckedValues[j]) === -1) {
                return false;
              }
            }
            return true;
          };
          var filterWithCriteria = function (ad) {
            var isHousingMatches = housingType.value === 'any' || housingType.value === ad.offer.type;
            var isPriceMatches = filterWithPrice(housingPrice.value, ad.offer.price);
            var isRoomsMatches = housingRooms.value === 'any' || parseInt(housingRooms.value, 10) === ad.offer.rooms;
            var isGuestsMatches = housingGuests.value === 'any' || parseInt(housingGuests.value, 10) === ad.offer.guests;
            return isHousingMatches &&
                   isPriceMatches &&
                   isRoomsMatches &&
                   isGuestsMatches &&
                   isFeaturesFilteredMatchesAd(ad.offer.features);
          };
          var adsFilteredWithType = allAds.filter(filterWithCriteria);
          var lastIndex = COUNTS_CARD;
          if (adsFilteredWithType.length <= COUNTS_CARD) {
            lastIndex = adsFilteredWithType.length;
          }
          var adsSliced = adsFilteredWithType.slice(0, lastIndex);
          window.activate.renderMapItems(adsSliced);
        };
        var filterWithDebounce = window.debounce(filterAds);
        housingType.addEventListener('change', filterWithDebounce);
        housingPrice.addEventListener('change', filterWithDebounce);
        housingRooms.addEventListener('change', filterWithDebounce);
        housingGuests.addEventListener('change', filterWithDebounce);
        housingFeatures.addEventListener('change', filterWithDebounce);
      };

      window.backend.load('https://javascript.pages.academy/keksobooking/data', successLoad, errorLoad);
    }
  };
})();
