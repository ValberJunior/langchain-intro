import { AIMessage } from "langchain";
import { type GraphState } from "../graph.ts";

export function fallbackNode(state: GraphState): GraphState {
  const message =
    "Unknown command. Please include 'uppercase' or 'lowercase' in your message.";
  const fallbackMessage = new AIMessage(message).content.toString();

  return {
    ...state,
    output: fallbackMessage,
    messages: [...state.messages],
  };
}
