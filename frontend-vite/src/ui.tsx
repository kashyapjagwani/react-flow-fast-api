// ui.tsx
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import type { DragEvent } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  ConnectionLineType,
  type Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import { useStore } from "./store";
import type { StoreState } from "./store";
import { shallow } from "zustand/shallow";
import { nodeTypes } from "./nodes/registry";
import { useTheme } from "./theme/useTheme";

import "@xyflow/react/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state: StoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const { theme } = useTheme();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID: string, type: string) => {
    const nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) {
        return;
      }
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type: string | undefined = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        // const position = reactFlowInstance.project({
        //   x: event.clientX - reactFlowBounds.left,
        //   y: event.clientY - reactFlowBounds.top,
        // });

        const position = {
          x: Math.abs(event.clientX - reactFlowBounds.left),
          y: Math.abs(event.clientY - reactFlowBounds.top),
        };

        const nodeID = getNodeID(type);
        const newNode: Node = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [addNode, getNodeID, reactFlowInstance],
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} className="flex-1">
      <div
        className="w-full"
        style={{
          height: reactFlowWrapper.current?.scrollHeight ?? 400,
        }}
      >
        <ReactFlow
          colorMode={theme}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType={ConnectionLineType.Step}
        >
          <Background gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
