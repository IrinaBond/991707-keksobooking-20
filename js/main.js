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

var map = document.querySelector('.map__pins');

var createLocation = function () {
  var location = {};
  location.x = getRandomFromRange(25, map.offsetWidth - 25);
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

var countsCard = 8;

var createSimilarCards = function (count) {
  var cards = [];
  for (var i = 1; i <= count; i++) {
    cards.push(createCard(i));
  }
  return cards;
};
var similarCards = createSimilarCards(countsCard);

var createFragmentPin = function (cardsList) {
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < cardsList.length; i++) {
    fragmentPin.appendChild(renderPin(cardsList[i]));
  }
  return fragmentPin;
};

map.appendChild(createFragmentPin(similarCards));

document.querySelector('.map').classList.remove('map--faded');
