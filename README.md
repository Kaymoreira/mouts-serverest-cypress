# ServeRest, Automação de Testes com Cypress

[![Cypress Tests](https://github.com/Kaymoreira/mouts-serverest-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/Kaymoreira/mouts-serverest-cypress/actions/workflows/cypress.yml)

Suíte de testes automatizados para o [ServeRest](https://serverest.dev), cobrindo dois níveis: interface (E2E no front) e API (nível de request). O foco não foi só fazer os testes passarem, foi montar uma base que sobrevive a mudança e explica as próprias decisões.

- Frontend: https://front.serverest.dev
- Swagger da API: https://serverest.dev

## Stack

- **Cypress 16** como runner de E2E e de API.
- **Page Object Model** e **API Object** para separar o que testar de como localizar.
- **ESLint 10 + Prettier** para manter qualidade no próprio código de teste.
- **GitHub Actions** rodando lint e suíte a cada push.

## Como rodar

```bash
npm install
npm run cy:open   # modo interativo
npm test          # headless (mesmo comando do CI)
npm run lint      # análise estática
npm run format    # Prettier
```

Node na versão fixada em `.nvmrc` (22). Sem `.env`, porque a massa e as credenciais do ServeRest são públicas e há um único ambiente. O endpoint fica centralizado em `cypress/support/config.js`, pronto para receber uma variável de ambiente quando o alvo for um ambiente privado.

## Estrutura

```
cypress/
├── e2e/
│   ├── frontend/login.cy.js     # cenários de UI (login, login inválido, cadastro)
│   └── api/usuarios.cy.js       # cenários de request (login, cadastro, duplicidade)
├── pages/                       # Page Objects (seletores + ações da UI)
│   ├── LoginPage.js
│   └── CadastroUsuarioPage.js
├── support/
│   ├── api/usuariosApi.js       # API Object (endpoints centralizados)
│   ├── userFactory.js           # geração de massa única por execução
│   └── config.js                # endpoint da API
└── fixtures/users.json          # credenciais seedadas do ServeRest
```

## Decisões de design, e o porquê de cada uma

### Page Object Model com seletores separados

Cada página é uma classe. O teste chama `LoginPage.login(email, senha)` sem saber o seletor por baixo. Dentro do Page, os seletores ficam num objeto `selectors` no topo, separados dos métodos. Assim existe um inventário único do contrato de DOM da página, e o método cuida só do comportamento. Se a Mouts mudar um `data-testid`, a correção é uma linha, não uma caça por vários arquivos.

### API Object, o mesmo princípio no backend

`usuariosApi` centraliza cada endpoint do ServeRest. Se a rota `/usuarios` mudar, conserta num objeto só, exatamente como o Page centraliza seletor. Mostra que o padrão foi entendido como princípio, não decorado como receita.

### Seletores por `data-testid`, não por CSS ou texto de botão

`data-testid` é o contrato mais estável entre front e teste. Sobrevive a troca de estilo e de texto de botão, ao contrário de classe CSS ou seletor por posição. É a recomendação oficial do Cypress contra teste frágil.

### Asserção pelo que o usuário vê

Para mensagem de erro e de sucesso, a asserção usa o texto visível (`cy.contains`) em vez da classe CSS. Investigando o app real, a classe do alerta era genérica (`alert-secondary`, não o `alert-danger` do padrão Bootstrap), então travar num seletor de implementação seria frágil e menos fiel ao que importa: o que aparece na tela para o usuário.

### Massa de teste gerada dinamicamente

`buildRandomUser` gera um e-mail único por execução (`Date.now` mais aleatório). Sem isso, rodar a suíte duas vezes faria o segundo cadastro falhar por "e-mail já existe", quebrando o teste por dado sujo e não por bug real. É prevenção de causa raiz de flakiness.

### Caminho de falha coberto de propósito

No cenário de e-mail duplicado, o segundo request retorna 400 esperado. `failOnStatusCode: false` diz ao Cypress "esse erro é o comportamento sob teste, não trave, deixa eu validar". Testar o que acontece com entrada inválida vale tanto quanto testar o happy path.

### Limpeza de massa

Os testes de API guardam o `_id` do usuário criado e o removem no `afterEach`. O e-mail único evita colisão na entrada, o cleanup evita poluir o dataset compartilhado na saída. O teste entra limpo e sai limpo.

### Nome de teste por comportamento

`it('mostra mensagem de erro ao tentar logar com credenciais inválidas')` descreve o comportamento, não a implementação. Quem lê só o relatório do Cypress já entende o que foi validado, sem abrir o código.

### Lint como qualidade do próprio teste

O preset oficial `eslint-plugin-cypress` roda no CI e pega anti-padrões automaticamente, por exemplo espera fixa (`cy.wait` com tempo) e encadeamento de duas ações. Por isso os métodos de preenchimento re-consultam o elemento a cada comando em vez de encadear `.clear().type()`, seguindo a recomendação do preset e ganhando resiliência.

## Cobertura atual

| Nível | Cenário |
|-------|---------|
| UI | Login com sucesso leva à home administrativa |
| UI | Credenciais inválidas mostram mensagem de erro |
| UI | Cadastro de novo usuário com sucesso |
| API | Login válido retorna 200 e token Bearer |
| API | Cadastro válido retorna 201 com id |
| API | Cadastro com e-mail duplicado retorna 400 |
