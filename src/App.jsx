import { useState, useEffect } from "react";
import "./App.css";
import FilesystemItem from "./components/FilesystemItem.jsx";
import NodeContentCard from "./components/NodeContentCard.jsx";
import { Bars3Icon } from "@heroicons/react/24/solid";

function App() {
  const [nodes, setNodes] = useState([]);
  const [nodeContents, setNodeContents] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [menuOpen, setMenuOpen] = useState([]);

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
    <div className="flex h-screen relative">
      {/* Menü-Button oben links */}
      <button
        className="absolute top-1 left-1 bg-gray-600 hover:bg-gray-500 p-2 rounded"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Bars3Icon className="h-5 w-5 text-white" />
      </button>

      {/* Menü (einklappbar) */}
      <div
        className={`${
          menuOpen ? "w-1/4" : "w-12"
        } transition-all duration-300 overflow-hidden bg-gray-200 text-black p-4 `}
      >
        {menuOpen && (
          <ul>
            <li className="my-1.5">
              <ul className="pl-10">
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
        )}
      </div>

      {/* Content */}
      <div
        className={`${
          menuOpen ? "w-3/4" : "w-full"
        } transition-all duration-300 p-4 bg-gray-400`}
      >
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
