'use strict';

(function () {
  var checkEmptyField = function (cardValue, popupField) {
    if (cardValue === undefined) {
      popupField.classList.add('visually-hidden');
    }
  };

  var convertOfferType = function (typeValue, popupTypeField) {
    switch (typeValue) {
      case 'flat':
        popupTypeField.textContent = 'Квартира';
        break;
      case 'bungalo':
        popupTypeField.textContent = 'Бунгало';
        break;
      case 'house':
        popupTypeField.textContent = 'Дом';
        break;
      case 'palace':
        popupTypeField.textContent = 'Дворец';
    }
  };

  var isFeatureContains = function (featuresValue, featureField) {
    for (var i = 0; i < featuresValue.length; i++) {
      if (window.util.isContains(featureField, featuresValue[i])) {
        return true;
      }
    }
    return false;
  };

  var removeFeatureField = function (featuresValue, featureField, parentField) {
    for (var i = 0; i < featureField.length; i++) {
      if (!isFeatureContains(featuresValue, featureField[i].classList.value)) {
        parentField.removeChild(featureField[i]);
      }
    }
  };

  var renderImgField = function (actualValue, popupField, parentField) {
    checkEmptyField(actualValue, popupField);
    if (parentField) {
      for (var i = 0; i < actualValue.length; i++) {
        if (i < 1) {
          popupField.src = actualValue[i];
        } else {
          var photoElement = popupField.cloneNode(true);
          photoElement.src = actualValue[i];
          parentField.appendChild(photoElement);
        }
      }
    } else {
      popupField.src = actualValue;
    }
  };

  var renderTextField = function (actualValue, popupField, addText) {
    checkEmptyField(actualValue, popupField);
    if (addText) {
      popupField.textContent = actualValue + addText;
    } else {
      popupField.textContent = actualValue;
    }
  };

  var renderTypeField = function (actualValue, popupField) {
    checkEmptyField(actualValue, popupField);
    convertOfferType(actualValue, popupField);
  };

  var renderCapacityField = function (roomsValue, guestsValue, popupField) {
    checkEmptyField(roomsValue, popupField);
    checkEmptyField(guestsValue, popupField);
    popupField.textContent = roomsValue + ' комнаты для ' + guestsValue + ' гостей';
  };

  var renderTimeField = function (checkinValue, checkoutValue, popupField) {
    checkEmptyField(checkinValue, popupField);
    checkEmptyField(checkoutValue, popupField);
    popupField.textContent = 'Заезд после ' + checkinValue + ', выезд до ' + checkoutValue;
  };

  var renderFeatureField = function (featuresValue, popupFeaturesList, popupFeaturesParent) {
    checkEmptyField(featuresValue, popupFeaturesParent);
    removeFeatureField(featuresValue, popupFeaturesList, popupFeaturesParent);
  };

  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    renderImgField(card.author.avatar, cardElement.querySelector('.popup__avatar'));
    renderTextField(card.offer.title, cardElement.querySelector('.popup__title'));
    renderTextField(card.offer.address, cardElement.querySelector('.popup__text--address'));
    renderTextField(card.offer.price, cardElement.querySelector('.popup__text--price'), '₽/ночь');
    renderTypeField(card.offer.type, cardElement.querySelector('.popup__type'));
    renderCapacityField(card.offer.rooms, card.offer.guests, cardElement.querySelector('.popup__text--capacity'));
    renderTimeField(card.offer.checkin, card.offer.checkout, cardElement.querySelector('.popup__text--time'));
    renderFeatureField(card.offer.features, cardElement.querySelectorAll('.popup__feature'), cardElement.querySelector('.popup__features'));
    renderImgField(card.offer.photos, cardElement.querySelector('.popup__photo'), cardElement.querySelector('.popup__photos'));
    renderTextField(card.offer.description, cardElement.querySelector('.popup__description'));

    return cardElement;
  };

  window.card = {
    createFragmentCard: function (cardsList) {
      var fragmentCard = document.createDocumentFragment();
      for (var i = 0; i < cardsList.length; i++) {
        fragmentCard.appendChild(renderCard(cardsList[i]));
      }
      return fragmentCard;
    }
  };
})();
