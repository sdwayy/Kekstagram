'use strict';

(function () {
  window.renderError = function (errorDescription, itSubmitError) {
    var windowTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorWindow = windowTemplate.cloneNode(true);
    var title = errorWindow.querySelector('.error__title');
    var text = errorDescription;
    var buttons = errorWindow.querySelector('.error__buttons');
    var retryButton = buttons.children[0];
    var closeButton = buttons.children[1];

    var notifyLogic = itSubmitError ?
      window.util.setNotifyLogic(errorWindow, itSubmitError) :
      window.util.setNotifyLogic(errorWindow);

    retryButton.textContent = 'Все понятно';
    buttons.removeChild(closeButton);
    title.textContent = text;
    window.mainGallery.pageMain.appendChild(errorWindow);

    return notifyLogic;
  };
})();
