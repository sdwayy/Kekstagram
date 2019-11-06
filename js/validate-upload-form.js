'use strict';

(function () {
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_COUNT = 5;

  var form = window.imgUpload.form;
  var hashtagInput = form.querySelector('.text__hashtags');
  var commentInput = form.querySelector('.text__description');

  var repeatedHashtags;
  var hashtagLessThanSpecified;
  var hashtegMoreThenSpecified;
  var missedOctothorpe;
  var tooLongInput = hashtagInput.validity.tooLong;
  var tooMuchHashtags;

  var getHashtagsList = function () {
    var hashtagInputValue = hashtagInput.value;
    var hashtagsList = hashtagInputValue.split([' ']);

    return hashtagsList;
  };

  var checkHashtagList = function () {
    var hashtagsList = getHashtagsList();

    tooMuchHashtags = hashtagsList.length > MAX_HASHTAGS_COUNT;

    for (var i = 0; i < hashtagsList.length; i++) {
      hashtagLessThanSpecified = hashtagsList[i].length < MIN_HASHTAG_LENGTH;
      hashtegMoreThenSpecified = hashtagsList[i].length > MAX_HASHTAG_LENGTH;
      missedOctothorpe = hashtagsList[i][0] !== '#';

      for (var j = 0; j < hashtagsList.length - 1; j++) {
        repeatedHashtags = i !== j && hashtagsList[i] === hashtagsList[j];
      }
    }
  };

  var setHashtagValidityMessage = function () {
    var message;

    switch (true) {
      case hashtagLessThanSpecified:
        message = 'Слишком короткий хэштег';
        break;

      case hashtegMoreThenSpecified:
        message = 'Слишком длиннный хэштег';
        break;

      case missedOctothorpe:
        message = 'А где # ?';
        break;

      case repeatedHashtags:
        message = 'Ой, такой хэштег уже был';
        break;

      case tooLongInput:
        message =
          'Максимальное количество символов - ' +
          hashtagInput.getAttribute('maxlength');
        break;

      case tooMuchHashtags:
        message = 'Максимальное количество хэштегов - ' + MAX_HASHTAGS_COUNT;
        break;

      default:
        message = '';
    }

    window.util.setCustomValidityMessage(hashtagInput, message);

    return message;
  };

  var onHashtagInputInput = function () {
    checkHashtagList();
    setHashtagValidityMessage();
  };

  var onHashtagInputInvalid = function () {
    setHashtagValidityMessage();
  };

  window.util.setInputValidityAttributs(hashtagInput, 2);
  window.util.setInputValidityAttributs(commentInput, 1, 140);

  hashtagInput.addEventListener('invalid', onHashtagInputInvalid);
  hashtagInput.addEventListener('input', onHashtagInputInput);

}());
