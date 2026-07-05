// parseVariables.ts
// Extracts template variables from Text-node content. A variable is a valid JavaScript
// identifier wrapped in double curly braces, e.g. `{{ input }}`. Used to derive one input
// Handle per distinct variable.

// Matches `{{ <identifier> }}` with optional surrounding whitespace. The identifier must be a
// valid JS variable name: starts with a letter, `_`, or `$`, then letters/digits/`_`/`$`.
// So `{{ input }}` and `{{input}}` match; `{{ 1abc }}`, `{{ a.b }}`, `{{ a b }}` do not.
const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

// Returns the distinct variable names in first-appearance order.
export const extractVariables = (text: string): string[] => {
  const names: string[] = [];
  const seen = new Set<string>();
  for (const match of text.matchAll(VARIABLE_PATTERN)) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }
  return names;
};
