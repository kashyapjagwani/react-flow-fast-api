# Pipeline Builder

A visual pipeline builder: drag nodes onto a canvas, connect them, and submit the graph to a
backend that reports node/edge counts and whether the pipeline forms a valid DAG.

- **`frontend-vite/`** — the app. React 19 + TypeScript (strict) + Vite + [@xyflow/react](https://reactflow.dev) + Zustand + Tailwind v4.
- **`backend/`** — a FastAPI service exposing `POST /pipelines/parse` (validates the graph with a Kahn's-algorithm topological sort).

## Prerequisites

- **Node.js** 20+ and npm
- **Python** 3.9+ and pip

## Running locally

The app runs as two services. Start each in its own terminal.

### 1. Backend (port 8000)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Health check: `GET http://localhost:8000/` → `{"Ping":"Pong"}`.
Interactive API docs: http://localhost:8000/docs.

### 2. Frontend (port 5173)

```bash
cd frontend-vite
npm install
npm run dev
```

Open http://localhost:5173. Drag nodes from the toolbar onto the canvas, connect them, then
click **Submit** to send the pipeline to the backend.

## Configuration

The frontend targets the backend via `VITE_API_BASE_URL`, defaulting to `http://localhost:8000`.
To point at a different host, set it before `npm run dev` / `npm run build`, e.g.:

```bash
VITE_API_BASE_URL=http://localhost:9000 npm run dev
```

## Frontend scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server (5173)         |
| `npm run build`   | Type-check (`tsc -b`) + production build |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint                               |

## Backend API

`POST /pipelines/parse`

```jsonc
// request
{ "nodes": [{ "id": "n1" }, ...], "edges": [{ "source": "n1", "target": "n2" }, ...] }
// response
{ "num_nodes": 2, "num_edges": 1, "is_dag": true }
```
