export default function createHTMLcard({
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
    
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </div>`;
}


