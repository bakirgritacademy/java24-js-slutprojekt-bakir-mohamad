// js/ui.js

/**
 * UIManager ansvarar för att uppdatera användargränssnittet.
 * All manipulation av DOM-element som visar resultat, fel eller meddelanden sker här.
 */
const UIManager = (() => {
    // Referens till elementet där resultat visas
    const resultsContainer = document.getElementById('results-container');
  
    /**
     * Rensar hela visningsytan från tidigare innehåll
     */
    const clear = () => {
      resultsContainer.innerHTML = '';
    };
  
    /**
     * Visar en HTML-sträng direkt i visningsytan
     * @param {string} html - HTML-kod att visa (t.ex. lista av kort)
     */
    const renderHTML = (html) => {
      resultsContainer.innerHTML = html;
    };
  
    /**
     * Visar ett enkelt textmeddelande (t.ex. "Inga resultat hittades")
     * @param {string} message - Meddelandetext
     */
    const renderMessage = (message) => {
      resultsContainer.innerHTML = `<p>${message}</p>`;
    };
  
    /**
     * Visar ett felmeddelande i rött, t.ex. vid nätverksfel
     * @param {string} errorText - Felmeddelande att visa (valfritt)
     */
    const renderError = (errorText = 'Något gick fel. Försök igen senare.') => {
      resultsContainer.innerHTML = `
        <div class="error">
          <p style="color: red;"> ${errorText}</p>
        </div>
      `;
    };
  
    return {
      clear,
      renderHTML,
      renderMessage,
      renderError,
    };
  })();
  
  export default UIManager;
  