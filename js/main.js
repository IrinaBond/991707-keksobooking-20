'use strict';

(function () {
  var COUNTS_CARD = 8;

  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var advert = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  var toggleClassList = function (bool) {
    map.classList.toggle('map--faded', bool);
    advert.classList.toggle('ad-form--disabled', bool);
  };

  var onMapPinMainClick = function (evt) {
    if ((evt.type === 'mousedown' && evt.button === 0) || (evt.type === 'keydown' && evt.key === 'Enter')) {
      evt.preventDefault();
      activatePage();
    }
  };

  var inactivatePage = function () {
    toggleClassList(true);
    adFormElements.forEach(function (adFormElement) {
      adFormElement.setAttribute('disabled', true);
    });
    var allMapPins = mapPins.querySelectorAll('.map__pin');

    if (allMapPins.length > 1) {
      var fragmentPinToRemove = document.createDocumentFragment();
      for (var i = 1; i < allMapPins.length; i++) {
        fragmentPinToRemove.appendChild(allMapPins[i]);
      }
    }

    addressField.value = window.util.calculateAddress(Math.floor(mapPinMain.offsetHeight / 2));

    mapPinMain.addEventListener('mousedown', onMapPinMainClick);
    mapPinMain.addEventListener('keydown', onMapPinMainClick);
  };

  inactivatePage();

  var activatePage = function () {
    toggleClassList(false);
    adFormElements.forEach(function (adFormElement) {
      adFormElement.removeAttribute('disabled');
    });
    addressField.value = window.util.calculateAddress(Math.floor(mapPinMain.offsetHeight) + 22);

    mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainClick);

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
    };

    window.load('https://javascript.pages.academy/keksobooking/data', successLoad, errorLoad);
  };


  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var successElement = successTemplate.cloneNode(true);
  document.querySelector('main').appendChild(successElement);
  successElement.classList.add('hidden');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorElement = errorTemplate.cloneNode(true);
  document.querySelector('main').appendChild(errorElement);
  errorElement.classList.add('hidden');

  var successUpload = function () {
    inactivatePage();
    advert.reset();

    successElement.classList.remove('hidden');

    var onSuccessEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeSuccess();
      }
    };

    var closeSuccess = function () {
      successElement.classList.add('hidden');
      document.removeEventListener('keydown', onSuccessEscPress);
      document.removeEventListener('click', closeSuccess);
    };

    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeSuccess);
  };

  var errorUpload = function () {
    errorElement.classList.remove('hidden');
    var errorButton = errorElement.querySelector('.error__button');

    var onErrorButtonClick = function (evt) {
      evt.preventDefault();
      closeError();
    };

    var onErrorEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeError();
      }
    };

    var closeError = function () {
      errorElement.classList.add('hidden');
      advert.reset();
      document.removeEventListener('keydown', onErrorEscPress);
      document.removeEventListener('click', closeError);
    };

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', closeError);
  };

  var adFormReset = document.querySelector('.ad-form__reset');
  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    inactivatePage();
    advert.reset();
  });

  advert.addEventListener('submit', function (evt) {
    window.upload(new FormData(advert), successUpload, errorUpload);
    evt.preventDefault();
  });
})();
