// js/classes/Movie.js

/**
 * Movie-klass representerar en film från TMDb.
 * Den innehåller data om filmen och har en metod för att skapa ett HTML-kort (card).
 */
export default class Movie {
    /**
     * Konstruktor som tar emot en filmobjekt från TMDb och sparar nödvändig information.
     * @param {object} data - Ett objekt från TMDb:s API med information om filmen.
     */
    constructor(data) {
      this.title = data.title;                     // Filmens titel
      this.releaseDate = data.release_date;        // Datum då filmen släpptes
      this.popularity = data.popularity;           // Popularitetspoäng (kan användas för sortering)
      this.posterPath = data.poster_path;          // Bildsökväg för affisch
      this.overview = data.overview;               // Kort sammanfattning av filmen
      this.voteAverage = data.vote_average;        // Genomsnittligt betyg (kan användas som alternativ till popularitet)
    }
  
    /**
     * renderCard returnerar en HTML-sträng som visar filmens information i ett "kort".
     * Denna metod kan användas av t.ex. UIManager för att visa kortet på sidan.
     */
    renderCard = () => {
      return `
        <div class="movie-card">
          <img src="https://image.tmdb.org/t/p/w300${this.posterPath}" alt="${this.title}" />
          <h3>${this.title}</h3>
          <p>Releasedatum: ${this.releaseDate || 'Okänd'}</p>
          <p>Popularitet: ${this.popularity?.toFixed(1)}</p>
          <p>Betyg: ${this.voteAverage?.toFixed(1)}</p>
          <p>${this.overview || 'Ingen beskrivning tillgänglig.'}</p>
        </div>
      `;
    };
  }
  