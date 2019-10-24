'use strict';

(function () {
  window.renderError = function (errorDescription, itSubmitError) {
    var errorWindowTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
    var errorWindow = errorWindowTemplate.cloneNode(true);
    var errorTitle = errorWindow.querySelector('.error__title');
    var errorText = errorDescription;
    var buttons = errorWindow.querySelector('.error__buttons');
    var retryButton = buttons.children[0];
    var closeButton = buttons.children[1];

    retryButton.textContent = 'Все понятно';
    buttons.removeChild(closeButton);
    errorTitle.textContent = errorText;
    window.mainGallery.pageMain.appendChild(errorWindow);

    if (itSubmitError) {
      window.util.setNotifyLogic(errorWindow, itSubmitError);
    } else {
      window.util.setNotifyLogic(errorWindow);
    }
  };
})();
