import React from "react";
import {
  DocumentTextIcon,
  ListBulletIcon,
  CodeBracketIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

function NodeContent({ node, onClick }) {
  const getIcon = () => {
    switch (node.category) {
      case "text":
        return <DocumentTextIcon className="size-6 text-gray-500" />;
      case "list":
        return <ListBulletIcon className="size-6 text-gray-500" />;
      case "code":
        return <CodeBracketIcon className="size-6 text-gray-500" />;
      case "image":
        return <PhotoIcon className="size-6 text-gray-500" />;
      default:
        return <DocumentTextIcon className="size-6 text-gray-500" />;
    }
  };

  return (
    <div
      className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-200 p-1 rounded"
      onClick={() => {
        if (onClick) {
          onClick(node.id);
        }
      }}
    >
      <span className="flex items-center gap-1.5">
        {getIcon()}
        {node.name}
      </span>
    </div>
  );
}

export default NodeContent;
