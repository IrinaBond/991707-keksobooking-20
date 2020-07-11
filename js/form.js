'use strict';

(function () {
  var countOfRooms = document.querySelector('#room_number');
  var countOfGuests = document.querySelector('#capacity');

  var checkMatchesGuestsToRooms = function (countRooms, countGuests) {
    var roomsInt = parseInt(countRooms.value, 10);
    var guestsInt = parseInt(countGuests.value, 10);
    if (roomsInt === 100 && guestsInt > 0) {
      countOfGuests.setCustomValidity('Вы можете выбрать только пункт Не для гостей');
    } else if (guestsInt > roomsInt || guestsInt === 0) {
      countOfGuests.setCustomValidity('Количество гостей должно быть не больше количества комнат');
    } else {
      countOfGuests.setCustomValidity('');
    }
  };

  countOfGuests.addEventListener('change', function () {
    checkMatchesGuestsToRooms(countOfRooms, countOfGuests);
  });

  countOfRooms.addEventListener('change', function () {
    checkMatchesGuestsToRooms(countOfRooms, countOfGuests);
  });

  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');

  var checkMatchesPriceToType = function (type, price) {
    switch (type.value) {
      case 'bungalo':
        price.setAttribute('min', '0');
        break;
      case 'flat':
        price.setAttribute('min', '1000');
        break;
      case 'house':
        price.setAttribute('min', '5000');
        break;
      case 'palace':
        price.setAttribute('min', '10000');
        break;
    }
    price.placeholder = price.getAttribute('min');
    price.setCustomValidity('');
    if (!price.validity.valid) {
      price.setCustomValidity('Значение должно быть больше или равно ' + price.getAttribute('min'));
    }
  };


  houseType.addEventListener('change', function () {
    checkMatchesPriceToType(houseType, housePrice);
  });

  var houseTimein = document.querySelector('#timein');
  var houseTimeout = document.querySelector('#timeout');

  var checkMatchesTimeoutToTimein = function (timein, timeout) {
    timeout.value = timein.value;
  };

  houseTimein.addEventListener('change', function () {
    checkMatchesTimeoutToTimein(houseTimein, houseTimeout);
  });

})();
