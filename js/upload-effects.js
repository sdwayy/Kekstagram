'use strict';

(function () {
  var BLUR_MULTIPLIER = 5;
  var BRIGHTNESS_MULTIPLIER = 15;
  var BRIGHTNESS_START_POINT = 1;

  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectsRadio = window.imgUpload.form.querySelectorAll('.effects__radio');
  var effectPreview = window.imgUpload.preview;
  var effectName;

  var getEffectValue = function (effectValue) {
    switch (effectName) {
      case 'blur':

        if (effectValue > 0) {
          effectValue = effectValue / BLUR_MULTIPLIER + 'px';
        }

        break;

      case 'brightness':
        effectValue = BRIGHTNESS_START_POINT + effectValue / BRIGHTNESS_MULTIPLIER;
        break;

      default:
        effectValue = effectValue;
    }

    effectValue /= 100;

    return effectValue;
  };

  var getEffectName = function (target) {
    switch (target) {
      case effectsRadio[1]:
        effectName = 'grayscale';
        break;

      case effectsRadio[2]:
        effectName = 'sepia';
        break;

      case effectsRadio[3]:
        effectName = 'invert';
        break;

      case effectsRadio[4]:
        effectName = 'blur';
        break;

      case effectsRadio[5]:
        effectName = 'brightness';
        break;

      default:
        effectName = '';
    }

    return effectName;
  };

  var setEffect = function (effectValue) {
    effectPreview.style.filter = effectName + '(' + getEffectValue(effectValue) + ')';
  };

  var resetSlider = function () {
    effectLevelDepth.style.width = 0;
    effectLevelPin.style.left = 0;
    effectPreview.removeAttribute('style');
  };

  var onEffectsItemClick = function (evt) {
    var target = evt.target;

    if (target !== effectsRadio[0]) {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }

    getEffectName(target);
    window.imgUpload.resetScaleValue();
    resetSlider();
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

      var effectProcent = Math.round(
          window.util.convertProcentString(effectLevelDepth.style.width)
      );

      if (pinMoveEndPosition >= 0 &&
          pinMoveEndPosition <= effectLevelLineWidth) {

        var pinShift = pinStartPosition - (shift);

        if (pinShift > effectLevelLineWidth) {
          effectLevelPin.style.left =
            effectLevelLineWidth + 'px';
        } else if (pinShift < effectLevelLineWidth &&
          pinShift > 0) {
          effectLevelPin.style.left = pinShift + 'px';
        } else {
          effectLevelPin.style.left = 0 + 'px';
        }
      }

      effectLevelDepth.style.width = effectLevelPin.offsetLeft / percent + '%';

      setEffect(effectProcent);
    };

    var onPinMouseUp = function () {
      document.removeEventListener('mousemove', onPinMouseMove);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  effectLevel.classList.add('hidden');
  effectLevelPin.addEventListener('mousedown', onPinMouseDown);

  effectsRadio.forEach(function (effectRadio) {
    effectRadio.addEventListener('click', onEffectsItemClick);
  });

  resetSlider();

  window.uploadEffects = {
    effectPreview: effectPreview,
    resetSlider: resetSlider,
    effectsRadio: effectsRadio,
  };
})();
