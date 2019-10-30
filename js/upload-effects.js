'use strict';

(function () {
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectsRadio = window.imgUpload.form.querySelectorAll('.effects__radio');
  var effectPreview = window.imgUpload.form.querySelector('.img-upload__preview').children[0];

  var setFilterStyle = function (effectValue) {
    var effectName;
    var blurMultiplier = 5;
    var brightnessMultiplier = 15;
    var brightnessStartPoint = 1;
    var effectDecimalValue = effectValue / 100;
    var blurValue = effectValue / blurMultiplier + 'px';
    var brightnessValue = brightnessStartPoint + effectValue / brightnessMultiplier;

    var setEffect = function () {
      for (var i = 0; i < effectsRadio.length; i++) {
        switch (document.activeElement) {
          case effectsRadio[1]:
            effectName = 'grayscale';
            effectValue = effectDecimalValue;
            break;
          case effectsRadio[2]:
            effectName = 'sepia';
            effectValue = effectDecimalValue;
            break;
          case effectsRadio[3]:
            effectName = 'invert';
            effectValue = effectDecimalValue;
            break;
          case effectsRadio[4]:
            effectName = 'blur';
            if (effectValue > 0) {
              effectValue = blurValue;
            }
            break;
          case effectsRadio[5]:
            effectName = 'brightness';
            effectValue = brightnessValue;
            break;
          default:
            effectPreview.removeAttribute('style');
        }
      }
    };

    setEffect();
    effectPreview.style.filter = effectName + '(' + effectValue + ')';
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

    window.imgUpload.resetScaleValue();
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

  effectLevel.classList.add('hidden');
  effectLevelPin.addEventListener('mousedown', onPinMouseDown);

  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', onEffectsItemClick);
  }

  resetSlider();

  window.uploadEffects = {
    effectPreview: effectPreview,
    resetSlider: resetSlider,
    effectsRadio: effectsRadio,
  };
})();
