// js/classes/SearchManager.js

import { search } from '../api.js';
import Movie from './Movie.js';
import Person from './Person.js';
import UIManager from '../ui.js';

/**
 * SearchManager ansvarar för att hantera alla sökningar.
 * Utför API-anrop, bearbetar svar, och använder UIManager för att visa resultat.
 */
export default class SearchManager {
  constructor() {}

  /**
   * Sök och rendera resultat direkt (t.ex. från formuläret)
   * Visar fel eller "inga resultat" automatiskt
   * @param {string} query - Text som användaren söker efter
   */
  handleSearch = async (query) => {
    UIManager.clear(); // Rensa gammalt innehåll

    try {
      const data = await search(query); // Anropa API
      const results = data.results;

      if (results.length === 0) {
        UIManager.renderMessage('Inga resultat hittades.');
        return;
      }

      // Skapa HTML för varje resultat beroende på om det är film eller person
      const html = results.map(item => {
        // Movie sök
        if (item.media_type === 'movie') {
          const movie = new Movie(item);
          return movie.renderCard();
        }
        // Person sök
        if (item.media_type === 'person') {
          const person = new Person(item);
          return person.renderCard();
        }

        return '';
      }).join('');

      UIManager.renderHTML(html);
    } catch (error) {
      console.error('Sökfel:', error);
      UIManager.renderError('Sökningen misslyckades. Kontrollera nätverket eller försök igen.');
    }
  };

  /**
   * Alternativ metod som returnerar endast data (för t.ex. sortering)
   * @param {string} query - Text att söka efter
   * @returns {object} - Sökresultat från API
   */
  searchRaw = async (query) => {
    try {
      const data = await search(query);
      return data;
    } catch (error) {
      console.error('searchRaw-fel:', error);
      UIManager.renderError('Kunde inte hämta sökresultat.');
      return { results: [] };
    }
  };
}
