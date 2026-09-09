const apiUrl = 'https://serverest.dev';

// Seeded credentials from the public ServeRest demo dataset.
const VALID_LOGIN = {
  email: 'fulano@qa.com',
  password: 'teste',
};

function randomUserPayload(overrides = {}) {
  const unique = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  return {
    nome: 'Kayque Teste API',
    email: `kayque.api.${unique}@teste.com`,
    password: 'senha123',
    administrador: 'false',
    ...overrides,
  };
}

describe('API - Login', () => {
  it('autentica com credenciais válidas e retorna um token', () => {
    cy.request('POST', `${apiUrl}/login`, VALID_LOGIN).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Login realizado com sucesso');
      expect(response.body.authorization).to.match(/^Bearer /);
    });
  });
});

describe('API - Usuários', () => {
  it('cadastra um novo usuário e retorna 201 com o id gerado', () => {
    const payload = randomUserPayload();

    cy.request('POST', `${apiUrl}/usuarios`, payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.be.a('string').and.not.be.empty;
    });
  });

  it('rejeita cadastro de usuário com email já existente', () => {
    const payload = randomUserPayload();

    // Cria o usuário uma vez...
    cy.request('POST', `${apiUrl}/usuarios`, payload).then((firstResponse) => {
      expect(firstResponse.status).to.eq(201);

      // ...e tenta cadastrar de novo com o mesmo email, sem falhar o teste no 400.
      cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: payload,
        failOnStatusCode: false,
      }).then((secondResponse) => {
        expect(secondResponse.status).to.eq(400);
        expect(secondResponse.body.message).to.eq('Este email já está sendo usado');
      });
    });
  });
});
