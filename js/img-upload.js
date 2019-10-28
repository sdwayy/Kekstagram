'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var uploadFileInput = imgUploadForm.querySelector('.img-upload__input');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
  var textHashtags = imgUploadForm.querySelector('.text__hashtags');
  var imgUploadText = imgUploadForm.querySelector('.img-upload__text');

  var getHashtagsList = function () {
    var textHashtagsValue = textHashtags.value;
    var hashtagsList = textHashtagsValue.split([' ']);

    return hashtagsList;
  };

  var onTextHashtagsInput = function () {
    var minHashtagLength = 3;
    var maxHashtagLength = 15;
    var hashtagsList = getHashtagsList();

    for (var i = 0; i < hashtagsList.length; i++) {
      var hashtagLessThanSpecified = hashtagsList[i].length < minHashtagLength;
      var hashtegMoreThenSpecified = hashtagsList[i].length > maxHashtagLength;

      if (hashtagLessThanSpecified) {
        textHashtags.setCustomValidity('Слишком короткий хэштег');
      } else if (hashtegMoreThenSpecified) {
        textHashtags.setCustomValidity('Слишком длиннный хэштег');
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  };

  var onTextHashtagsInvalid = function (evt) {
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
    imgUploadOverlay.classList.add('hidden');
    window.uploadEffects.resetSlider();
    window.uploadEffects.effectsRadio[0].checked = true;
    uploadFileInput.value = null;

    for (var i = 0; i < imgUploadText.children.length; i++) {
      imgUploadText.children[i].value = null;
    }
  };

  var onSumbitSuccess = function () {
    resetImgUploadValues();
    window.renderSuccessWindow();
  };

  var onSubmitError = function (errorDescription) {
    imgUploadOverlay.classList.add('hidden');
    window.renderError(errorDescription, 'submitError');
  };

  var onFormSubmit = function () {
    window.xhrRequest('POST', 'https://js.dump.academy/kekstagram', onSumbitSuccess, onSubmitError, new FormData(imgUploadForm));
  };
  //  Показываем форму редактирования изображения при изменении значения #upload-file
  uploadFileInput.addEventListener('change', function () {
    window.setOpenCloseLogic(imgUploadOverlay, undefined, true);
  });
  //  Закрываем форму редактирования изображения при клике на крестик и ESC
  imgUploadCancel.addEventListener('click', function () {
    uploadFileInput.value = null;
    window.setOpenCloseLogic(imgUploadOverlay);
  });
  //  Проверяем наличие атрибутов минимальной и максимальной  длины у textHashtags
  window.util.setInputValidityAttributs(textHashtags, 3, 50, true);
  // Проводим валидацию textHashtags
  textHashtags.addEventListener('invalid', onTextHashtagsInvalid);
  textHashtags.addEventListener('input', onTextHashtagsInput);

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onFormSubmit();
  });

  window.imgUpload = {
    uploadFileInput: uploadFileInput,
    imgUploadOverlay: imgUploadOverlay,
    imgUploadForm: imgUploadForm,
    resetImgUploadValues: resetImgUploadValues,
  };
})();
