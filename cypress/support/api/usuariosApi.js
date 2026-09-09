import { API_URL } from '../config';

// API Object: keeps the ServeRest user endpoints in one place.
export const usuariosApi = {
  login(body) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body,
      failOnStatusCode: false,
    });
  },

  create(body) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body,
      failOnStatusCode: false,
    });
  },

  remove(id) {
    return cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios/${id}`,
      failOnStatusCode: false,
    });
  },
};
