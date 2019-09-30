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
var minHashtagLength = 3;
var maxHashtagLength = 50;
var minSymbolsMessage = 'Минимальное количество символов - ' + minHashtagLength;
var maxSymbolsMessage = 'Максимальное количество символов - ' + maxHashtagLength;

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

var getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getHashtagsList = function () {
  var textHashtagsValue = textHashtags.value;
  var hashtagsList = textHashtagsValue.split([' ']);

  return hashtagsList;
};

var onTextHashtagsInput = function () {
  if (textHashtags.getAttribute('minlength') === null) {
    textHashtags.setAttribute('minlength', String(minHashtagLength));
  }
  if (textHashtags.getAttribute('maxlength') === null) {
    textHashtags.setAttribute('maxlength', String(maxHashtagLength));
  }

  for (var i = 0; i < getHashtagsList().length; i++) {
    if (getHashtagsList()[i].length < minHashtagLength) {
      textHashtags.setCustomValidity('Слишком короткий хэштег');
    } else {
      textHashtags.setCustomValidity('');
    }
  }
};

var onTextHashtagsInvalid = function () {
  if (textHashtags.validity.tooShort) {
    textHashtags.setCustomValidity(minSymbolsMessage);
  } else if (textHashtags.validity.tooLong) {
    textHashtags.setCustomValidity(maxSymbolsMessage);
  } else if (textHashtags.validity.customError) {
    textHashtags.setCustomValidity('Слишком короткий хэштег');
  } else {
    textHashtags.setCustomValidity('');
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

// Заполняем массив photosData
for (var photosDataI = 0; photosDataI < PHOTOS_COUNT; photosDataI++) {
  var userAvatarNumber = getRandomArbitrary(1, 7);

  photosData.push({
    url: 'photos/' + getRandomArbitrary(1, PHOTOS_COUNT + 1) + '.jpg',
    description: '',
    likes: getRandomArbitrary(MIN_LIKES, MAX_LIKES + 1),
    comments: []
  });

  photosData[photosDataI].comments.push({
    avatar: 'img/avatar-' + userAvatarNumber + '.svg',
    message: COMMENTS_TEXT[getRandomNumber(COMMENTS_TEXT.length)],
    name: userNames[getRandomNumber(userNames.length)]
  });
}

//  Добавляем галерею фотографий в photosGalleryFragment
for (var photoI = 0; photoI < PHOTOS_COUNT; photoI++) {
  renderPicture(photoI, photosGalleryFragment);
}
//  Отрисовываем галерею фотографий
photosGallery.appendChild(photosGalleryFragment);
//  Показываем форму редактирования изображения при изменении значения #upload-file
uploadFileInput.addEventListener('change', openPopup);
//  Закрываем форму редактирования изображения при клике на крестик
imgUploadCancel.addEventListener('click', closePopup);
//  Изменяем ширину индикатора глубины эффекта под положение пина
effectLevelPin.addEventListener('mouseup', associateEffectPinWithEffectDepth);
//  Сбрасываем глубину наложенного эффекта на 0% при mouseup на превью эффекта
for (var effectsItemsI = 0; effectsItemsI < effectsItems.length; effectsItemsI++) {
  effectsItems[effectsItemsI].addEventListener('mouseup', function () {
    onEffectsItemsMouseup();
  });
}

textHashtags.addEventListener('invalid', onTextHashtagsInvalid);
textHashtags.addEventListener('input', onTextHashtagsInput);
