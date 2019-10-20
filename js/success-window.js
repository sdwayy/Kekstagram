'use strict';

(function () {
  var successWindowTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  window.renderSuccessWindow = function () {
    var successWindow = successWindowTemplate.cloneNode(true);
    var successButton = successWindow.querySelector('.success__button');

    successButton.addEventListener('click', function () {
      window.util.delElement(window.pageMain, successWindow);
    });

    window.pageMain.appendChild(successWindow);
    window.util.setNotifyLogic(successWindow);
  };
})();
