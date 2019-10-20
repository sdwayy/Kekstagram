'use strict';

(function () {
  var successWindowTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  window.renderSuccessWindow = function () {
    var successWindow = successWindowTemplate.cloneNode(true);

    window.pageMain.appendChild(successWindow);
    window.util.setNotifyLogic(successWindow);
  };
})();
