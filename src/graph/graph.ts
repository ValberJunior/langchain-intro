import { END, MessagesZodMeta, START, StateGraph } from "@langchain/langgraph";
import { withLangGraph } from "@langchain/langgraph/zod";
import { BaseMessage } from "langchain";
import { z } from "zod/v3";
import { identifyIntentNode } from "./nodes/identifyIntentNode.ts";
import { chatResponseNode } from "./nodes/chatResponseNode.ts";
import { upperCaseNode } from "./nodes/upperCaseNode.ts";
import { lowerCaseNode } from "./nodes/lowerCaseNode.ts";
import { fallbackNode } from "./nodes/fallbackNode.ts";

/**
 * Estrutura de dados para representar um grafo de nós do LangChain,
 *  onde cada nó é identificado por um ID único e pode ter conexões (arestas)
 * para outros nós.
 *  O grafo é representado como um objeto onde as chaves são os IDs dos nós
 * e os valores são objetos que contêm o tipo do nó e uma lista de IDs dos nós aos
 * quais ele está conectado.
 */

const graphState = z.object({
  messages: withLangGraph(z.custom<BaseMessage[]>(), MessagesZodMeta),
  output: z.string(),
  command: z.enum(["uppercase", "lowercase", "unknown"]),
});

export type GraphState = z.infer<typeof graphState>;

export function buildGraph() {
  const workflow = new StateGraph({
    stateSchema: graphState,
  })
    /** Defino os nodes */
    .addNode("identityIntent", identifyIntentNode)
    .addNode("chatResponse", chatResponseNode)
    .addNode("uppercase", upperCaseNode)
    .addNode("lowercase", lowerCaseNode)
    .addNode("fallback", fallbackNode)
    /** Defino as conexões entre os nodes */
    .addEdge(START, "identityIntent")
    .addConditionalEdges(
      "identityIntent",
      (state: GraphState) => {
        switch (state.command) {
          case "uppercase":
            return "uppercase";
          case "lowercase":
            return "lowercase";
          default:
            return "fallback";
        }
      },
      {
        uppercase: "uppercase",
        lowercase: "lowercase",
        fallback: "fallback",
      },
    )
    .addEdge("uppercase", "chatResponse")
    .addEdge("lowercase", "chatResponse")
    .addEdge("fallback", "chatResponse")
    .addEdge("chatResponse", END);

  return workflow.compile();
}
