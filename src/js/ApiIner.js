const axios = require('axios').default;
const API_KEY = '28552926-42791f44734bdc6e191538ce6';

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
    this.getHits = 0;
    this.totalHits = 1;
    this.onePage = 40;
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
  reset() {
    this.positionHTML.innerHTML = ' ';
    this.page = 1;
    this.getHits = 0;
    this.totalHits = 1;
  }
  async axiosIMG() {
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.query}&per_page=${this.onePage}&page=${this.page}`;

    return await axios
      .get(URL)
      .then(function (response) {
        return {
          hits: [...response.data.hits],
          totalCount: response.data.totalHits,
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  liteboxReflesh() {
    lightbox.refresh();
  }
  pageincrement() {
    this.page += 1;
  }

  total(addToTotal) {
    this.totalHits = addToTotal;
  }
  checkTotalHits() {
    return this.totalHits > this.getHits;
  }
}
