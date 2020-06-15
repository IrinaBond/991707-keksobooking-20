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

var isContains = function (argString, substring) {
  if (argString.indexOf(substring) !== -1) {
    return true;
  } else {
    return false;
  }
};

var isFeatureContains = function (featureClassListValue, roomFeatures) {
  for (var i = 0; i < roomFeatures.length; i++) {
    if (isContains(featureClassListValue, roomFeatures[i])) {
      return true;
    }
  }
  return false;
};


var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);

  var popupAvatar = cardElement.querySelector('.popup__avatar');
  var popupTitle = cardElement.querySelector('.popup__title');
  var popupAdress = cardElement.querySelector('.popup__text--address');
  var popupPrice = cardElement.querySelector('.popup__text--price');
  var popupType = cardElement.querySelector('.popup__type');
  var popupCapacity = cardElement.querySelector('.popup__text--capacity');
  var popupTime = cardElement.querySelector('.popup__text--time');
  var popupFeaturesParent = cardElement.querySelector('.popup__features');
  var popupFeaturesList = cardElement.querySelectorAll('.popup__feature');
  var popupPhoto = cardElement.querySelector('.popup__photo');

  popupAvatar.src = card.author.avatar;
  popupTitle.textContent = card.offer.title;
  popupAdress.textContent = card.offer.address;
  popupPrice.textContent = card.offer.price + '₽/ночь';
  switch (card.offer.type) {
    case 'flat':
      popupType.textContent = 'Квартира';
      break;
    case 'bungalo':
      popupType.textContent = 'Бунгало';
      break;
    case 'house':
      popupType.textContent = 'Дом';
      break;
    case 'palace':
      popupType.textContent = 'Дворец';
  }
  popupCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  popupTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var actualFetuares = card.offer.features;
  for (var i = 0; i < popupFeaturesList.length; i++) {
    if (!isFeatureContains(popupFeaturesList[i].classList.value, actualFetuares)) {
      popupFeaturesParent.removeChild(popupFeaturesList[i]);
    }
  }
  var photoParent = cardElement.querySelector('.popup__photos');
  var actualPhotoArray = card.offer.photos;
  for (var j = 0; j < actualPhotoArray.length; j++) {
    if (j < 1) {
      popupPhoto.src = actualPhotoArray[j];
    } else {
      var photoElement = popupPhoto.cloneNode(true);
      photoElement.src = actualPhotoArray[j];
      photoParent.appendChild(photoElement);
    }
  }
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
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
