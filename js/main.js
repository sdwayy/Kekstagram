'use strict';

var ESC_KEYCODE = 27;
var PHOTOS_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var userNames = [
  'Артем',
  'Наталья',
  'Оксана',
  'Михаил',
  'Ирина',
  'Александр'
];

var photosData = [];
var photosGalleryFragment = document.createDocumentFragment();
var photosGallery = document.querySelector('.pictures');
var imgUploadForm = document.querySelector('.img-upload__form');
var uploadFileInput = imgUploadForm.querySelector('.img-upload__input');
var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
var effectLevelPin = imgUploadForm.querySelector('.effect-level__pin');
var effectsItems = imgUploadForm.querySelectorAll('.effects__item');
var effectLevelDepth = imgUploadForm.querySelector('.effect-level__depth');
var textHashtags = imgUploadForm.querySelector('.text__hashtags');

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

var getHashtagsList = function () {
  var textHashtagsValue = textHashtags.value;
  var hashtagsList = textHashtagsValue.split([' ']);

  return hashtagsList;
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

var associateEffectPinWithEffectDepth = function () {
  var effectLevelPinPosition = window.getComputedStyle(effectLevelPin).left;

  effectLevelDepth.style.width = effectLevelPinPosition;
};

var onEffectsItemsMouseup = function () {
  effectLevelDepth.style.width = 0;
  effectLevelPin.style.left = 0;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFileInput.value = null;

  document.removeEventListener('keydown', onPopupEscPress);
};

var getPhotosNames = function () {
  var photosNamesList = [];

  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    photosNamesList.push(i);
  }

  shuffleArray(photosNamesList);

  return photosNamesList;
};

var completePhotosData = function () {
  var photosNames = getPhotosNames();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var userAvatarNumber = getRandomArbitrary(1, 7);

    photosData.push({
      url: 'photos/' + photosNames[i] + '.jpg',
      description: '',
      likes: getRandomArbitrary(MIN_LIKES, MAX_LIKES + 1),
      comments: []
    });

    photosData[i].comments.push({
      avatar: 'img/avatar-' + userAvatarNumber + '.svg',
      message: COMMENTS_TEXT[getRandomNumber(COMMENTS_TEXT.length)],
      name: userNames[getRandomNumber(userNames.length)]
    });
  }
};

var renderPicture = function (photoIndex, parrent) {
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var picture = pictureTemplate.cloneNode(true);

  picture.querySelector('.picture__img').setAttribute('src', photosData[photoIndex].url);
  picture.querySelector('.picture__likes').textContent = photosData[photoIndex].likes;
  picture.querySelector('.picture__comments').textContent = photosData[photoIndex].comments.length;

  parrent.appendChild(picture);

  return picture;
};

var addPhotosInPhotosGalleryFragment = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    renderPicture(i, photosGalleryFragment);
  }
};

var addMouseupEventForEffectsItems = function () {
  for (var i = 0; i < effectsItems.length; i++) {
    effectsItems[i].addEventListener('mouseup', function () {
      onEffectsItemsMouseup();
    });
  }
};
//  Заполняем PhotosData
completePhotosData();
//  Добавляем галерею фотографий в photosGalleryFragment
addPhotosInPhotosGalleryFragment();
//  Отрисовываем галерею фотографий
photosGallery.appendChild(photosGalleryFragment);
//  Показываем форму редактирования изображения при изменении значения #upload-file
uploadFileInput.addEventListener('change', openPopup);
//  Закрываем форму редактирования изображения при клике на крестик и ESC
imgUploadCancel.addEventListener('click', closePopup);
//  Изменяем ширину индикатора глубины эффекта под положение пина
effectLevelPin.addEventListener('mouseup', associateEffectPinWithEffectDepth);
//  Проверяем наличие атрибутов минимальной и максимальной длины у textHashtags
setInputValidityAttributs(textHashtags, 3, 50, true);
// Проводим валидацию textHashtags
textHashtags.addEventListener('invalid', onTextHashtagsInvalid);
textHashtags.addEventListener('input', onTextHashtagsInput);
//  Сбрасываем глубину наложенного эффекта на 0% при mouseup на превью эффекта
addMouseupEventForEffectsItems();
