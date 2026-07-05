// types.ts
// Shared types for the declarative node system (BaseNode + makeFieldNode + fields).

import type { CSSProperties } from "react";
import type { HandleType, Position } from "@xyflow/react";

export interface HandleConfig {
  type: HandleType;
  position: Position;
  id: string;
  style?: CSSProperties;
  // Optional text rendered next to the handle (e.g. a Text node's variable name).
  label?: string;
}

export type FieldType = "text" | "textarea" | "select";

export type SelectOption = string | { value: string; label: string };

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: SelectOption[];
  // `default` may be a value or a function of the node id.
  default?: string | ((id: string) => string);
}

export interface NodeConfig {
  title: string;
  fields?: FieldConfig[];
  handles?: HandleConfig[];
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
}
