const selectors = {
  email: '[data-testid="email"]',
  senha: '[data-testid="senha"]',
  entrar: '[data-testid="entrar"]',
  cadastrar: '[data-testid="cadastrar"]',
};

const messages = {
  loginError: 'Email e/ou senha inválidos',
};

class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  fillEmail(email) {
    // clear and type as separate commands, not chained (Cypress lint rule)
    cy.get(selectors.email).clear();
    cy.get(selectors.email).type(email);
    return this;
  }

  fillPassword(password) {
    cy.get(selectors.senha).clear();
    cy.get(selectors.senha).type(password);
    return this;
  }

  submit() {
    cy.get(selectors.entrar).click();
    return this;
  }

  goToRegister() {
    cy.get(selectors.cadastrar).click();
    return this;
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }

  getLoginError() {
    return cy.contains(messages.loginError);
  }
}

export default new LoginPage();
