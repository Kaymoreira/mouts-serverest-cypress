import LoginPage from '../../pages/LoginPage';
import CadastroUsuarioPage from '../../pages/CadastroUsuarioPage';
import { buildRandomUser } from '../../support/userFactory';

// Credentials from a seeded ServeRest account, valid for the public demo API.
const VALID_USER = {
  email: 'fulano@qa.com',
  password: 'teste',
};

describe('Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('faz login com sucesso e chega na home administrativa', () => {
    LoginPage.login(VALID_USER.email, VALID_USER.password);

    cy.url().should('include', '/admin/home');
    cy.get('[data-testid="logout"]').should('be.visible');
  });

  it('mostra mensagem de erro ao tentar logar com credenciais inválidas', () => {
    LoginPage.login('naoexiste@qa.com', 'senhaErrada123');

    LoginPage.getLoginError().should('be.visible');
    cy.url().should('include', '/login');
  });
});

describe('Cadastro de usuário', () => {
  it('cadastra um novo usuário com sucesso', () => {
    const novoUsuario = buildRandomUser();

    CadastroUsuarioPage.visit();
    CadastroUsuarioPage.register(novoUsuario);

    CadastroUsuarioPage.getSuccessMessage().should('be.visible');
  });
});
