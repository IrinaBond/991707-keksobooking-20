'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photoLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var createAuthor = function (i) {
    var author = {};
    author.avatar = 'img/avatars/user0' + i + '.png';
    return author;
  };

  var createLocation = function () {
    var location = {};
    location.x = window.util.getRandomFromRange(0, mapPins.offsetWidth);
    location.y = window.util.getRandomFromRange(130, 630);
    return location;
  };

  var createOffer = function (location, i) {
    var offer = {};
    offer.title = 'Заголовок ' + i;
    offer.address = location.x + ', ' + location.y;
    offer.price = window.util.getRandomFromRange(500, 2000);
    offer.type = window.util.getRandomFromArray(types);
    offer.rooms = window.util.getRandomFromRange(1, 4);
    offer.guests = window.util.getRandomFromRange(2, 8);
    offer.checkin = window.util.getRandomFromArray(checkinTimes);
    offer.checkout = window.util.getRandomFromArray(checkoutTimes);
    var featuresArray = [];
    for (var j = 0; j < window.util.getRandomFromRange(1, 6); j++) {
      var feature = featuresList[j];
      featuresArray.push(feature);
    }
    offer.features = featuresArray;
    offer.description = 'Описание ' + i;
    var photoArray = [];
    for (var k = 0; k < window.util.getRandomFromRange(1, 3); k++) {
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

  window.data = {
    createSimilarCards: function (count) {
      var cards = [];
      for (var i = 1; i <= count; i++) {
        cards.push(createCard(i));
      }
      return cards;
    }
  };
})();
