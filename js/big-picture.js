'use strict';

(function () {
  var popup = document.querySelector('.big-picture');
  var img = popup.querySelector('.big-picture__img').children[0];
  var likesCount = popup.querySelector('.likes-count');
  var commentsCount = popup.querySelector('.comments-count');
  var socialComments = popup.querySelector('.social__comments');
  var socialCommentImg = socialComments.querySelector('.social__picture');
  var socialCommentText = socialComments.querySelector('.social__text');
  var socialCaption = popup.querySelector('.social__caption');
  var socialCommentCount = popup.querySelector(' .social__comment-count');
  var commentsLoader = popup.querySelector('.comments-loader');
  var closeBtn = popup.querySelector('.big-picture__cancel');
  var commentInput = popup.querySelector('.social__footer-text');

  var makeBigPictureData = function (photosData, photoId, commentId) {
    img.src = photosData[photoId].url;
    likesCount.textContent = photosData[photoId].likes;
    commentsCount.textContent = photosData[photoId].comments.length;
    socialCommentImg.src = 'img/avatar-' + window.util.getRandomArbitrary(1, 6) + '.svg';
    socialCommentImg.alt = photosData[photoId].comments[commentId].name;
    socialCommentText.textContent = socialCommentImg.alt = window.mainGallery.photosData[photoId].comments[commentId].message;
    socialCaption.textContent = photosData[photoId].description;
  };

  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  closeBtn.addEventListener('click', function () {
    window.setOpenCloseLogic(popup, undefined);
  });

  commentInput.setAttribute('maxlength', '140');

  window.bigPicture = {
    popup: popup,
    makeBigPictureData: makeBigPictureData,
    commentInput: commentInput,
  };
})();
