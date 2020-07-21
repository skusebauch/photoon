const auth = "563492ad6f91700001000001c4568fca5a9d4168bccdbdeaa5894517";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

// EventListeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(event) {
  searchValue = event.target.value;
}

// refactor fetch header
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}
// refactor HTML MARKUP of the pictures
function generatePicsMarkup(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
      <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}">Download</a>
      </div>
      <img src="${photo.src.large}"></img>
    `;
    gallery.appendChild(galleryImg);
  });
}

// Getting Photos "curated photos from the doc"
async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?per_page=15?page=1"
  );
  generatePicsMarkup(data);
}

// Getting phots from searchinput
async function searchPhotos(search) {
  clearSearch();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${search}&per_page=15?page=1`
  );
  generatePicsMarkup(data);
}

function clearSearch() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

curatedPhotos();
