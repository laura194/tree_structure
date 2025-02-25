import { useState, useEffect } from "react";
import "./App.css";
import FilesystemItem from "./components/FilesystemItem.jsx";

function App() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetch("/nodes.json")
      .then((response) => response.json())
      .then((data) => setNodes(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div className="p-8 max-w-sm mx-auto">
      <ul>
        <li className="my-1.5">
          <ul className="pl-6">
            {nodes.map((node) => (
              <FilesystemItem node={node} key={node.id} />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
