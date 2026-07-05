// makeFieldNode.tsx
// Declarative helper for the common "title + labeled fields + handles" node. Returns a
// React Flow node component from a plain config. Irregular nodes (e.g. the LLM node)
// should compose BaseNode directly instead of using this helper.

import type { NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";
import { LabeledTextInput, LabeledSelect, LabeledTextArea } from "./fields";
import { useNodeField } from "./useNodeField";
import type { FieldConfig, NodeConfig } from "./types";

const resolveDefault = (field: FieldConfig, id: string): string | undefined =>
  typeof field.default === "function" ? field.default(id) : field.default;

// Each field is its own component so useNodeField is called at a stable top level
// (one hook per fixed field), never inside a loop body.
const FieldControl = ({ id, field }: { id: string; field: FieldConfig }) => {
  const [value, onChange] = useNodeField(
    id,
    field.name,
    resolveDefault(field, id),
  );

  if (field.type === "select") {
    return (
      <LabeledSelect
        label={field.label}
        value={value}
        onChange={onChange}
        options={field.options}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <LabeledTextArea label={field.label} value={value} onChange={onChange} />
    );
  }
  return (
    <LabeledTextInput label={field.label} value={value} onChange={onChange} />
  );
};

export const makeFieldNode = ({
  title,
  fields = [],
  handles = [],
  style,
  headerStyle,
  bodyStyle,
}: NodeConfig) => {
  const FieldNode = ({ id, selected }: NodeProps) => {
    const resolvedHandles = handles.map((h) => ({ ...h, id: `${id}-${h.id}` }));
    return (
      <BaseNode
        title={title}
        handles={resolvedHandles}
        style={style}
        headerStyle={headerStyle}
        bodyStyle={bodyStyle}
        selected={selected}
      >
        {fields.map((field) => (
          <FieldControl key={field.name} id={id} field={field} />
        ))}
      </BaseNode>
    );
  };
  FieldNode.displayName = `${title}Node`;
  return FieldNode;
};
