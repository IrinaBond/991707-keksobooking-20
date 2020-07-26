'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  window.backend = {
    load: function (url, onSuccess, onError) {
      var xhr = createXhr(onSuccess, onError);

      xhr.timeout = 10000;
      xhr.open('GET', url);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = createXhr(onSuccess, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
