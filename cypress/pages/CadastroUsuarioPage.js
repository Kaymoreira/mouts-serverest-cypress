const selectors = {
  nome: '[data-testid="nome"]',
  email: '[data-testid="email"]',
  password: '[data-testid="password"]',
  cadastrar: '[data-testid="cadastrar"]',
};

const messages = {
  success: 'Cadastro realizado com sucesso',
};

class CadastroUsuarioPage {
  visit() {
    cy.visit('/cadastrarusuarios');
    return this;
  }

  fillName(nome) {
    cy.get(selectors.nome).clear();
    cy.get(selectors.nome).type(nome);
    return this;
  }

  fillEmail(email) {
    cy.get(selectors.email).clear();
    cy.get(selectors.email).type(email);
    return this;
  }

  fillPassword(password) {
    cy.get(selectors.password).clear();
    cy.get(selectors.password).type(password);
    return this;
  }

  submit() {
    cy.get(selectors.cadastrar).click();
    return this;
  }

  register({ nome, email, password }) {
    this.fillName(nome);
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }

  getSuccessMessage() {
    return cy.contains(messages.success);
  }
}

export default new CadastroUsuarioPage();
