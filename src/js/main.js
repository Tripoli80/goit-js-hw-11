import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const throttle = require('lodash.throttle');

const nowords = 'Ви щось нічого не написали....';
const info = `Усьо, кіна не буде / We're sorry, but you've reached the end of search results.`;
// import imageGellaryInner from './galeryBild';
import ApiIner from './ApiIner';
import createHTMLcard from './returnHTML';
import {
  saveSearchInput,
  updateSearchInput,
  getSearchInput,
} from './APIlocalStorege';

export const refs = {
  body: document,
  input: document.querySelector('input'),
  formSearch: document.querySelector('#search-form'),
  btnLoadMore: document.querySelector('#load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.input.addEventListener('click', totop);
const myGallery = new ApiIner();

updateSearchInput();

refs.formSearch.addEventListener('submit', search);
refs.btnLoadMore.addEventListener('click', loader);
refs.input.addEventListener('input', saveSearchInput);
refs.input.addEventListener('input', totop);

function search(e) {
  e.preventDefault();

  totop();

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

async function getNewCards({ hits, totalCount }) {
  myGallery.total(totalCount);
  if (!myGallery.checkTotalHits()) {
    btnDisenable(refs.btnLoadMore);
    Notify.info(info);
  } else {
    renderHTML(hits, myGallery.position);
    myGallery.liteboxReflesh();
    if (myGallery.page === 1) {
      Notify.success(`Hooray! We found ${myGallery.totalHits} images.`);
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

refs.body.addEventListener('scroll', throttle(checkPosition, 300));
refs.body.addEventListener('resize', throttle(checkPosition, 300));
function checkPosition(e) {
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

  if (position >= threshold && myGallery.getHits > 0) {
    loader(e);
    // Если мы пересекли полосу-порог, вызываем нужное действие.
  }
}

function totop() {
  const scrolled = window.scrollY;
  window.scrollBy({
    top: -scrolled,
    behavior: 'smooth',
  });
}
