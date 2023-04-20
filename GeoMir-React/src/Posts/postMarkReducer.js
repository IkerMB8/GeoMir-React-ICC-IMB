/**

* La funcio reducer canvia segons els posts marks.
* @param {Array} initialState - L'initial state de les marks.
* @param {Object} action - Un objecte que conté l'accio type i payload.
* @param {string} action.type - El tipus d'accio.
* @param {Object} action.payload - El payload de l'accio.
* @param {string} action.payload.ruta - La ruta del mark.
* @returns {Array} Una nova array amb el state actual·litzat.
*/
export const postMarkReducer = (initialState, action) => {
    switch (action.type) {
      case "Add Mark":
        return [...initialState, action.payload];
  
      case "Del Mark":
        // Retornarà un nou array amb tots els elements menys el de l'id
        return initialState.filter((mark) => mark.ruta !== action.payload);

      default:
        return [...initialState];
    }
  };  