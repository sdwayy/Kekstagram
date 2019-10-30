'use strict';

(function () {
  var popup = document.querySelector('.big-picture');
  var img = popup.querySelector('.big-picture__img').children[0];
  var likesCount = popup.querySelector('.likes-count');
  var socialComments = popup.querySelector('.social__comments');
  var socialCaption = popup.querySelector('.social__caption');
  var socialCommentCount = popup.querySelector(' .social__comment-count');
  var commentsLoader = popup.querySelector('.comments-loader');
  var closeBtn = popup.querySelector('.big-picture__cancel');
  var commentInput = popup.querySelector('.social__footer-text');
  var socialComment = socialComments.children[0];

  var makeBigPictureData = function (object) {
    img.src = object.url;
    likesCount.textContent = object.likes;
    socialCaption.textContent = object.description;
    socialComments.innerHTML = '';

    if (object.comments.length < 5) {
      window.util.setVisabilityForElements([commentsLoader, socialCommentCount], 'hide');
      renderComments(object, 0, object.comments.length);
    } else {
      window.util.setVisabilityForElements([commentsLoader, socialCommentCount]);
      renderComments(object, 0, 5);
    }

    socialCommentCount.textContent = socialComments.children.length + ' из ' + object.comments.length + ' комментaриев';
  };

  var onCommentsLoaderClick = function () {
    window.util.setVisabilityForElements([commentsLoader, socialCommentCount], 'hide');
    renderComments(window.mainGallery.photoObject, 5, window.mainGallery.photoObject.comments.length);
  };

  var renderComments = function (object, commentStart, commentEnd) {
    var renderComment = function (commentIndex) {
      var comment = socialComment.cloneNode(true);
      var socialPicture = comment.querySelector('.social__picture');
      var socialText = comment.querySelector('.social__text');

      socialPicture.src = object.comments[commentIndex].avatar;
      socialPicture.alt = object.comments[commentIndex].name;
      socialText.textContent = object.comments[commentIndex].message;

      socialComments.appendChild(comment);
    };

    for (var i = commentStart; i < commentEnd; i++) {
      renderComment([i]);
    }
  };

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  closeBtn.addEventListener('click', function () {
    window.setOpenCloseLogic(popup);
  });

  commentInput.setAttribute('maxlength', '140');

  window.bigPicture = {
    popup: popup,
    makeBigPictureData: makeBigPictureData,
    commentInput: commentInput,
  };
})();
