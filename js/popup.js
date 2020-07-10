'use strict';

(function () {

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.popup.closePopup();
    }
  };

  window.popup = {
    onDocumentEscPress: function (closeFn, evt) {
      console.log('evt: ' + evt);
      console.log('closeFn: ' + closeFn);
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeFn();
      }
    },

    openPopup: function (card) {
      card.classList.remove('hidden');
      card.classList.add('popup--opened');

      document.addEventListener('keydown', onPopupEscPress);
    },

    closePopup: function () {
      var openedCard = document.querySelector('.popup--opened');

      if (openedCard) {
        openedCard.classList.add('hidden');
        openedCard.classList.remove('popup--opened');

        document.removeEventListener('keydown', onPopupEscPress);
      }
    },

    onPinClick: function (pin, card) {
      pin.addEventListener('click', function () {
        window.popup.closePopup();
        window.popup.openPopup(card);
      });
    },

    onPinKeydown: function (pin, card) {
      pin.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.popup.closePopup();
          window.popup.openPopup(card);
        }
      });
    },

    onPopupCloseClick: function (card) {
      var popupClose = card.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        window.popup.closePopup();
      });
    },

    onPopupCloseKeydown: function (card) {
      var popupClose = card.querySelector('.popup__close');
      popupClose.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.popup.closePopup();
        }
      });
    }
  };
})();
