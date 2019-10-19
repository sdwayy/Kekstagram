'use strict';

(function () {
  window.xhrRequest = function (xhrType, url, onSuccess, onError, sendData) {
    var xhr = new XMLHttpRequest();

    var getResponse = function () {
      try {
        onSuccess(xhr.response);
      } catch (err) {
        var errorDescription;
        var errorText = 'Ошибка ' + xhr.status + ':';

        switch (xhr.status) {
          case 400:
            errorDescription = errorText + ' Неверный запрос';
            break;
          case 401:
            errorDescription = errorText + ' Пользователь не авторизован';
            break;
          case 404:
            errorDescription = errorText + ' Ничего не найдено';
            break;
          case 522:
            errorDescription = errorText + ' Превышено время ожидания';
            break;
          default:
            errorDescription = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }

        if (errorDescription !== undefined) {
          onError(errorDescription);
        }
      }
    };

    xhr.addEventListener('load', getResponse);

    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open(xhrType, url);
    xhr.send(sendData);
  };
})();
