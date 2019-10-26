'use strict';

(function () {
  var pageMain = document.firstElementChild.children[1].children[0];
  var photosGallery = document.querySelector('.pictures');
  var photosGalleryFragment = document.createDocumentFragment();
  var photosFilter = document.querySelector('.img-filters');
  var filterBtns = photosFilter.querySelectorAll('.img-filters__button');
  var randomFilterBtn = photosFilter.querySelector('#filter-random');
  var discussedFilterBtn = photosFilter.querySelector('#filter-discussed');

  var toggleFilterBtnActiveClass = function (target) {
    filterBtns.forEach(function (btn) {
      btn.classList.remove('img-filters__button--active');
    });
    target.classList.add('img-filters__button--active');
  };

  var photosData;

  var getPhotosData = function (data) {
    var activeBtn = photosFilter.querySelector('.img-filters__button--active');

    var filterRandom = function () {
      photosData = data.slice();

      window.util.shuffleArray(photosData);
      photosData.splice(10, photosData.length);
    };

    var filterDiscussed = function () {
      photosData = data
        .slice()
        .sort(function (a, b) {
          return b.likes - a.likes;
        });
    };

    switch (activeBtn) {
      case randomFilterBtn:
        filterRandom();
        break;
      case discussedFilterBtn:
        filterDiscussed();
        break;
      default:
        photosData = data;
    }

    return photosData;
  };

  var renderPhotosData = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.renderPhoto(data, i, photosGalleryFragment);
    }

    photosGallery.appendChild(photosGalleryFragment);
  };

  var deleteAddedPhotos = function () {
    var addedPhotos = photosGallery.querySelectorAll('.picture');

    for (var i = 0; i < addedPhotos.length; i++) {
      photosGallery.removeChild(addedPhotos[i]);
    }
  };

  var renderNewPhotos = window.debounce(function (data) {
    deleteAddedPhotos();
    renderPhotosData(data);
  });

  var onFilterBtnClick = function (target, mainPhotosData) {
    toggleFilterBtnActiveClass(target);
    renderNewPhotos(getPhotosData(mainPhotosData));
    window.mainGallery.photosData = photosData;
  };

  var onPhotosDataSuccess = function (backendData) {
    var mainPhotosData = Array.from(backendData);

    photosData = mainPhotosData;
    window.mainGallery.photosData = photosData;
    renderPhotosData(mainPhotosData);
    photosFilter.classList.remove('img-filters--inactive');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        var target = evt.target;

        onFilterBtnClick(target, mainPhotosData);
      });
    });

    window.makeBigPictureData(photosData, 0, 0);
  };


  var onPhotosDataError = function (errorDescription) {
    window.renderError(errorDescription);
  };

  window.xhrRequest('GET', 'https://js.dump.academy/kekstagram/data', onPhotosDataSuccess, onPhotosDataError);

  window.mainGallery = {
    pageMain: pageMain,
    photosData: photosData,
  };
})();
