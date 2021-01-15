'use strict';
const search = document.querySelector('.imgrequired');
const form = document.getElementById('myform');
const error = document.querySelector('.error');
const imageContainer = document.querySelector('.images');
const matches = document.getElementById('match');
const list = document.getElementById('list');
let value;
let valid;
let url;

const removeList = function () {
  matches.classList.add('hidden');
  list.innerHTML = '';
};

const matchSearch = function () {
  let arr = [];
  let res = fetch('./data.json').then(function (response) {
    response.json().then(function (json) {
      arr = json;
      const presentValue = search.value;
      if (presentValue.length < 3) removeList();
      if (presentValue.length >= 3) {
        const regex = new RegExp(`^${presentValue}`, 'gi');
        matches.classList.remove('hidden');
        error.classList.add('hidden');
        imageContainer.innerHTML = '';
        list.innerHTML = '';
        let count = 0;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].match(regex)) {
            const match = `<li>${arr[i]}</li>`;
            const position = 'beforeEnd';
            list.insertAdjacentHTML(position, match);

            count++;
            if (count === 10) break;
          }
        }
      }
    });
  });
};

search.addEventListener('input', matchSearch);
matches.addEventListener('click', function (event) {
  let element = event.target;
  search.value = element.textContent;
  removeList();
});
document.addEventListener('click', removeList);

const setError = function (message) {
  error.classList.remove('hidden');
  document.querySelector('.message').textContent = message;
  imageContainer.innerHTML = '';
};

const checkValidation = function () {
  value = search.value;
  const pattern = /^([a-zA-Z]{3,})([//s]{1}[a-zA-Z]{3,})*/;
  if (value === '') {
    setError('Please enter an image name!');
    return false;
  }
  if (!pattern.test(value)) {
    setError('Please enter a valid image name!');
    return false;
  }
  error.classList.add('hidden');
  return true;
};

const formValidation = function () {
  valid = checkValidation();
  if (valid) {
    value = search.value;
    url =
      'https://api.unsplash.com/search/photos?query=' +
      value +
      '&client_id=f9DzJDIGSsraiN9rBOtIET65JDwF0aM4IV921D86Qz0&per_page=8';
    imageContainer.innerHTML = '';
    fetchImages();
  }
  return false;
};
const fetchImages = function () {
  fetch(url).then(function (response) {
    response.json().then(function (json) {
      if (json.results.length === 8) {
        json.results.forEach((photo) => {
          const img = `<img src="${photo.urls.regular}" style="width:300px;height:350px; margin:15px 10px 15px 20px;"/>`;
          imageContainer.insertAdjacentHTML('beforeend', img);
        });
      } else {
        imageContainer.innerHTML = '';
        const text = `<p style="font-size:30px;text-align:center;color:black;margin-top:15px;">Sorry! Couldn't find what you want!</p>`;
        imageContainer.insertAdjacentHTML('beforeend', text);
      }
    });
  });
};
