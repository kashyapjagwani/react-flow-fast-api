// mergeNode.ts

import { Position } from "@xyflow/react";
import { makeFieldNode } from "./makeFieldNode";

export const MergeNode = makeFieldNode({
  title: "Merge",
  fields: [
    {
      name: "logicName",
      label: "Logic:",
      type: "textarea",
      default: (id: string) => id.replace("merge-", "merge_"),
    },
  ],
  handles: [
    { type: "target", position: Position.Left, id: "inputA" },
    { type: "target", position: Position.Left, id: "inputB" },
    { type: "source", position: Position.Right, id: "output" },
  ],
});
