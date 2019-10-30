'use strict';

(function () {
  var DEFAULT_SCALE_VALUE = 100 + '%';

  var imgUpload = document.querySelector('.img-upload');
  var form = imgUpload.querySelector('.img-upload__form');
  var uploadFileInput = form.querySelector('.img-upload__input');
  var overlay = form.querySelector('.img-upload__overlay');
  var cancelBtn = form.querySelector('.img-upload__cancel');
  var textInputs = form.querySelector('.img-upload__text');
  var hashtagInput = form.querySelector('.text__hashtags');
  var commentInput = form.querySelector('.text__description');
  var scaleField = imgUpload.querySelector('.img-upload__scale');
  var scaleSmallerBtn = scaleField.querySelector('.scale__control--smaller');
  var scaleBiggerBtn = scaleField.querySelector('.scale__control--bigger');
  var scaleValueInput = scaleField.querySelector('.scale__control--value');

  var getScaleValue = function () {
    return window.util.convertProcentString(scaleValueInput.value);
  };

  var resetScaleValue = function () {
    scaleValueInput.value = DEFAULT_SCALE_VALUE;
  };

  var changeScaleEffect = function (scaleBigger) {
    var scaleValue = getScaleValue();
    var scaleMultiplier = 25;

    if (scaleBigger && scaleValue < 100) {
      scaleValue += scaleMultiplier;
    }

    if (scaleBigger === undefined && scaleValue > 0) {
      scaleValue -= scaleMultiplier;
    }

    scaleValueInput.value = scaleValue + '%';
    window.uploadEffects.effectPreview.style.transform = 'scale' + '(' + scaleValue / 100 + ')';
  };

  var onScaleSmallerBtnClick = function () {
    changeScaleEffect();
  };

  var onScaleBiggerBtnClick = function () {
    changeScaleEffect('scaleBigger');
  };

  var getHashtagsList = function () {
    var hashtagInputValue = hashtagInput.value;
    var hashtagsList = hashtagInputValue.split([' ']);

    return hashtagsList;
  };

  var onHashtagInputInput = function () {
    var minHashtagLength = 2;
    var maxHashtagLength = 20;
    var hashtagsList = getHashtagsList();
    var repeatedHashtags = false;

    for (var i = 0; i < hashtagsList.length; i++) {
      var hashtagLessThanSpecified = hashtagsList[i].length < minHashtagLength;
      var hashtegMoreThenSpecified = hashtagsList[i].length > maxHashtagLength;
      var missedOctothorpe = hashtagsList[i][0] !== '#';

      for (var j = 0; j < hashtagsList.length; j++) {
        if (hashtagsList[i].toLowerCase() === hashtagsList[j].toLowerCase() && hashtagsList[j] && j !== i) {
          repeatedHashtags = true;
        }
      }
    }

    if (hashtagLessThanSpecified) {
      hashtagInput.setCustomValidity('Слишком короткий хэштег');
    } else if (hashtegMoreThenSpecified) {
      hashtagInput.setCustomValidity('Слишком длиннный хэштег');
    } else if (missedOctothorpe) {
      hashtagInput.setCustomValidity('А где # ?');
    } else if (repeatedHashtags) {
      hashtagInput.setCustomValidity('Ой, такой уже был');
    } else {
      hashtagInput.setCustomValidity('');
    }
  };

  var onHashtagInputInvalid = function (evt) {
    var targetElement = evt.target;
    var minSymbolsMessage = 'Минимальное количество символов - ' + targetElement.getAttribute('minlength');
    var maxSymbolsMessage = 'Максимальное количество символов - ' + targetElement.getAttribute('maxlength');

    if (targetElement.validity.customError) {
      return;
    }
    if (targetElement.validity.tooShort) {
      targetElement.setCustomValidity(minSymbolsMessage);
      return;
    }
    if (targetElement.validity.tooLong) {
      targetElement.setCustomValidity(maxSymbolsMessage);
      return;
    }
    if (targetElement.validity.valueMissing) {
      targetElement.setCustomValidity('Введите хэштег');
      return;
    }
  };

  var resetImgUploadValues = function () {
    overlay.classList.add('hidden');
    window.uploadEffects.resetSlider();
    window.uploadEffects.effectsRadio[0].checked = true;
    uploadFileInput.value = null;

    for (var i = 0; i < textInputs.children.length; i++) {
      textInputs.children[i].value = null;
    }
  };

  var onSumbitSuccess = function () {
    resetImgUploadValues();
    window.renderSuccessWindow();
  };

  var onSubmitError = function (errorDescription) {
    overlay.classList.add('hidden');
    window.renderError(errorDescription, 'submitError');
  };

  var onFormSubmit = function () {
    window.xhrRequest('POST', 'https://js.dump.academy/kekstagram', onSumbitSuccess, onSubmitError, new FormData(form));
  };

  resetScaleValue();
  scaleSmallerBtn.addEventListener('click', onScaleSmallerBtnClick);
  scaleBiggerBtn.addEventListener('click', onScaleBiggerBtnClick);

  uploadFileInput.addEventListener('change', function () {
    window.setOpenCloseLogic(overlay, [hashtagInput, commentInput], true);
  });

  cancelBtn.addEventListener('click', function () {
    uploadFileInput.value = null;
    window.setOpenCloseLogic(overlay);
  });

  window.util.setInputValidityAttributs(hashtagInput, 2, 104);
  window.util.setInputValidityAttributs(commentInput, 1, 140);

  hashtagInput.addEventListener('invalid', onHashtagInputInvalid);
  hashtagInput.addEventListener('input', onHashtagInputInput);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onFormSubmit();
  });

  window.imgUpload = {
    resetScaleValue: resetScaleValue,
    uploadFileInput: uploadFileInput,
    overlay: overlay,
    form: form,
    resetImgUploadValues: resetImgUploadValues,
  };
})();
