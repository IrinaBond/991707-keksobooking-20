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
})();
