'use strict';

(function () {
  window.renderError = function (parent, errorDescription, errorType) {
    var errorWindowTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
    var errorWindow = errorWindowTemplate.cloneNode(true);
    var errorTitle = errorWindow.querySelector('.error__title');
    var errorText = errorDescription;
    var buttons = errorWindow.querySelector('.error__buttons');
    var retryButton = buttons.children[0];
    var secondButton = buttons.children[1];

    var onRetryButton = function () {
      window.location.reload();
    };

    retryButton.addEventListener('click', onRetryButton);
    errorTitle.textContent = errorText;

    if (errorType === 'galleryError') {
      secondButton.textContent = 'Закрыть окно';

      secondButton.addEventListener('click', function () {
        errorWindow.style.display = 'none';
      });
    }

    parent.appendChild(errorWindow);

  };
})();
