'use strict';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.min.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import imageGellaryInner from './galeryBild';
import ApiIner from './ApiIner';
import {
  saveSearchInput,
  updateSearchInput,
  getSearchInput,
} from './APIlocalStorege';

export const refs = {
  input: document.querySelector('input'),
  btnSearch: document.querySelector('button'),
  btnLoadMore: document.querySelector('#load-more'),

  gallery: document.querySelector('.gallery'),
};
// const SimpleLightbox = require('simplelightbox');
// import '../sass/index.scss';
// const optionGallery = {
//   name: 'car',
//   point: refs.gallery,

// };

const myGallery = new ApiIner();

updateSearchInput();

refs.btnSearch.addEventListener('click', search);

refs.btnLoadMore.addEventListener('click', loader);
refs.input.addEventListener('input', saveSearchInput);

function search(e) {
  myGallery.searchQuery = getSearchInput();
  myGallery.position = refs.gallery;
  myGallery.resetPage();

  myGallery.axiosIMG(e);
}

function loader(e) {
  myGallery.searchQuery = getSearchInput();
  myGallery.position = refs.gallery;
  myGallery.axiosIMG(e);
}

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
