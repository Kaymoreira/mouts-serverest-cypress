import { API_URL } from '../config';

// API Object: the request-level counterpart of a Page Object.
// Centralizes every ServeRest endpoint so a route change touches one place,
// exactly like a Page centralizes DOM selectors.
export const usuariosApi = {
  login(body) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body,
      failOnStatusCode: false,
    });
  },

  criar(body) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body,
      failOnStatusCode: false,
    });
  },

  deletar(id) {
    return cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios/${id}`,
      failOnStatusCode: false,
    });
  },
};
