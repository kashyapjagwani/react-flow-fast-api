// draggableNode.tsx

import type { DragEvent } from "react";

interface DraggableNodeProps {
  type: string;
  label: string;
}

export const DraggableNode = ({ type, label }: DraggableNodeProps) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = "grabbing";
    event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} group flex h-[60px] min-w-[96px] cursor-grab select-none flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-bg px-4 text-text-h shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-border hover:bg-accent-bg hover:shadow-md active:scale-95 active:cursor-grabbing`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.currentTarget.style.cursor = "grab")}
      draggable
    >
      <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-200 group-hover:scale-125" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};
