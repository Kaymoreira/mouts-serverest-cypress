class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-testid="senha"]').clear().type(password);
    return this;
  }

  submit() {
    cy.get('[data-testid="entrar"]').click();
    return this;
  }

  goToRegister() {
    cy.get('[data-testid="cadastrar"]').click();
    return this;
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }

  getLoginError() {
    return cy.contains('Email e/ou senha inválidos');
  }
}

export default new LoginPage();
