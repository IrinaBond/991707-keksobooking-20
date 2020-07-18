'use strict';

(function () {
  var advert = document.querySelector('.ad-form');

  window.inactivate.inactivatePage();

  var adFormReset = document.querySelector('.ad-form__reset');
  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.inactivate.inactivatePage();
    advert.reset();
  });

  advert.addEventListener('submit', function (evt) {
    window.upload(new FormData(advert), window.message.successUpload, window.message.errorUpload);
    evt.preventDefault();
  });
})();
