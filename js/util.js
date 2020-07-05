'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  window.util = {
    getRandomFromArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomFromRange: function (min, max) {
      var offset = min;
      var range = (max - min) + 1;
      var randomNumber = Math.floor(Math.random() * range) + offset;
      return randomNumber;
    },

    isContains: function (argString, substring) {
      return argString.indexOf(substring) !== -1;
    },

    calculateAddress: function (offset) {
      return (parseFloat(mapPinMain.style.left) + Math.floor(mapPinMain.offsetWidth / 2)) + ', ' + (parseFloat(mapPinMain.style.top) + offset);
    }
  };
})();
