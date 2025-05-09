// js/api.js

// Din unika API-nyckel från The Movie Database.
// Den används för att identifiera dig vid varje anrop till TMDb:s servrar.
const API_KEY = 'cd2d2494547c2c0c8a66bfa25035ce05';

// Bas-URL för alla API-anrop till TMDb:s REST API
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Hämtar en lista med de filmer som är högst rankade just nu (Top Rated).
 * Returnerar ett JSON-objekt som innehåller en array av filmer.
 * Använder språk "sv-SE" för att få svensk översättning när tillgänglig.
 */
export const fetchTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=sv-SE&page=1`);
  const data = await res.json();
  return data; // innehåller bl.a. data.results med filmer
};

/**
 * Hämtar en lista med de mest populära filmerna just nu.
 * Returnerar ett JSON-objekt med en array av filmer sorterade efter popularitet.
 */
export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=sv-SE&page=1`);
  const data = await res.json();
  return data;
};

/**
 * Söker efter filmer, TV-serier eller personer baserat på en textsträng (query).
 * Använder TMDb:s "multi"-sök, som returnerar blandade typer i resultatet.
 * Används när en användare skriver något i sökfältet.
 *
 * @param {string} query - Text som användaren söker efter (t.ex. filmtitel eller skådespelarnamn)
 * @returns {Promise<object>} - JSON-objekt med sökresultat
 */
export const search = async (query, type = 'multi') => {
  const res = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&language=sv-SE&query=${encodeURIComponent(query)}&page=1`);
  const data = await res.json();
  return data;
};
