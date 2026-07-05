// toolbar.tsx

import { DraggableNode } from "./draggableNode";
import { paletteItems } from "./nodes/registry";

export const PipelineToolbar = () => {
  return (
    <div className="border-b border-border bg-surface px-6 py-4">
      <p className="mb-3 text-left text-xs font-semibold uppercase tracking-wider text-text">
        Nodes
      </p>
      <div className="flex flex-wrap gap-3">
        {paletteItems.map(({ type, label }) => (
          <DraggableNode key={type} type={type} label={label} />
        ))}
      </div>
    </div>
  );
};
