'use strict';

(function () {
  window.setOpenCloseLogic = function (popupName, popupWithInputs, popupClosed, optionalOpenFunction, optionalCloseFunction) {
    var openPopup = function () {
      if (optionalOpenFunction) {
        optionalOpenFunction();
      }

      popupName.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      popupName.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);

      if (optionalCloseFunction) {
        optionalCloseFunction();
      }
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
        closePopup();
      }
    };

    window.onPopupEscPress = onPopupEscPress;

    var openCloseLogic = popupClosed ?
      openPopup() :
      closePopup();

    return openCloseLogic;
  };

  window.initModalWindow = function () {
    var modalElement = document.querySelector('.img-upload__overlay');

    window.modalState = {
      element: modalElement,
      modalInput: modalElement.querySelector('.text__hashtags'),
      modalTextArea: modalElement.querySelector('.text__description'),

      isClose: true,
      // isFocused: false,

      isElementActive: function (element) {
        return element === document.activeElement;
      },

      toggleEventListeners: function () {
        if (this.isClose) {
          document.removeEventListener('keydown', this.closeModal);
        } else {
          document.addEventListener('keydown', this.closeModal);
        }
      },

      closeModal: function (evt) {
        var modalState = window.modalState;

        if (
          evt.keyCode === window.util.ESC_KEYCODE &&
          !modalState.isElementActive(modalState.modalInput) &&
          !modalState.isElementActive(modalState.modalTextArea)
        ) {
          modalState.toggleModal();
        }
      },

      renderModal: function () {
        if (this.isClose) {
          this.element.classList.add('hidden');
        } else {
          this.element.classList.remove('hidden');
        }

        this.toggleEventListeners();
      },

      toggleModal: function () {
        this.isClose = !this.isClose;
        this.renderModal();
      },
    };
    window.modalState.renderModal();
  };

  window.initModalWindow();
})();
