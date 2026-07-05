// noteNode.ts

import { makeFieldNode } from "./makeFieldNode";

export const NoteNode = makeFieldNode({
  title: "Note",
  fields: [
    {
      name: "text",
      label: "Text:",
      type: "textarea",
      default: "",
    },
  ],
});
