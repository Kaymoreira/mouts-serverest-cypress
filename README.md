# Desafio de Automação com Cypress — ServeRest

Automação de 3 cenários E2E de frontend e 3 cenários de API para a aplicação [ServeRest](https://serverest.dev/),
usando Cypress e JavaScript.

- Frontend: https://front.serverest.dev/
- Swagger API: https://serverest.dev/

## Stack

- Cypress 16
- JavaScript
- Page Object Model (`cypress/pages`)

## Estrutura

```
cypress/
  e2e/
    frontend/
      login.cy.js        # 3 cenários E2E (login, login inválido, cadastro de usuário)
    api/
      usuarios.cy.js      # 3 cenários de API (login, cadastro, email duplicado)
  pages/
    LoginPage.js
    CadastroUsuarioPage.js
  support/
    e2e.js
    userFactory.js         # gera usuário único por execução, evita colisão de email
```

## Cenários cobertos

**Frontend (E2E)**
1. Login com sucesso, redireciona para `/admin/home`
2. Login com credenciais inválidas, exibe mensagem de erro
3. Cadastro de novo usuário com sucesso

**API**
1. `POST /login` com credenciais válidas, retorna token
2. `POST /usuarios` cria usuário e retorna 201 com `_id`
3. `POST /usuarios` com email já existente retorna 400

## Como rodar

```bash
npm install
npx cypress open   # modo interativo
npx cypress run    # modo headless, roda tudo
```

## Decisões técnicas

- Page Object Model separa seletor de lógica de teste, facilita manutenção se o frontend mudar.
- Dado de teste (email de usuário) é gerado dinamicamente (`userFactory.js`) pra suíte poder rodar
  repetidamente sem colidir com cadastro anterior.
- Asserções de mensagem usam o texto visível ao usuário (`cy.contains`) em vez de classe CSS, o que deixa o
  teste mais estável a mudanças de estilo e mais próximo da experiência real de quem usa a aplicação.
- Teste de e-mail duplicado usa `failOnStatusCode: false` no segundo request, pra validar o cenário de erro
  (400) sem que o Cypress trate o próprio status HTTP como falha do teste.
