import { type GraphState } from "../graph.ts";

export function identifyIntentNode(state: GraphState): GraphState {
  const inputMessage = state.messages.at(-1)?.text ?? "";
  const inputLower = inputMessage.toLowerCase();

  let command: GraphState["command"] = "unknown";

  if (inputLower.includes("upper")) {
    command = "uppercase";
  } else if (inputLower.includes("lower")) {
    command = "lowercase";
  }

  return {
    ...state,
    command,
    output: inputMessage,
  };
}
