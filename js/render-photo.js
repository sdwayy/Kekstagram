'use strict';

(function () {
  window.renderPhoto = function (photosData, photoIndex, parent) {
    var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').setAttribute('src', photosData[photoIndex].url);
    picture.querySelector('.picture__likes').textContent = photosData[photoIndex].likes;
    picture.querySelector('.picture__comments').textContent = photosData[photoIndex].comments.length;

    parent.appendChild(picture);
  };
})();
