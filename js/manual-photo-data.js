'use strict';

(function () {
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

  var getPhotosNames = function () {
    var photosNamesList = [];

    for (var i = 1; i <= PHOTOS_COUNT; i++) {
      photosNamesList.push(i);
    }

    window.util.shuffleArray(photosNamesList);

    return photosNamesList;
  };

  var completePhotosData = function () {
    var photosNames = getPhotosNames();

    for (var i = 0; i < PHOTOS_COUNT; i++) {
      var photoUrl = 'photos/' + photosNames[i] + '.jpg';
      var likesCount = window.util.getRandomArbitrary(MIN_LIKES, MAX_LIKES + 1);
      var userAvatarNumber = window.util.getRandomArbitrary(1, 7);
      var avatarUrl = 'img/avatar-' + userAvatarNumber + '.svg';
      var commentMessage = COMMENTS_TEXT[window.util.getRandomNumber(COMMENTS_TEXT.length)];
      var commentAuthor = userNames[window.util.getRandomNumber(userNames.length)];

      photosData.push({
        url: photoUrl,
        description: '',
        likes: likesCount,
        comments: []
      });

      photosData[i].comments.push({
        avatar: avatarUrl,
        message: commentMessage,
        name: commentAuthor,
      });
    }
  };
  //  Заполняем PhotosData
  completePhotosData();

  window.photoData = {
    photosCount: PHOTOS_COUNT,
    photosData: photosData,
  };
})();
