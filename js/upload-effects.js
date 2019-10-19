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

  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', onEffectsItemClick);
  }

  window.uploadSlider = {
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
    resetSlider: resetSlider,
  };
})();
