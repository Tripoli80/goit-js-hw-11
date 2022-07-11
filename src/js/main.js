'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.min.js';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import imageGellaryInner from './galeryBild';

export const refs = {
  input: document.querySelector('input'),
  btn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
};
// const SimpleLightbox = require('simplelightbox');
// import '../sass/index.scss';
// const gallery = new imageGellaryInner;

// gallery.name = 'car';
// gallery.pointHTML = refs.gallery;

import { saveSearchInput, updateSearchInput } from './APIlocalStorege';
const axios = require('axios').default;
const API_KEY = '28552926-42791f44734bdc6e191538ce6';

updateSearchInput();
refs.btn.addEventListener('click', searchPXimages);
refs.input.addEventListener('input', saveSearchInput);

function searchPXimages(evt) {
  evt.preventDefault();
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${refs.input.value}&per_page=10`;
  let result = [];
  axios
    .get(URL)
    .then(function (response) {
      result = [...response.data.hits];
      renderHTML(result);
      // setTimeout(gallery.reset, 1500);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

function renderHTML(galleryItems) {
  refs.gallery.innerHTML = galleryItems.map(createItemGalery).join('');
}

//create item
function createItemGalery({
  previewURL,
  largeImageURL,
  comments,
  views,
  likes,
  downloads,
}) {
  return `<a class="gallery__item" href=${largeImageURL}>  <img src="${previewURL}" alt="pic" heigt ="150px" loading="lazy" /> </a>
  
`;
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  // captionsData: 'alt',
  showCounter: false,
});

// lightbox.on('show.simplelightbox', function () {
//   console.log("in")
// // });
// <div class="photo-card">
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads:${downloads}</b>
//     </p>
//   </div>
// </div>;
