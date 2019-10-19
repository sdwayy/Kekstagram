'use strict';

(function () {
  window.pageMain = document.firstElementChild.children[1].children[0];
  var photosGallery = document.querySelector('.pictures');
  var photosGalleryFragment = document.createDocumentFragment();

  var onPhotosDataSuccess = function (data) {
    window.photosData = data;

    for (var i = 0; i < window.photosData.length; i++) {
      window.renderPhoto(i, photosGalleryFragment);
    }

    photosGallery.appendChild(photosGalleryFragment);
  };

  var onPhotosDataError = function (errorDiscription) {
    window.onError(errorDiscription, 'galleryError');
  };

  window.xhrRequest('GET', 'https://js.dump.academy/kekstagram/data', onPhotosDataSuccess, onPhotosDataError);
})();
