// textNode.tsx
// Irregular node: unlike the declarative field nodes, the Text node derives its input handles
// from its own content. Each valid `{{ variable }}` token in the text grows a labeled target
// handle on the left; the single source handle on the right is always present. It composes
// BaseNode directly (like the LLM node) because makeFieldNode only supports static handles.

import {
  Position,
  useUpdateNodeInternals,
  type NodeProps,
} from "@xyflow/react";
import { useEffect, useMemo } from "react";
import { BaseNode } from "./BaseNode";
import { LabeledTextArea } from "./fields";
import { extractVariables } from "./parseVariables";
import type { HandleConfig } from "./types";
import { useNodeField } from "./useNodeField";

const TEXT_DEFAULT = "{{input}}";

export const TextNode = ({ id, selected }: NodeProps) => {
  const [text, onChange] = useNodeField(id, "text", TEXT_DEFAULT);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractVariables(text), [text]);

  // One target handle per variable, plus the always-present output source. Ids are namespaced
  // with `${id}-` (matching makeFieldNode/LLMNode) and a `-var-` infix so a variable literally
  // named "output" can't collide with the output handle.
  const handles: HandleConfig[] = [
    ...variables.map((name) => ({
      type: "target" as const,
      position: Position.Left,
      id: `${id}-var-${name}`,
      label: name,
    })),
    { type: "source" as const, position: Position.Right, id: `${id}-output` },
  ];

  // React Flow caches handle geometry after mount, so it must be told to recompute whenever the
  // set of variable handles changes — otherwise edges anchor to stale positions.
  const variableKey = variables.join("|");
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variableKey, updateNodeInternals]);

  // Reserve a left gutter for the variable labels so they don't overlap the textarea.
  // const bodyStyle = variables.length > 0 ? { paddingLeft: "5.5rem" } : undefined;

  return (
    <BaseNode title="Text" handles={handles} selected={selected}>
      <LabeledTextArea label="Text:" value={text} onChange={onChange} />
    </BaseNode>
  );
};
