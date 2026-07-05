// knowledgeBaseNode.ts

import { Position } from "@xyflow/react";
import { makeFieldNode } from "./makeFieldNode";

export const KnowledgeBaseNode = makeFieldNode({
  title: "Knowledge Base",
  fields: [
    {
      name: "source",
      label: "Source:",
      type: "select",
      default: "SharePoint",
      options: ["SharePoint", "Google Drive", "Salesforce", "Data Room"],
    },
  ],
  handles: [{ type: "source", position: Position.Right, id: "output" }],
});
