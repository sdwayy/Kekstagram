'use strict';

(function () {
  var pageMain = document.firstElementChild.children[1].children[0];
  var photosGallery = document.querySelector('.pictures');
  var photosFilter = document.querySelector('.img-filters');
  var filterBtns = photosFilter.querySelectorAll('.img-filters__button');
  var randomFilterBtn = photosFilter.querySelector('#filter-random');
  var discussedFilterBtn = photosFilter.querySelector('#filter-discussed');
  var photosData = [];

  var onPhotosDataSuccess = function (backendData) {
    photosData = Array.from(backendData);

    photosData.forEach(function (item, i) {
      item.id = i + 1;
    });

    renderGallery(photosData);

    photosFilter.classList.remove('img-filters--inactive');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        var target = evt.target;

        onFilterBtnClick(target, photosData);
      });
    });
  };

  var renderGallery = function (data) {
    var photosGalleryFragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var photoData = data[i];
      var newImage = window.renderPhoto(photoData);

      newImage.addEventListener('click', onPhotosClick);

      photosGalleryFragment.appendChild(newImage);
    }

    photosGallery.appendChild(photosGalleryFragment);

    return photosGalleryFragment;
  };

  var getRenderedPhotos = function () {
    return photosGallery.querySelectorAll('.picture');
  };

  var onFilterBtnClick = function (target, data) {
    toggleFilterBtnActiveClass(target);
    renderNewPhotos(filterPhotosData(data));
  };

  var renderNewPhotos = window.debounce(function (data) {
    deleteAddedPhotos();
    renderGallery(data);
  });

  var filterPhotosData = function (data) {
    var activeBtn = photosFilter.querySelector('.img-filters__button--active');
    var newPhotosData = data.slice();

    var filterRandom = function () {
      window.util.shuffleArray(newPhotosData);
      newPhotosData.splice(10, newPhotosData.length);
    };

    var filterDiscussed = function () {
      newPhotosData.sort(function (a, b) {
        return b.comments.length - a.comments.length;
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
        newPhotosData = data;
    }

    return newPhotosData;
  };

  var toggleFilterBtnActiveClass = function (target) {
    filterBtns.forEach(function (btn) {
      btn.classList.remove('img-filters__button--active');
    });

    target.classList.add('img-filters__button--active');
  };

  var onPhotosClick = function (evt) {
    evt.preventDefault();

    var currentTarget = evt.currentTarget;
    var currentImg = currentTarget.querySelector('img');
    var photoId = currentImg.dataset.id;

    window.mainGallery.photoObject = photosData.find(function (item) {
      return item.id === +photoId;
    });

    window.bigPicture.makeData(window.mainGallery.photoObject);

    window.setOpenCloseLogic(
        window.bigPicture.popup,
        [window.bigPicture.commentInput],
        true
    );
  };

  var deleteAddedPhotos = function () {
    var addedPhotos = getRenderedPhotos();

    for (var i = 0; i < addedPhotos.length; i++) {
      photosGallery.removeChild(addedPhotos[i]);
    }
  };

  var onPhotosDataError = function (errorDescription) {
    window.renderError(errorDescription);
  };

  window.xhrRequest(
      'GET',
      'https://js.dump.academy/kekstagram/data',
      onPhotosDataSuccess,
      onPhotosDataError
  );

  window.mainGallery = {
    pageMain: pageMain,
    photoObject: {}, // Перезаписывается при клике на фото
  };
})();
