// transformNode.ts

import { Position } from "@xyflow/react";
import { makeFieldNode } from "./makeFieldNode";

export const TransformNode = makeFieldNode({
  title: "Transform",
  fields: [
    {
      name: "operation",
      label: "Operation:",
      type: "select",
      default: "Uppercase",
      options: ["Uppercase", "Lowercase", "Trim", "Parse JSON", "Stringify"],
    },
  ],
  handles: [
    { type: "target", position: Position.Left, id: "input" },
    { type: "source", position: Position.Right, id: "output" },
  ],
});
