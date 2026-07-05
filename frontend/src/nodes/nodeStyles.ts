// nodeStyles.ts
// Single source of truth for node styling. Every node renders through BaseNode and
// every field through fields.tsx, so editing this one object restyles all nodes.
// Values are Tailwind class strings that resolve against the theme tokens (index.css),
// so nodes automatically follow the active light/dark theme.

export const nodeStyles = {
  container:
    "w-[220px] overflow-hidden rounded-xl border border-border bg-surface text-left shadow-[var(--shadow)] transition-shadow duration-200 hover:shadow-lg",
  containerSelected: "border-accent ring-2 ring-accent-border",
  header:
    "flex items-center gap-2 border-b border-border bg-accent-bg px-3 py-2 text-sm font-semibold text-text-h",
  body: "flex flex-col gap-2.5 px-3 py-3",
  label: "flex flex-col gap-1 text-xs font-medium text-text",
  input:
    "rounded-md border border-border bg-bg px-2 py-1.5 text-sm text-text-h outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-border resize-none",
  select:
    "cursor-pointer rounded-md border border-border bg-bg px-2 py-1.5 text-sm text-text-h outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-border",
} satisfies Record<string, string>;
