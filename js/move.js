'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  window.move = {
    onMapPinMainClickToMove: function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var pinOffsetTop = Math.floor(mapPinMain.offsetHeight + 22);
      var pinOffsetLeft = Math.floor(mapPinMain.offsetWidth / 2);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var pinEndCoordY = (mapPinMain.offsetTop - shift.y) + pinOffsetTop;
        var pinEndCoordX = (mapPinMain.offsetLeft - shift.x) + pinOffsetLeft;

        if (pinEndCoordY < 130) {
          mapPinMain.style.top = (130 - pinOffsetTop) + 'px';
        } else if (pinEndCoordY > 630) {
          mapPinMain.style.top = (630 - pinOffsetTop) + 'px';
        } else {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }

        if (pinEndCoordX < 0) {
          mapPinMain.style.left = (0 - pinOffsetLeft) + 'px';
        } else if (pinEndCoordX > mapPins.clientWidth) {
          mapPinMain.style.left = (mapPins.clientWidth - pinOffsetLeft) + 'px';
        } else {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }

        addressField.value = window.util.calculateAddress(pinOffsetTop);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
