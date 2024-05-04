//Secure Random
function getSecureRandom(min, max) {
  var randomWords;
  var wordCount = 1;
  // First we're going to try to use a built-in CSPRNG
  if (window.crypto && window.crypto.getRandomValues) {
    randomWords = new Int32Array(wordCount);
    window.crypto.getRandomValues(randomWords);
  }
  // Because of course IE calls it msCrypto instead of being standard
  else if (window.msCrypto && window.msCrypto.getRandomValues) {
    randomWords = new Int32Array(wordCount);
    window.msCrypto.getRandomValues(randomWords);
  }
      // So, no built-in functionality - bummer. If the user has wiggled the mouse enough,
  // sjcl might help us out here
  else if (sjcl.random.isReady()) {
    randomWords = sjcl.random.randomWords(wordCount);
  }
      // Last resort - we'll use isaac.js to get a random number. It's seeded from Math.random(),
      // so this isn't ideal, but it'll still greatly increase the space of guesses a hacker would
  // have to make to crack the password.
  else {
    randomWords = [];
    for (var i = 0; i < wordCount; i++) {
      randomWords.push(isaac.rand());
    }
  }

  var randomNumber = randomWords[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
};


//隨機排序ARRAY
function randomSortArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.abs(getSecureRandom(1, array.length - 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//取得隨機A~Z
function getRndAZArray() {
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return randomSortArray(str.split(''));
}

function getRndazArray() {
  var str = "abcdefghijklmnopqrstuvwxyz";
  return randomSortArray(str.split(''));
}

//取得隨機0~9
function getRndNumArray() {
  var str = "1234567890";
  return randomSortArray(str.split(''));
}