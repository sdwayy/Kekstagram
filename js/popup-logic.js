'use strict';

(function () {
  window.PopupLogic = function (popupName, popupTextInputs, optionalCloseFunction) {
    this.isOpen = false;
    this.isTextInputActive = window.util.isElementActive;

    this.toggleEventListeners = function () {
      if (this.isOpen) {
        document.removeEventListener('keydown', this.onEscPress);
      } else {
        document.addEventListener('keydown', this.onEscPress);
      }
    };

    this.onEscPress = function (evt) {
      if (
        evt.keyCode === window.util.ESC_KEYCODE &&
        !popupTextInputs.some(this.isTextInputActive)
      ) {
        this.togglePopup();
      }
    };

    this.togglePopup = function () {
      if (this.isOpen) {
        popupName.classList.add('hidden');

        if (optionalCloseFunction) {
          optionalCloseFunction();
        }

      } else {
        popupName.classList.remove('hidden');
      }

      this.toggleEventListeners();
      this.isOpen = !this.isOpen;
    };

    //  Привязываем контекст методов к данному объекту
    for (var key in this) {
      if (typeof this[key] === 'function') {
        this[key] = this[key].bind(this);
      }
    }
  };
})();
