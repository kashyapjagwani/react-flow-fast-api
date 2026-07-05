// api.ts
// Thin client for the FastAPI backend.

import type { Node, Edge } from "@xyflow/react";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export interface ParseResult {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
}

/**
 * POST the pipeline's nodes and edges to /pipelines/parse and return the
 * backend's summary (node count, edge count, and whether it forms a DAG).
 */
export async function parsePipeline(
  nodes: Node[],
  edges: Edge[],
): Promise<ParseResult> {
  const response = await fetch(`${BASE_URL}/pipelines/parse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodes, edges }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as ParseResult;
}
