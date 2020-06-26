'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (card.location.x - 25) + 'px';
    pinElement.style.top = (card.location.y - 70) + 'px';
    pinElement.querySelector('img').src = card.author.avatar;
    return pinElement;
  };

  window.pin = {
    createFragmentPin: function (cardsList) {
      var fragmentPin = document.createDocumentFragment();
      for (var i = 0; i < cardsList.length; i++) {
        fragmentPin.appendChild(renderPin(cardsList[i]));
      }
      return fragmentPin;
    }
  };
})();
