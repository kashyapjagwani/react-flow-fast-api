// inputNode.ts

import { Position } from "@xyflow/react";
import { makeFieldNode } from "./makeFieldNode";

export const InputNode = makeFieldNode({
  title: "Input",
  fields: [
    {
      name: "inputName",
      label: "Name:",
      type: "text",
      default: (id: string) => id.replace("customInput-", "input_"),
    },
    {
      name: "inputType",
      label: "Type:",
      type: "select",
      default: "Text",
      options: ["Text", "File"],
    },
  ],
  handles: [{ type: "source", position: Position.Right, id: "value" }],
});
