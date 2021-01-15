'use strict';
const search = document.querySelector('.imgrequired');
const form = document.getElementById('myform');
const error = document.querySelector('.error');
const imageContainer = document.querySelector('.images');
let value;
let valid;
let url;

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
