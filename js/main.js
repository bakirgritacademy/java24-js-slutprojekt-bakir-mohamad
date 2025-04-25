// js/main.js

// Import av klasser och funktioner
import Movie from './classes/Movie.js';
import Person from './classes/Person.js';
import { fetchTopRatedMovies, fetchPopularMovies } from './api.js';
import UIManager from './ui.js';
import SearchManager from './classes/SearchManager.js';
import {
  sortByTitleAsc,
  sortByTitleDesc,
  sortByPopularityAsc,
  sortByPopularityDesc
} from './utils.js';

// Hämtar HTML-element från sidan
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const btnTopRated = document.getElementById('btn-top-rated');
const btnPopular = document.getElementById('btn-popular');
const sortSelect = document.getElementById('sort');


let currentItems = []; 
/** Spara aktuell lista och typ för sortering/sökning
* Innehåller filmer eller personer som visas just nu.
* Används vid sortering och rendering.
*/
let currentType = ''; 
/** 'movie' eller 'person'
* Anger vilken typ av innehåll som visas ('movie' eller 'person').
* Behövs för att veta om vi ska använda Movie-klass eller Person-klass när vi renderar.
*/

// Skapar sökhanterare
const searchManager = new SearchManager();

/**
 * Visar filmer från angiven API-funktion (popular/top rated)
 * Sätter även currentItems för att möjliggöra sortering
 */
const showMovies = async (fetchFunc) => {
  UIManager.clear();

  try {
    const data = await fetchFunc();
    currentItems = data.results.slice(0, 10);
    currentType = 'movie';

    const html = currentItems.map(item => new Movie(item).renderCard()).join('');
    UIManager.renderHTML(html);
  } catch (error) {
    console.error('Fel vid hämtning av filmer:', error);
    UIManager.renderError('Kunde inte hämta filmer. Kontrollera nätverket.');
  }
};

// Event: klick på "Top Rated"
btnTopRated.addEventListener('click', () => showMovies(fetchTopRatedMovies));

// Event: klick på "Popular"
btnPopular.addEventListener('click', () => showMovies(fetchPopularMovies));

/**
 * Hanterar sökning från formuläret
 */
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  const data = await searchManager.searchRaw(query);
  currentItems = data.results;
  currentType = detectResultType(currentItems);

  if (currentItems.length === 0) {
    UIManager.renderMessage('Inga resultat hittades.');
    return;
  }

  renderItems(currentItems, currentType);
});

/**
 * Hanterar sortering när användaren ändrar i dropdown. Lägger till ... ( spread operator) kopia av array för att skapa 
 * en kopia. Utan det hade det varit svårt att återgå till ursprungsordningen.
 */
sortSelect.addEventListener('change', () => {
  if (!currentItems.length) return;

  let sorted = [...currentItems];
  switch (sortSelect.value) {
    case 'title-asc': sorted = sortByTitleAsc(sorted); break;
    case 'title-desc': sorted = sortByTitleDesc(sorted); break;
    case 'popularity-asc': sorted = sortByPopularityAsc(sorted); break;
    case 'popularity-desc': sorted = sortByPopularityDesc(sorted); break;
  }

  renderItems(sorted, currentType);
});

/**
 * Renderar en lista av Movie- eller Person-objekt
 * @param {array} list - Lista med filmer eller personer
 * @param {string} type - 'movie' eller 'person'
 */
const renderItems = (list, type) => {
  const html = list.map(item =>
    type === 'movie'
      ? new Movie(item).renderCard()
      : new Person(item).renderCard()
  ).join('');
  UIManager.renderHTML(html);
};

/**
 * Hjälpmetod: avgör vilken typ sökresultatet innehåller
 * @param {array} results - Array av objekt med media_type
 * @returns {string} - 'movie' eller 'person'
 */
const detectResultType = (results) => {
  const first = results.find(item => item.media_type);
  return first?.media_type || 'movie';
};
