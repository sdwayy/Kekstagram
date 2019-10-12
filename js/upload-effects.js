'use strict';

(function () {
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectsRadio = window.imgUpload.imgUploadForm.querySelectorAll('.effects__radio');
  var effectPreview = window.imgUpload.imgUploadForm.querySelector('.img-upload__preview').children[0];

  var setFilterStyle = function (effectValue) {
    var effectName;
    var blurMultiplier = 5;
    var brightnessMultiplier = 10;
    var brightnessStartPoint = 1;

    var setEffect = function () {
      if (effectsRadio[0] === document.activeElement) {
        effectPreview.removeAttribute('style');
        return;
      }
      if (effectsRadio[1] === document.activeElement) {
        effectName = 'grayscale';
        effectValue = window.util.convertNumberToDecimal(effectValue);
        return;
      }
      if (effectsRadio[2] === document.activeElement) {
        effectName = 'sepia';
        effectValue = window.util.convertNumberToDecimal(effectValue);
        return;
      }
      if (effectsRadio[3] === document.activeElement) {
        effectName = 'invert';
        effectValue = window.util.convertNumberToDecimal(effectValue);
        return;
      }
      if (effectsRadio[4] === document.activeElement) {
        effectName = 'blur';
        effectValue = effectValue / blurMultiplier + 'px';
        return;
      }
      if (effectsRadio[5] === document.activeElement) {
        effectName = 'brightness';
        effectValue = brightnessStartPoint + effectValue / brightnessMultiplier;
        return;
      }
    };

    setEffect();
    effectPreview.style.filter = effectName + '(' + effectValue + ')';
  };


  var resetSlider = function () {
    effectLevelDepth.style.width = 0;
    effectLevelPin.style.left = 0;
  };

  var onEffectsItemClick = function () {
    resetSlider();
    setFilterStyle(0);
  };

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var effectLevelLineWidth = effectLevelLine.offsetWidth;
    var percent = effectLevelLineWidth / 100;
    var xCoords = evt.clientX;
    var pinStartPosition = effectLevelPin.offsetLeft;

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var pinMoveEndPosition = effectLevelPin.offsetLeft;
      var shift = xCoords - moveEvt.clientX;
      var effectProcent = Math.round(window.util.convertProcentString(effectLevelDepth.style.width));

      if (pinMoveEndPosition >= 0 && pinMoveEndPosition <= effectLevelLineWidth) {
        var pinShift = pinStartPosition - (shift);

        if (pinShift > effectLevelLineWidth) {
          effectLevelPin.style.left = effectLevelLineWidth + 'px';
        } else if (pinShift < effectLevelLineWidth && pinShift > 0) {
          effectLevelPin.style.left = pinShift + 'px';
        } else {
          effectLevelPin.style.left = 0 + 'px';
        }
      }

      effectLevelDepth.style.width = effectLevelPin.offsetLeft / percent + '%';

      setFilterStyle(effectProcent);
    };

    var onPinMouseUp = function () {
      document.removeEventListener('mousemove', onPinMouseMove);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  effectLevelPin.addEventListener('mousedown', onPinMouseDown);
  resetSlider();

  window.uploadSlider = {
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', onEffectsItemClick);
  }
})();
