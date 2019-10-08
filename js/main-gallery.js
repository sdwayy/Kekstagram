'use strict';

(function () {
  var photosGallery = document.querySelector('.pictures');
  var photosGalleryFragment = document.createDocumentFragment();

  var addPhotosInPhotosGalleryFragment = function () {
    for (var i = 0; i < window.photoData.photosCount; i++) {
      window.renderPhoto(i, photosGalleryFragment);
    }
  };

  //  Добавляем галерею фотографий в photosGalleryFragment
  addPhotosInPhotosGalleryFragment();
  //  Отрисовываем галерею фотографий
  photosGallery.appendChild(photosGalleryFragment);
})();
