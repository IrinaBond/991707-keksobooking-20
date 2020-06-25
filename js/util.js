'use strict';

(function () {
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
    }
  };
})();
