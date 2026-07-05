// submit.tsx

import { useState } from "react";
import toast from "react-hot-toast";
import { parsePipeline } from "./api";
import { useStore } from "./store";

export const SubmitButton = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Read the latest graph directly from the store (non-reactive).
    const { nodes, edges } = useStore.getState();
    setSubmitting(true);
    try {
      await toast.promise(parsePipeline(nodes, edges), {
        loading: "Parsing pipeline…",
        success: (result) => (
          <div className="flex flex-col leading-tight">
            <span className="font-semibold">Pipeline parsed</span>
            <span>
              {result.num_nodes} {result.num_nodes === 1 ? "node" : "nodes"}
              {" · "}
              {result.num_edges} {result.num_edges === 1 ? "edge" : "edges"}
            </span>
            <span>{result.is_dag ? "✓ Valid DAG" : "✗ Not a DAG"}</span>
          </div>
        ),
        error: "Could not reach the server. Is the backend running?",
      });
    } catch {
      // toast.promise already surfaced the error to the user.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center border-t border-border bg-surface px-6 py-5">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="rounded-lg bg-accent px-7 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-border focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:brightness-100 disabled:hover:shadow-md"
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
    </div>
  );
};
