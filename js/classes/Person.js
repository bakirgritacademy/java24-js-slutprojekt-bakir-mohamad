// js/classes/Person.js

/**
 * Person-klass representerar en person från TMDb (skådespelare, regissör m.m.).
 * Klassen innehåller data om personen och en metod för att visa detta i ett HTML-kort.
 */
export default class Person {
    /**
     * Tar emot ett personobjekt från API-svaret och sparar relevant data.
     * @param {object} data - Ett objekt från TMDb:s API som beskriver en person.
     */
    constructor(data) {
      this.name = data.name;                           // Namn på personen
      this.popularity = data.popularity;               // Popularitetspoäng
      this.department = data.known_for_department;     // T.ex. Acting, Directing
      this.profilePath = data.profile_path;            // Sökväg till personens profilbild
      this.knownFor = data.known_for || [];            // Lista över kända verk (filmer/TV-serier)
    }
  
    /**
     * Skapar och returnerar ett HTML-kort som presenterar personens information.
     * Visar även en lista på de filmer/serier personen är känd för.
     */
    renderCard = () => {
      const knownList = this.knownFor.map(item => {
        const type = item.media_type === 'tv' ? 'TV' : 'Movie';
        const title = item.title || item.name || 'Okänt namn';
        return `${type}: ${title}`;
      }).join('<br>');
  
      return `
        <div class="person-card">
          <img src="https://image.tmdb.org/t/p/w300${this.profilePath}" alt="${this.name}" />
          <h3>${this.name}</h3>
          <p>Popularitet: ${this.popularity?.toFixed(1)}</p>
          <p>Känd för: ${this.department || 'Okänt'}</p>
          <div>${knownList}</div>
        </div>
      `;
    };
  }
  