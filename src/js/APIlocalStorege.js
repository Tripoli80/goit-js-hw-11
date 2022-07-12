const LOCALSTORAGE_KEY = 'search-input';
import { refs } from './main';

export function saveSearchInput(evt) {
  evt.preventDefault();
  console.log(` value input: ${refs.input.value}`);
  localStorage.setItem(LOCALSTORAGE_KEY, refs.input.value);
}

export function updateSearchInput() {
  refs.input.value = localStorage.getItem(LOCALSTORAGE_KEY) || '';
}

export function  getSearchInput() {
  return localStorage.getItem(LOCALSTORAGE_KEY) || '';
}