// Unique email on every run, so running the suite twice does not fail with
// "email already used". Overrides let each spec add the fields it needs.
export function buildRandomUser(overrides = {}) {
  const unique = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  return {
    nome: 'Kayque Teste Cypress',
    email: `kayque.qa.${unique}@teste.com`,
    password: 'senha123',
    ...overrides,
  };
}
