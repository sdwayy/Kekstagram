'use strict';

(function () {
  window.renderPhoto = function (photoIndex, parent) {
    var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').setAttribute('src', window.photosData[photoIndex].url);
    picture.querySelector('.picture__likes').textContent = window.photosData[photoIndex].likes;
    picture.querySelector('.picture__comments').textContent = window.photosData[photoIndex].comments.length;

    parent.appendChild(picture);
  };
})();
