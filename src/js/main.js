'use strict';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.min.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const throttle = require('lodash.throttle');

const nowords = 'Ви щось нічого не написали....';
const info = `Усьо, кіна не буде / We're sorry, but you've reached the end of search results.`;
// import imageGellaryInner from './galeryBild';
import ApiIner from './ApiIner';
import {
  saveSearchInput,
  updateSearchInput,
  getSearchInput,
} from './APIlocalStorege';

export const refs = {
  input: document.querySelector('input'),
  formSearch: document.querySelector('#search-form'),
  btnLoadMore: document.querySelector('#load-more'),
  gallery: document.querySelector('.gallery'),
};

const myGallery = new ApiIner();

updateSearchInput();

refs.formSearch.addEventListener('submit', search);
refs.btnLoadMore.addEventListener('click', loader);
refs.input.addEventListener('input', saveSearchInput);

function search(e) {
  e.preventDefault();
  myGallery.searchQuery = getSearchInput();
  myGallery.position = refs.gallery;
  btnEnable(refs.btnLoadMore);
  myGallery.reset();

  if (myGallery.searchQuery) {
    btnEnable(refs.btnLoadMore);
    myGallery.axiosIMG().then(getNewCards);
  } else {
    btnDisenable(refs.btnLoadMore);
    Notify.failure(nowords);
  }
}
function loader(e) {
  e.preventDefault();
  if (myGallery.checkTotalHits()) {
    myGallery.pageincrement();

    myGallery.axiosIMG().then(getNewCards);
  } else {
    btnDisenable(refs.btnLoadMore);
    Notify.info(info);
  }
}

function getNewCards({ hits, totalCount }) {
  myGallery.total(totalCount);
  if (!myGallery.checkTotalHits()) {
    btnDisenable(refs.btnLoadMore);
    Notify.info(info);
  } else {
    renderHTML(hits, myGallery.position);
    myGallery.liteboxReflesh();
    if (myGallery.page === 1) {
      Notify.success(`Hooray! We found ${myGallery.totalHits} images.`);
      window.scrollBy({
        top: 10,
        behavior: 'smooth',
      });
    } else {
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
      });
    }
  }
}

function renderHTML(galleryItems, pointHTML) {
  myGallery.getHits += galleryItems.length;

  pointHTML.insertAdjacentHTML(
    'beforeend',
    galleryItems.map(createHTMLcard).join('')
  );
}

function createHTMLcard({
  previewURL,
  largeImageURL,
  comments,
  views,
  likes,
  downloads,
}) {
  return `
  <div class="gallery__item"> 
  <a class="gallery__link " href=${largeImageURL}>
  <img src="${previewURL}" alt="pic" class = "gallery__image " loading="lazy" /> 
     </a>
   <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
  </div>`;
}

function btnEnable(btn) {
  if (btn.hasAttribute('disabled')) {
    btn.removeAttribute('disabled');
    btn.classList.toggle('none');
  }
}

function btnDisenable(btn) {
  if (!btn.hasAttribute('disabled')) {
    btn.setAttribute('disabled', 'disabled');
    setTimeout(() => {
      btn.classList.toggle('none');
    }, 1500);
  }
}

window.addEventListener('scroll', throttle(checkPosition, 300));
window.addEventListener('resize', throttle(checkPosition, 300));

async function checkPosition(e) {
  // Нам потребуется знать высоту документа и высоту экрана:
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  // Они могут отличаться: если на странице много контента,
  // высота документа будет больше высоты экрана (отсюда и скролл).

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = window.scrollY;

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  const threshold = height - screenHeight / 4;

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    await loader(e);
    // Если мы пересекли полосу-порог, вызываем нужное действие.
  }
}
