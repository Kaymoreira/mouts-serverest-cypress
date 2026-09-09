// Generates a unique user per test run so re-running the suite never hits
// "esse email já está sendo usado" from a previous execution.
export function buildRandomUser(overrides = {}) {
  const unique = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  return {
    nome: 'Kayque Teste Cypress',
    email: `kayque.qa.${unique}@teste.com`,
    password: 'senha123',
    ...overrides,
  };
}
