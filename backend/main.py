from collections import deque

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeModel(BaseModel):
    id: str


class EdgeModel(BaseModel):
    source: str
    target: str


class PipelineData(BaseModel):
    nodes: list[NodeModel]
    edges: list[EdgeModel]


def is_dag(nodes: list[NodeModel], edges: list[EdgeModel]) -> bool:
    """Return True if nodes + edges form a directed acyclic graph.

    Uses Kahn's algorithm (topological sort): repeatedly remove nodes with no
    incoming edges. If every node can be removed, there is no cycle. Self-loops
    and cycles leave nodes with an in-degree that never reaches zero.
    """
    node_ids = {node.id for node in nodes}

    in_degree = {node_id: 0 for node_id in node_ids}
    adjacency: dict[str, list[str]] = {node_id: [] for node_id in node_ids}

    for edge in edges:
        # Ignore edges that reference nodes not present in the pipeline.
        if edge.source in node_ids and edge.target in node_ids:
            adjacency[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    queue = deque(node_id for node_id in node_ids if in_degree[node_id] == 0)
    processed = 0

    while queue:
        current = queue.popleft()
        processed += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return processed == len(node_ids)


@app.get('/')
def read_root():
    return {'status': 'server is running and says Ping-Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag(pipeline.nodes, pipeline.edges),
    }
