import { Toaster } from "react-hot-toast";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { ThemeToggle } from "./theme/ThemeToggle";

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-bg text-text">
      <Toaster position="top-center" />
      <ThemeToggle />

      <header className="flex items-center gap-3 border-b border-border px-6 py-4">
        {/* <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white shadow-sm">
          ⌘
        </span> */}
        <div className="flex flex-col text-left leading-tight">
          <h1 className="text-lg font-semibold text-text-h">
            No Code AI Pipeline Builder
          </h1>
          <p className="text-xs text-text">
            Drag nodes onto the canvas and connect them
          </p>
        </div>
      </header>

      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
