// BaseNode.tsx
// The presentational shell every node renders through: shared container + header +
// body (children) + handles. Handles on the same side are auto-spaced vertically so
// individual nodes never hand-position them.

import type { CSSProperties, ReactNode } from "react";
import { Handle, Position } from "@xyflow/react";
import { nodeStyles } from "./nodeStyles";
import type { HandleConfig } from "./types";

// Evenly space N handles on one side: the i-th of N sits at (i+1)/(N+1) of the edge.
// A side with a single handle is left untouched, preserving React Flow's default
// 50% centering. Any per-handle `style` override wins over the computed position.
const spacedStyle = (
  position: Position,
  index: number,
  count: number,
  override: CSSProperties = {},
): CSSProperties => {
  if (count <= 1) return override;
  const pct = (100 * (index + 1)) / (count + 1);
  const isVertical = position === Position.Left || position === Position.Right;
  const axis = isVertical ? { top: `${pct}%` } : { left: `${pct}%` };
  return { ...axis, ...override };
};

export interface BaseNodeProps {
  title: string;
  handles?: HandleConfig[];
  children?: ReactNode;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  selected?: boolean;
}

export const BaseNode = ({
  title,
  handles = [],
  children,
  style,
  headerStyle,
  bodyStyle,
  selected,
}: BaseNodeProps) => {
  const countBySide: Record<string, number> = {};
  handles.forEach((h) => {
    countBySide[h.position] = (countBySide[h.position] || 0) + 1;
  });

  const seenBySide: Record<string, number> = {};

  return (
    <div
      className={`${nodeStyles.container} ${selected ? nodeStyles.containerSelected : ""}`}
      style={style}
    >
      <div className={nodeStyles.header} style={headerStyle}>
        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
        <span>{title}</span>
      </div>
      {children != null && (
        <div className={nodeStyles.body} style={bodyStyle}>
          {children}
        </div>
      )}
      {handles.map((h) => {
        const index = seenBySide[h.position] || 0;
        seenBySide[h.position] = index + 1;
        const count = countBySide[h.position];
        return (
          <Handle
            key={h.id}
            type={h.type}
            position={h.position}
            id={h.id}
            style={spacedStyle(h.position, index, count, h.style)}
          />
        );
      })}
    </div>
  );
};
