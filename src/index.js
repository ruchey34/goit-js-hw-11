import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { imgApiService } from "./js/getImg";
import { renderImgInfo } from "./js/renderHTML";

let getEl = selector => document.querySelector(selector);

getEl('.search-form').addEventListener('submit', onSearch);

getEl('.load-more').addEventListener('click', onLoadMore);

const imgApi = new imgApiService();
console.log(imgApi);

const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

function onSearch(e) {
    e.preventDefault();
    imgApi.query = e.currentTarget.elements.searchQuery.value;
    imgApi.resetPage();
    if (imgApi.query !== "") {
        getEl('.gallery').innerHTML = "";
        getEl('.load-more').classList.add('is-hidden');
    }
    imgApi.getImage().then(data => {
        imgApi.totalHits = data.totalHits;
        renderGallery(data);
    }).catch(error => {
        console.log(error);
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    })
}

function onLoadMore(e) {
    e.preventDefault();
    imgApi.page += 1;
    imgApi.decreaseTotalHits();
    console.log(imgApi.totalHits);
    if (imgApi.totalHits <= 40) {
        getEl('.load-more').style.visibility = "hidden";
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }
    imgApi.getImage().then(renderGalleryAgain).catch(error => {
        console.log(error);
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    })
}

function renderGalleryAgain(data) {
    if (data.totalHits > 0) {
        getEl('.gallery').insertAdjacentHTML('beforeend', renderImgInfo(data.hits));
        lightbox.refresh();
        getEl('.load-more').classList.remove('is-hidden');
    } else {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
}

function renderGallery(data) {
    if (data.totalHits > 0) {
        getEl('.gallery').insertAdjacentHTML('beforeend', renderImgInfo(data.hits));
        lightbox.refresh();
        getEl('.load-more').classList.remove('is-hidden');
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } else {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
    }