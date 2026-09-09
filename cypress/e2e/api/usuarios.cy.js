import { usuariosApi } from '../../support/api/usuariosApi';
import { buildRandomUser } from '../../support/userFactory';
import users from '../../fixtures/users.json';

describe('API - Login', () => {
  it('autentica com credenciais válidas e retorna um token', () => {
    usuariosApi.login(users.valid).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Login realizado com sucesso');
      expect(response.body.authorization).to.match(/^Bearer /);
    });
  });
});

describe('API - Usuários', () => {
  // keep the created id so afterEach deletes it and keeps the shared base clean
  let createdUserId;

  afterEach(() => {
    if (createdUserId) {
      usuariosApi.remove(createdUserId);
      createdUserId = undefined;
    }
  });

  it('cadastra um novo usuário e retorna 201 com o id gerado', () => {
    const payload = buildRandomUser({ nome: 'Kayque Teste API', administrador: 'false' });

    usuariosApi.create(payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.be.a('string').and.not.be.empty;
      createdUserId = response.body._id;
    });
  });

  it('rejeita cadastro de usuário com email já existente', () => {
    const payload = buildRandomUser({ nome: 'Kayque Teste API', administrador: 'false' });

    usuariosApi.create(payload).then((firstResponse) => {
      expect(firstResponse.status).to.eq(201);
      createdUserId = firstResponse.body._id;

      // second create with the same email must return 400; failOnStatusCode
      // is false so Cypress lets us assert it instead of failing the test
      usuariosApi.create(payload).then((secondResponse) => {
        expect(secondResponse.status).to.eq(400);
        expect(secondResponse.body.message).to.eq('Este email já está sendo usado');
      });
    });
  });
});
