import { ChevronRightIcon, FolderIcon } from "@heroicons/react/24/solid";
import NodeContent from "./NodeContent";
import { useState, useEffect } from "react";

function FilesystemItem({ node, onNodeClick }) {
  if (!node) return null;

  const storageKey = `isOpen-${node.id}`;
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem(storageKey);
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOpen));
  }, [isOpen, storageKey]);

  return (
    <li className="my-1.5">
      <span className="flex items-center gap-1.5">
        {node.nodes && node.nodes.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <ChevronRightIcon
              className={`size-4 text-gray-500 ${isOpen ? "rotate-90" : ""}`}
            />
          </button>
        )}
        {node.nodes ? (
          <>
            <FolderIcon className="size-6 text-gray-700" />
            {node.name}
          </>
        ) : (
          <NodeContent node={node} onClick={onNodeClick} />
        )}
      </span>
      {isOpen && node.nodes && (
        <ul className="pl-6">
          {node.nodes.map((childNode) => (
            <FilesystemItem
              node={childNode}
              key={childNode.id}
              onNodeClick={onNodeClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default FilesystemItem;
