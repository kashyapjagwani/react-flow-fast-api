// fields.tsx
// Reusable, presentational (dumb) controlled inputs shared across nodes. They pull
// their styling from nodeStyles so field appearance is centralized alongside the shell.

import type { ChangeEvent } from "react";
import { nodeStyles } from "./nodeStyles";
import type { SelectOption } from "./types";

type FieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

interface LabeledTextInputProps {
  label: string;
  value: string;
  onChange: (e: FieldChangeEvent) => void;
}

export const LabeledTextInput = ({
  label,
  value,
  onChange,
}: LabeledTextInputProps) => (
  <label className={nodeStyles.label}>
    {label}
    <input value={value} onChange={onChange} className={nodeStyles.input} />
  </label>
);

interface LabeledTextAreaProps {
  label: string;
  value: string;
  onChange: (e: FieldChangeEvent) => void;
}

export const LabeledTextArea = ({
  label,
  value,
  onChange,
}: LabeledTextAreaProps) => (
  <label className={nodeStyles.label}>
    {label}
    <textarea
      value={value}
      rows={4}
      onChange={onChange}
      className={`nodrag nowheel ${nodeStyles.input}`}
      onClick={(e) => e.stopPropagation()}
      onScroll={(e) => e.stopPropagation()}
    />
  </label>
);

interface LabeledSelectProps {
  label: string;
  value: string;
  onChange: (e: FieldChangeEvent) => void;
  options?: SelectOption[];
}

export const LabeledSelect = ({
  label,
  value,
  onChange,
  options = [],
}: LabeledSelectProps) => (
  <label className={nodeStyles.label}>
    {label}
    <select
      value={value}
      onChange={onChange}
      className={`nodrag ${nodeStyles.select}`}
    >
      {options.map((opt) => {
        const o = typeof opt === "string" ? { value: opt, label: opt } : opt;
        return (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        );
      })}
    </select>
  </label>
);
