// apiRequestNode.ts

import { Position } from "@xyflow/react";
import { makeFieldNode } from "./makeFieldNode";

export const ApiRequestNode = makeFieldNode({
  title: "API Request",
  fields: [
    {
      name: "method",
      label: "Method:",
      type: "select",
      default: "GET",
      options: ["GET", "POST", "PUT", "DELETE"],
    },
    {
      name: "url",
      label: "URL:",
      type: "text",
      default: "",
    },
  ],
  handles: [{ type: "source", position: Position.Right, id: "response" }],
});
