'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var getRandomNumber = function (maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  };

  var getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var setInputValidityAttributs = function (element, minLength, maxLength, required) {
    if (element.getAttribute('minlength') === null) {
      element.setAttribute('minlength', String(minLength));
    }
    if (element.getAttribute('maxlength') === null) {
      element.setAttribute('maxlength', String(maxLength));
    }
    if (required === true) {
      element.setAttribute('required', '');
    }
  };

  var setOpenCloseLogic = function (element, popupClosed) {
    var openPopup = function () {
      element.classList.remove('hidden');

      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      element.classList.add('hidden');

      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup(element);
      }
    };

    if (popupClosed) {
      return openPopup();
    } else {
      return closePopup();
    }
  };

  var convertProcentString = function (procent) {
    return Number(procent.slice(0, -1));
  };

  var convertPxString = function (pxCount) {
    return Number(pxCount.slice(0, -2));
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomNumber: getRandomNumber,
    getRandomArbitrary: getRandomArbitrary,
    shuffleArray: shuffleArray,
    setInputValidityAttributs: setInputValidityAttributs,
    setOpenCloseLogic: setOpenCloseLogic,
    convertProcentString: convertProcentString,
    convertPxString: convertPxString,
  };
})();
