'use strict';

(function () {
  window.renderPhoto = function (photoData) {
    var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    var picture = pictureTemplate.cloneNode(true);
    var img = picture.querySelector('.picture__img');
    var likes = picture.querySelector('.picture__likes');
    var comments = picture.querySelector('.picture__comments');

    img.setAttribute('src', photoData.url);
    likes.textContent = photoData.likes;
    comments.textContent = photoData.comments.length;
    img.dataset.id = photoData.id;

    return picture;
  };
})();
