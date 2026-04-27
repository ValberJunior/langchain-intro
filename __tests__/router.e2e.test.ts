import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.ts";

/**
 * Se não houver uma variável de ambiente LANGSMITH_API_KEY definida
 * o processo será encerrado com um erro, garantindo que a chave de API seja fornecida antes de iniciar o servidor.
 */
console.assert(
  process.env.LANGSMITH_API_KEY,
  "LANGSMITH_API_KEY is not set in the environment variables",
);

test.todo("Command lower transforms message into UPPERCASE", async () => {
  const app = createServer();
  const message = "please transform this message to uppercase";
  const expectedResponse = message.toUpperCase();
  /**
   * O inject é usado para fazer testes de integração
   */
  const response = await app.inject({
    method: "POST",
    url: "/chat",
    body: {
      question: message,
    },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.body, expectedResponse);
});

test.todo("Command upper transforms message into LOWERCASE", async () => {
  const app = createServer();
  const message = "plese transform this message to lowercase";
  const expectedResponse = message.toLowerCase();
  /**
   * O inject é usado para fazer testes de integração
   */
  const response = await app.inject({
    method: "POST",
    url: "/chat",
    body: {
      question: message,
    },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.body, expectedResponse);
});

test.todo("Command upper transforms message into UNKNOWN", async () => {
  const app = createServer();
  const message = "HEY THERE!";
  const expectedResponse =
    "Unknown command. Please include 'uppercase' or 'lowercase' in your message.";
  /**
   * O inject é usado para fazer testes de integração
   */
  const response = await app.inject({
    method: "POST",
    url: "/chat",
    body: {
      question: message,
    },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.body, expectedResponse);
});
