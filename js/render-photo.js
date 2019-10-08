'use strict';

(function () {
  window.renderPhoto = function (photoIndex, parrent) {
    var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').setAttribute('src', window.photoData.photosData[photoIndex].url);
    picture.querySelector('.picture__likes').textContent = window.photoData.photosData[photoIndex].likes;
    picture.querySelector('.picture__comments').textContent = window.photoData.photosData[photoIndex].comments.length;

    parrent.appendChild(picture);

    return picture;
  };
})();
