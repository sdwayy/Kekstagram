'use strict';

(function () {
  var DEFAULT_SCALE_VALUE = 100 + '%';
  var SCALE_MULTIPLIER = 25;

  var imgUpload = document.querySelector('.img-upload');
  var preview = imgUpload.querySelector('.img-upload__preview').children[0];
  var form = imgUpload.querySelector('.img-upload__form');
  var uploadFileInput = form.querySelector('.img-upload__input');
  var overlay = form.querySelector('.img-upload__overlay');
  var cancelBtn = form.querySelector('.img-upload__cancel');

  var scaleField = imgUpload.querySelector('.img-upload__scale');
  var scaleSmallerBtn = scaleField.querySelector('.scale__control--smaller');
  var scaleBiggerBtn = scaleField.querySelector('.scale__control--bigger');
  var scaleValueInput = scaleField.querySelector('.scale__control--value');

  var textInputs = Array.from(
      form.querySelector('.img-upload__text')
      .children
  );

  var resetUloadFileInputValue = function () {
    uploadFileInput.value = null;
  };

  var openCloseLogic = new window.PopupLogic(overlay, textInputs, resetUloadFileInputValue);

  var getScaleValue = function () {
    return window.util.convertProcentString(scaleValueInput.value);
  };

  var resetScaleValue = function () {
    scaleValueInput.value = DEFAULT_SCALE_VALUE;
  };

  var openPopup = function () {
    resetImgUploadValues();
    openCloseLogic.togglePopup();
  };

  var closePopup = function () {
    openCloseLogic.togglePopup();
  };

  var changeScaleEffect = function (scaleBigger) {
    var scaleValue = getScaleValue();

    if (scaleBigger && scaleValue < 100) {
      scaleValue += SCALE_MULTIPLIER;
    }

    if (scaleBigger === undefined && scaleValue > 0) {
      scaleValue -= SCALE_MULTIPLIER;
    }

    scaleValueInput.value = scaleValue + '%';
    preview.style.transform = 'scale' + '(' + scaleValue / 100 + ')';
  };

  var onScaleSmallerBtnClick = function () {
    changeScaleEffect();
  };

  var onScaleBiggerBtnClick = function () {
    changeScaleEffect('scaleBigger');
  };

  var resetImgUploadValues = function () {
    resetScaleValue();
    window.uploadEffects.resetSlider();
    window.uploadEffects.effectsRadio[0].checked = true;
    window.uploadEffects.setVisibilityForSlider();

    textInputs.forEach(function (input) {
      input.value = null;
    });
  };

  var onSumbitSuccess = function () {
    closePopup();
    window.renderSuccessWindow();
  };

  var onSubmitError = function (errorDescription) {
    closePopup();
    window.renderError(errorDescription, 'submitError');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.xhrRequest('POST', 'https://js.dump.academy/kekstagram', onSumbitSuccess, onSubmitError, new FormData(form));
  };

  var fileReader = function () {
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.util.PICTURE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  //  Вызов при изменении инпута
  var onUploadFileInputChange = function () {
    //  Загружаем пользовательское фото
    fileReader();
    //  Открываем модальное окно
    openPopup();
  };

  var onCancelBtnClick = function () {
    closePopup();
  };

  scaleSmallerBtn.addEventListener('click', onScaleSmallerBtnClick);
  scaleBiggerBtn.addEventListener('click', onScaleBiggerBtnClick);

  uploadFileInput.addEventListener('change', onUploadFileInputChange);

  cancelBtn.addEventListener('click', onCancelBtnClick);

  form.addEventListener('submit', onFormSubmit);

  window.imgUpload = {
    preview: preview,
    resetScaleValue: resetScaleValue,
    uploadFileInput: uploadFileInput,
    overlay: overlay,
    form: form,
    resetImgUploadValues: resetImgUploadValues,
  };
})();
