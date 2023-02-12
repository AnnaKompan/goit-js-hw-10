import '../css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();

  const value = e.target.value.trim();

  fetchCountries(value)
    .then(data => {
      clearMarkup();

      if (data.length === 1) {
        countryList.innerHTML = makeListMarkup(data);
        countryInfo.innerHTML = makeInfoMarkup(data);
      } else if (data.length > 10) {
        clearMarkup();
        alertInfo();
      } else {
        countryList.innerHTML = makeListMarkup(data);
      }
    })
    .catch(alertFailure());
}

function makeListMarkup(data) {
  const listMarkup = data
    .map(({ name, flags }) => {
      return `<li class="country-item">
    <img src=${flags.svg} alt="country-img" width='30'>
    <h1 class="country-name">${name.official}</h1>
  </li>`;
    })
    .join('');
  return listMarkup;
}

function makeInfoMarkup(data) {
  const infoMarkup = data
    .map(({ capital, population, languages }) => [
      `<ul class="country__list-items">
    <li class="country-capital"> <b>Capital:</b> ${capital}</li>
    <li class="country-population"> <b>Population:</b> ${population}</li>
    <li class="country-languages"> <b>Languages:</b> ${Object.values(
      languages
    )}</li>
  </ul>`,
    ])
    .join('');
  return infoMarkup;
}

function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function alertInfo() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function alertFailure() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
