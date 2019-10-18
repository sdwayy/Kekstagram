'use strict';

(function () {
  var pageMain = document.firstElementChild.children[1].children[0];
  var photosGallery = document.querySelector('.pictures');
  var photosGalleryFragment = document.createDocumentFragment();

  window.load('https://js.dump.academy/kekstagram/data', function (data) {
    window.photosData = data;
    var addPhotosInPhotosGalleryFragment = function () {
      for (var i = 0; i < window.photosData.length; i++) {
        window.renderPhoto(i, photosGalleryFragment);
      }
    };
    addPhotosInPhotosGalleryFragment();
    photosGallery.appendChild(photosGalleryFragment);
  },
  function (errorDiscription) {
    var errorText = errorDiscription;

    window.renderError(pageMain, errorText, 'galleryError');
  });
})();
