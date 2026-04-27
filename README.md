# langchain-intro

Projeto introdutório de LangGraph com Node.js. Implementa um agente de roteamento que recebe uma mensagem via API HTTP, identifica a intenção do usuário e aplica a transformação correspondente (maiúsculas, minúsculas ou fallback).

## Visão geral do grafo

```
START → identifyIntent → [uppercase | lowercase | fallback] → chatResponse → END
```

- **identifyIntent** — detecta se a mensagem contém a palavra `uppercase` ou `lowercase`
- **upperCaseNode** — converte o texto para maiúsculas
- **lowerCaseNode** — converte o texto para minúsculas
- **fallbackNode** — retorna mensagem de erro caso nenhum comando seja identificado
- **chatResponseNode** — monta a resposta final

## Tecnologias

- [Node.js](https://nodejs.org) (ESM + TypeScript nativo)
- [LangChain](https://js.langchain.com) + [LangGraph](https://langchain-ai.github.io/langgraphjs)
- [Fastify](https://fastify.dev)
- [Zod](https://zod.dev)
- [LangSmith](https://smith.langchain.com) para rastreamento

## Pré-requisitos

- Node.js >= 20
- Conta no [LangSmith](https://smith.langchain.com) para obter a `LANGSMITH_API_KEY`

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp .env.example .env
```

| Variável               | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| `LANGSMITH_API_KEY`    | Chave de API do LangSmith (obrigatória)   |
| `LANGCHAIN_PROJECT`    | Nome do projeto no LangSmith              |
| `LANGCHAIN_TRACING_V2` | Habilitar rastreamento (`true` / `false`) |

## Uso

### Servidor de desenvolvimento

```bash
npm run dev
```

O servidor sobe em `http://localhost:3000`.

### Endpoint

```
POST /chat
Content-Type: application/json

{
  "question": "please transform this message to uppercase"
}
```

**Exemplos de resposta:**

| Mensagem enviada                       | Resposta                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| `"please transform this to uppercase"` | `"PLEASE TRANSFORM THIS TO UPPERCASE"`                                          |
| `"please transform this to lowercase"` | `"please transform this to lowercase"`                                          |
| `"HEY THERE!"`                         | `"Unknown command. Please include 'uppercase' or 'lowercase' in your message."` |

## Testes

```bash
# Execução única
npm test

# Modo watch (com debugger)
npm run test:dev
```

Os testes usam o runner nativo do Node.js (`node:test`).

## LangGraph Server

Para subir o servidor do LangGraph Studio localmente:

```bash
npm run langgraph:server
```

O grafo exportado está em [src/graph/factory.ts](src/graph/factory.ts) e configurado em [langgraph.json](langgraph.json).

## Estrutura do projeto

```
src/
├── graph/
│   ├── graph.ts              # Definição do StateGraph e arestas
│   ├── factory.ts            # Exportação do grafo para o LangGraph Server
│   └── nodes/
│       ├── identifyIntentNode.ts
│       ├── upperCaseNode.ts
│       ├── lowerCaseNode.ts
│       ├── fallbackNode.ts
│       └── chatResponseNode.ts
├── server.ts                 # Servidor Fastify com rota POST /chat
└── index.ts                  # Entrypoint da aplicação
__tests__/
└── router.e2e.test.ts        # Testes end-to-end da API
```
