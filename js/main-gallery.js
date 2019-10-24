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

  var getPhotosData = function (mainPhotosData) {
    var photosData;
    var activeBtn = photosFilter.querySelector('.img-filters__button--active');

    var filterRandom = function () {
      var randomPhotos = mainPhotosData.slice();

      window.util.shuffleArray(randomPhotos);
      randomPhotos.splice(10, randomPhotos.length);

      return randomPhotos;
    };

    var filterDiscussed = function () {
      var filterPhotosByLikes = mainPhotosData
        .slice()
        .sort(function (a, b) {
          return b.likes - a.likes;
        });
      return filterPhotosByLikes;
    };

    switch (activeBtn) {
      case randomFilterBtn:
        photosData = filterRandom();
        break;
      case discussedFilterBtn:
        photosData = filterDiscussed();
        break;
      default:
        photosData = mainPhotosData;
    }
    return photosData;
  };

  var renderPhotosData = function (photosData) {
    for (var i = 0; i < photosData.length; i++) {
      window.renderPhoto(photosData, i, photosGalleryFragment);
    }

    photosGallery.appendChild(photosGalleryFragment);
  };

  var deleteAddedPhotos = function () {
    var addedPhotos = photosGallery.querySelectorAll('.picture');

    for (var i = 0; i < addedPhotos.length; i++) {
      photosGallery.removeChild(addedPhotos[i]);
    }
  };

  var rendeNewPhotos = window.debounce(function (photosData) {
    deleteAddedPhotos();
    renderPhotosData(getPhotosData(photosData));
  });

  var onFilterBtnClick = function (target, photosData) {
    toggleFilterBtnActiveClass(target);
    rendeNewPhotos(photosData);
  };

  var onPhotosDataSuccess = function (data) {
    var mainPhotosData = Array.from(data);

    renderPhotosData(mainPhotosData);
    photosFilter.classList.remove('img-filters--inactive');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        var target = evt.target;

        onFilterBtnClick(target, mainPhotosData);
      });
    });
  };


  var onPhotosDataError = function (errorDescription) {
    window.renderError(errorDescription);
  };

  window.xhrRequest('GET', 'https://js.dump.academy/kekstagram/data', onPhotosDataSuccess, onPhotosDataError);


  window.mainGallery = {
    pageMain: pageMain,
    getPhotosData: getPhotosData,
  };
})();
