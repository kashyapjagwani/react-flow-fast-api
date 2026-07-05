// llmNode.tsx

import { Position, type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

// Irregular node: no fields, a custom body, and two same-side inputs. It composes
// BaseNode directly; the 33% / 66% spacing of the two left handles is derived by BaseNode.
export const LLMNode = ({ id, selected }: NodeProps) => (
  <BaseNode
    title="LLM"
    handles={[
      { type: "target", position: Position.Left, id: `${id}-system` },
      { type: "target", position: Position.Left, id: `${id}-prompt` },
      { type: "source", position: Position.Right, id: `${id}-response` },
    ]}
    selected={selected}
  >
    <span>This is a LLM.</span>
  </BaseNode>
);
