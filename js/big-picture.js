'use strict';

(function () {
  var COMMENTS_LOADER_MULTIPLIER = 5;

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

  var photoObject;
  var totalComments;
  var commentsCount;

  var reserCommentInputValue = function () {
    commentInput.value = null;
  };

  var openCloseLogic = new window.PopupLogic(popup, [commentInput], reserCommentInputValue);

  var togglePopup = function () {
    openCloseLogic.togglePopup();
  };

  var getCommentsCount = function () {
    return socialComments.children.length;
  };

  var hideUndueInterface = function () {
    var undueInterfaceList = [
      commentsLoader,
      socialCommentCount,
    ];

    return window.util.setVisabilityForElements(undueInterfaceList, 'hide');
  };

  var generateCommentCountMessage = function () {
    socialCommentCount.textContent =
      commentsCount + ' из ' + totalComments + ' комментaриев';
  };

  var makeData = function (object) {
    photoObject = object;
    totalComments = photoObject.comments.length;

    img.src = photoObject.url;
    likesCount.textContent = photoObject.likes;
    socialCaption.textContent = photoObject.description;
    socialComments.innerHTML = '';

    if (totalComments < COMMENTS_LOADER_MULTIPLIER) {
      hideUndueInterface();
      renderComments(photoObject, 0, totalComments);
    } else {
      window.util.setVisabilityForElements([
        commentsLoader, socialCommentCount
      ]);

      renderComments(photoObject, 0, COMMENTS_LOADER_MULTIPLIER);

      commentsCount = COMMENTS_LOADER_MULTIPLIER;
    }

    generateCommentCountMessage();
  };

  var onCommentsLoaderClick = function () {
    if (commentsCount + COMMENTS_LOADER_MULTIPLIER < totalComments) {
      renderComments(
          photoObject,
          commentsCount,
          commentsCount + COMMENTS_LOADER_MULTIPLIER
      );
    } else {
      hideUndueInterface();
      renderComments(photoObject, commentsCount, totalComments);
    }

    commentsCount = getCommentsCount();
    generateCommentCountMessage();
  };

  var renderComments = function (object, commentStart, commentEnd) {
    var renderComment = function (commentIndex) {
      var comment = socialComment.cloneNode(true);
      var socialPicture = comment.querySelector('.social__picture');
      var socialText = comment.querySelector('.social__text');
      var uniqueComment = object.comments[commentIndex];

      socialPicture.src = uniqueComment.avatar;
      socialPicture.alt = uniqueComment.name;
      socialText.textContent = uniqueComment.message;

      socialComments.appendChild(comment);
    };

    for (var i = commentStart; i < commentEnd; i++) {
      renderComment([i]);
    }
  };

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  closeBtn.addEventListener('click', togglePopup);

  commentInput.setAttribute('maxlength', '140');

  window.bigPicture = {
    popup: popup,
    togglePopup: togglePopup,
    makeData: makeData,
    commentInput: commentInput,
  };
})();
