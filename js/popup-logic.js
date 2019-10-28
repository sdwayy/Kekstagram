'use strict';

(function () {
  window.setOpenCloseLogic = function (popupName, inputName, popupClosed) {
    var openPopup = function () {
      popupName.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      popupName.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== inputName) {
        closePopup(popupName);
      }

      if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement === inputName) {
        inputName.blur();
      }
    };

    if (popupClosed) {
      openPopup();
    } else {
      closePopup();
    }
  };
})();
