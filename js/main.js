'use strict';

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomFromRange = function (min, max) {
  var offset = min;
  var range = (max - min) + 1;
  var randomNumber = Math.floor(Math.random() * range) + offset;
  return randomNumber;
};

var createAuthor = function (i) {
  var author = {};
  author.avatar = 'img/avatars/user0' + i + '.png';
  return author;
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var createLocation = function () {
  var location = {};
  location.x = getRandomFromRange(25, mapPins.offsetWidth - 25);
  location.y = getRandomFromRange(130, 650);
  return location;
};

var createOffer = function (location, i) {
  var offer = {};
  offer.title = 'Заголовок ' + i;
  offer.address = location.x + ', ' + location.y;
  offer.price = getRandomFromRange(500, 2000);
  offer.type = getRandomFromArray(types);
  offer.rooms = getRandomFromRange(1, 4);
  offer.guests = getRandomFromRange(2, 8);
  offer.checkin = getRandomFromArray(checkinTimes);
  offer.checkout = getRandomFromArray(checkoutTimes);
  var featuresArray = [];
  for (var j = 0; j < getRandomFromRange(1, 6); j++) {
    var feature = featuresList[j];
    featuresArray.push(feature);
  }
  offer.features = featuresArray;
  offer.description = 'Описание ' + i;
  var photoArray = [];
  for (var k = 0; k < getRandomFromRange(1, 3); k++) {
    var photo = photoLinks[k];
    photoArray.push(photo);
  }
  offer.photos = photoArray;

  return offer;
};

var createCard = function (i) {
  var newCard = {};
  newCard.author = createAuthor(i);
  newCard.location = createLocation(i);
  newCard.offer = createOffer(newCard.location, i);

  return newCard;
};


var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

var COUNTS_CARD = 8;

var createSimilarCards = function (count) {
  var cards = [];
  for (var i = 1; i <= count; i++) {
    cards.push(createCard(i));
  }
  return cards;
};
var similarCards = createSimilarCards(COUNTS_CARD);

var createFragmentPin = function (cardsList) {
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < cardsList.length; i++) {
    fragmentPin.appendChild(renderPin(cardsList[i]));
  }
  return fragmentPin;
};

mapPins.appendChild(createFragmentPin(similarCards));

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

var isContains = function (argString, substring) {
  if (argString.indexOf(substring) !== -1) {
    return true;
  } else {
    return false;
  }
};

var isFeatureContains = function (featuresValue, featureField) {
  for (var i = 0; i < featuresValue.length; i++) {
    if (isContains(featureField, featuresValue[i])) {
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

var createFragmentCard = function (cardsList) {
  var fragmentCard = document.createDocumentFragment();
  for (var i = 0; i < cardsList.length; i++) {
    fragmentCard.appendChild(renderCard(cardsList[i]));
  }
  return fragmentCard;
};

var filtersContainer = document.querySelector('.map__filters-container');

map.insertBefore(createFragmentCard(similarCards), filtersContainer);

document.querySelector('.map').classList.remove('map--faded');
