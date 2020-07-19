'use strict';
(function () {
  var advert = document.querySelector('.ad-form');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var successElement = successTemplate.cloneNode(true);
  document.querySelector('main').appendChild(successElement);
  successElement.classList.add('hidden');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorElement = errorTemplate.cloneNode(true);
  document.querySelector('main').appendChild(errorElement);
  errorElement.classList.add('hidden');

  window.message = {
    successUpload: function () {
      window.main.inactivatePage();
      advert.reset();

      successElement.classList.remove('hidden');

      var onSuccessEscPress = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeSuccess();
        }
      };

      var closeSuccess = function () {
        successElement.classList.add('hidden');
        document.removeEventListener('keydown', onSuccessEscPress);
        document.removeEventListener('click', closeSuccess);
      };

      document.addEventListener('keydown', onSuccessEscPress);
      document.addEventListener('click', closeSuccess);
    },

    errorUpload: function () {
      errorElement.classList.remove('hidden');
      var errorButton = errorElement.querySelector('.error__button');

      var onErrorButtonClick = function (evt) {
        evt.preventDefault();
        closeError();
      };

      var onErrorEscPress = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closeError();
        }
      };

      var closeError = function () {
        errorElement.classList.add('hidden');
        advert.reset();
        document.removeEventListener('keydown', onErrorEscPress);
        document.removeEventListener('click', closeError);
      };

      errorButton.addEventListener('click', onErrorButtonClick);
      document.addEventListener('keydown', onErrorEscPress);
      document.addEventListener('click', closeError);
    }
  };
})();
