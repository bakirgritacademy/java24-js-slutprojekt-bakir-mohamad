// js/utils.js

/**
 * Sorterar en lista med objekt (Movie eller Person) alfabetiskt A–Ö
 */
export const sortByTitleAsc = (list) => {
    return [...list].sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
  };
  
  /**
   * Sorterar en lista med objekt alfabetiskt Ö–A
   */
  export const sortByTitleDesc = (list) => {
    return [...list].sort((a, b) => (b.title || b.name).localeCompare(a.title || a.name));
  };
  
  /**
   * Sorterar efter popularitet (stigande)
   */
  export const sortByPopularityAsc = (list) => {
    return [...list].sort((a, b) => a.popularity - b.popularity);
  };
  
  /**
   * Sorterar efter popularitet (fallande)
   */
  export const sortByPopularityDesc = (list) => {
    return [...list].sort((a, b) => b.popularity - a.popularity);
  };
  