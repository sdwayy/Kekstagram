'use strict';

(function () {
  window.setOpenCloseLogic = function (popupName, popupWithInputs, popupClosed) {

    var openPopup = function () {
      popupName.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      popupName.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      var activeInput = false;

      if (popupWithInputs) {
        for (var i = 0; i < popupWithInputs.length; i++) {
          if (popupWithInputs[i] === document.activeElement) {
            activeInput = true;
          }
        }
      }

      if (evt.keyCode === window.util.ESC_KEYCODE && activeInput) {
        popupWithInputs.forEach(function (input) {
          input.blur();
        });
      }

      if (evt.keyCode === window.util.ESC_KEYCODE && !activeInput) {
        closePopup(popupName);
      }
    };

    var openCloseLogic = popupClosed ?
      openPopup() :
      closePopup();

    return openCloseLogic;
  };
})();
