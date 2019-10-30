'use strict';

(function () {
  var windowTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  window.renderSuccessWindow = function () {
    var successWindow = windowTemplate.cloneNode(true);

    window.mainGallery.pageMain.appendChild(successWindow);
    window.util.setNotifyLogic(successWindow);
  };
})();
