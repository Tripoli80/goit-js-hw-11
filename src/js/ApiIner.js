const axios = require('axios').default;
const API_KEY = '28552926-42791f44734bdc6e191538ce6';
import { getSearchInput } from './APIlocalStorege';
var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  // captionsData: 'alt',
  showCounter: false,
});
export default class ApiIner {
  constructor() {
    this.searchQuery = '';
    this.positionHTML = null;
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get position() {
    return this.positionHTML;
  }
  set position(newPoint) {
    this.positionHTML = newPoint;
  }
  resetPage() {
    this.positionHTML.innerHTML = ' ';
    this.page = 1;
  }
  reset() {
    console.log('fwefew', this.positionHTML);

    this.positionHTML.innerHTML = '';
  }
  axiosIMG(evt) {
    evt.preventDefault();
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.query}&per_page=10&page=${this.page}`;
    console.log(URL);
    const point = this.position;
    let result = [];
    const search = axios
      .get(URL)
      .then(function (response) {
        result = [...response.data.hits];
        renderHTML(result, point);
      })
      .catch(function (error) {
        console.log(error);
      });

    search.then(() => {
      lightbox.refresh();
      this.page += 1;
    });
    console.log(this.page);
  }
}

function renderHTML(galleryItems, pointHTML) {
  pointHTML.insertAdjacentHTML(
    'beforeend',
    galleryItems.map(createItemGalery).join('')
  );
}
function createItemGalery({
  previewURL,
  largeImageURL,
  comments,
  views,
  likes,
  downloads,
}) {
  return `<a class="gallery__item" href=${largeImageURL}>  <img src="${previewURL}" alt="pic" height ="100%" loading="lazy" />  </a>

`;
}
