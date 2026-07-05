// outputNode.ts

import { Position } from "@xyflow/react";
import { makeFieldNode } from "./makeFieldNode";

export const OutputNode = makeFieldNode({
  title: "Output",
  fields: [
    {
      name: "outputName",
      label: "Name:",
      type: "text",
      default: (id: string) => id.replace("customOutput-", "output_"),
    },
    // value === label (previously value="File" was shown as "Image").
    {
      name: "outputType",
      label: "Type:",
      type: "select",
      default: "Text",
      options: ["Text", "Image"],
    },
  ],
  handles: [{ type: "target", position: Position.Left, id: "value" }],
});
