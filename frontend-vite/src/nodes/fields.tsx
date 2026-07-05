// fields.tsx
// Reusable, presentational (dumb) controlled inputs shared across nodes. They pull
// their styling from nodeStyles so field appearance is centralized alongside the shell.

import { useLayoutEffect, useRef } from "react";
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
  // When true, the textarea grows in height to fit its content instead of scrolling.
  autoGrow?: boolean;
}

export const LabeledTextArea = ({
  label,
  value,
  onChange,
  autoGrow = false,
}: LabeledTextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-size the height to the content: reset to `auto` so the box can shrink,
  // then grow to fit scrollHeight. Runs before paint so there's no flicker, and
  // re-runs on every value change. A CSS min-height keeps the initial ~4-row look.
  useLayoutEffect(() => {
    if (!autoGrow) return;
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [autoGrow, value]);

  return (
    <label className={nodeStyles.label}>
      {label}
      <textarea
        ref={ref}
        value={value}
        rows={4}
        onChange={onChange}
        className={`nodrag nowheel ${nodeStyles.input} ${autoGrow ? "min-h-22 overflow-hidden" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onScroll={(e) => e.stopPropagation()}
      />
    </label>
  );
};

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
