/**
 * Onde exportamos o objeto de criação de nós do langchain
 */

import { buildGraph } from "./graph.ts";

export function graph() {
  return buildGraph();
}
