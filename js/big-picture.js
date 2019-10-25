'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img').children[0];
  var likesCount = bigPicture.querySelector('.likes-count');
  bigPicture.classList.remove('hidden');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCommentImg = socialComments.querySelector('.social__picture');
  var socialCommentText = socialComments.querySelector('.social__text');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var socialCommentCount = bigPicture.querySelector(' .social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  setTimeout(function () {
    bigPictureImg.src = window.mainGallery.photosData[0].url;
    likesCount.textContent = window.mainGallery.photosData[0].likes;
    commentsCount.textContent = window.mainGallery.photosData[0].comments.length;
    socialCommentImg.src = 'img/avatar-' + window.util.getRandomArbitrary(1, 6) + '.svg';
    socialCommentImg.alt = window.mainGallery.photosData[0].comments[0].name;
    socialCommentText.textContent = socialCommentImg.alt = window.mainGallery.photosData[0].comments[0].message;
    socialCaption.textContent = window.mainGallery.photosData[0].description;

    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  }, 1000);

})();
