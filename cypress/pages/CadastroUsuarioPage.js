class CadastroUsuarioPage {
  visit() {
    cy.visit('/cadastrarusuarios');
    return this;
  }

  fillName(nome) {
    cy.get('[data-testid="nome"]').clear().type(nome);
    return this;
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').clear().type(password);
    return this;
  }

  submit() {
    cy.get('[data-testid="cadastrar"]').click();
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
    return cy.contains('Cadastro realizado com sucesso');
  }
}

export default new CadastroUsuarioPage();
