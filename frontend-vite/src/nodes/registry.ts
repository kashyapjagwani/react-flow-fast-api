// registry.ts
// Single source of truth mapping node type -> component + palette label. `nodeTypes`
// (for React Flow) and `paletteItems` (for the toolbar) are both derived from it, so
// adding a node type is one entry here plus its node file — no edits to ui/toolbar.

import type { ComponentType } from "react";
import type { NodeProps, NodeTypes } from "@xyflow/react";
import { InputNode } from "./inputNode";
import { LLMNode } from "./llmNode";
import { OutputNode } from "./outputNode";
import { TextNode } from "./textNode";
import { MergeNode } from "./mergeNode";
import { ApiRequestNode } from "./apiRequestNode";
import { TransformNode } from "./transformNode";
import { KnowledgeBaseNode } from "./knowledgeBaseNode";
import { NoteNode } from "./noteNode";

interface NodeRegistryEntry {
  component: ComponentType<NodeProps>;
  label: string;
}

// Insertion order == palette order.
export const nodeRegistry: Record<string, NodeRegistryEntry> = {
  customInput: { component: InputNode, label: "Input" },
  llm: { component: LLMNode, label: "LLM" },
  customOutput: { component: OutputNode, label: "Output" },
  text: { component: TextNode, label: "Text" },
  // custom nodes
  merge: { component: MergeNode, label: "Merge" },
  apiRequest: { component: ApiRequestNode, label: "API Request" },
  transform: { component: TransformNode, label: "Transform" },
  knowledgeBase: { component: KnowledgeBaseNode, label: "Knowledge Base" },
  note: { component: NoteNode, label: "Note" },
};

// Built once at module scope -> referentially stable, which React Flow requires
// (a fresh nodeTypes object each render remounts every node and logs a warning).
export const nodeTypes: NodeTypes = Object.fromEntries(
  Object.entries(nodeRegistry).map(([type, { component }]) => [
    type,
    component,
  ]),
);

export const paletteItems: { type: string; label: string }[] = Object.entries(
  nodeRegistry,
).map(([type, { label }]) => ({ type, label }));
