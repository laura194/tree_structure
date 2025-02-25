import { useState, useEffect } from "react";
import "./App.css";
import FilesystemItem from "./components/FilesystemItem.jsx";
import NodeContentCard from "./components/NodeContentCard.jsx";

function App() {
  const [nodes, setNodes] = useState([]);
  const [nodeContents, setNodeContents] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    fetch("/nodes.json")
      .then((response) => response.json())
      .then((data) => setNodes(data))
      .catch((error) => console.error("Error loading JSON:", error));

    fetch("/nodeContent.json")
      .then((response) => response.json())
      .then((data) => {
        setNodeContents(data);

        // Prüfen, ob eine gespeicherte Node existiert
        const savedNodeId = localStorage.getItem("selectedNodeId");
        if (savedNodeId) {
          const savedNode = data.find((item) => item.id === savedNodeId);
          if (savedNode) {
            setSelectedNode(savedNode);
          }
        }
      })
      .catch((error) =>
        console.error("Error loading node content JSON:", error)
      );
  }, []);

  const handleNodeClick = (nodeId) => {
    const content = nodeContents.find((item) => item.id === nodeId);
    setSelectedNode(content || null);

    // Speichern der ausgewählten Node im Local Storage
    localStorage.setItem("selectedNodeId", nodeId);
  };

  return (
    <div className="flex h-screen">
      {/* Linke Spalte */}
      <div className="w-1/3 p-4 border-r">
        <ul>
          <li className="my-1.5">
            <ul className="pl-6">
              {nodes.map((node) => (
                <FilesystemItem
                  node={node}
                  key={node.id}
                  onNodeClick={handleNodeClick}
                />
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {/* Rechte Spalte */}
      <div className="w-2/3 p-4">
        {selectedNode ? (
          <NodeContentCard node={selectedNode} />
        ) : (
          <p>Wähle ein Element aus.</p>
        )}
      </div>
    </div>
  );
}

export default App;
