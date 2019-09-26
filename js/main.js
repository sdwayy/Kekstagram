'use strict';

var getRandomNumber = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};

var getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var photosCount = 25;
var minLikes = 15;
var maxLikes = 200;
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
// Заполняем массив photosData
for (var i = 0; i < photosCount; i++) {
  var userAvatarNumber = getRandomArbitrary(1, 7);

  photosData.push({
    url: 'photos/' + getRandomArbitrary(1, photosCount + 1) + '.jpg',
    description: '',
    likes: getRandomArbitrary(minLikes, maxLikes + 1),
    comments: []
  });

  photosData[i].comments.push({
    avatar: 'img/avatar-' + userAvatarNumber + '.svg',
    message: COMMENTS_TEXT[getRandomNumber(COMMENTS_TEXT.length)],
    name: userNames[getRandomNumber(userNames.length)]
  });
}

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

var photosGalleryFragment = document.createDocumentFragment();
//  Добавляем галерею фотографий в documentFragment
for (var currentPhoto = 0; currentPhoto < photosCount; currentPhoto++) {
  renderPicture(currentPhoto, photosGalleryFragment);
}

var photosGallery = document.querySelector('.pictures');
//  Отрисовываем галерею фотографий
photosGallery.appendChild(photosGalleryFragment);
