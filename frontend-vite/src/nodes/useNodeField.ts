// useNodeField.ts
// Store-backed field state. Returns [value, onChange] so a node reads/writes a single
// field in node.data via the store's updateNodeField action. The default is seeded into
// the store on mount so untouched fields are still serializable (e.g. for a future Submit).

import { useEffect } from "react";
import type { ChangeEvent } from "react";
import { useStore } from "../store";

type FieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export const useNodeField = (
  nodeId: string,
  fieldName: string,
  initialValue?: string,
): [string, (e: FieldChangeEvent) => void] => {
  // Primitive selector -> default Object.is equality, so dragging nodes (which replaces
  // the nodes array) does not re-render this field; only a change to this value does.
  const value = useStore(
    (s) => s.nodes.find((n) => n.id === nodeId)?.data?.[fieldName],
  ) as string | undefined;
  const updateNodeField = useStore((s) => s.updateNodeField);

  useEffect(() => {
    if (value === undefined && initialValue !== undefined) {
      updateNodeField(nodeId, fieldName, initialValue);
    }
    // Seed once on mount only; idempotent under StrictMode's double-invoke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: FieldChangeEvent) =>
    updateNodeField(nodeId, fieldName, e.target.value);

  return [value ?? initialValue ?? "", onChange];
};
