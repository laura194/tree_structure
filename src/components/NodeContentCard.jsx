import React from "react";
import ReactMarkdown from "react-markdown";
import {
  DocumentTextIcon,
  ListBulletIcon,
  CodeBracketIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

function NodeContentCard({ node }) {
  const getIcon = () => {
    switch (node.category) {
      case "text":
        return <DocumentTextIcon className="size-8 text-gray-500" />;
      case "list":
        return <ListBulletIcon className="size-8 text-gray-500" />;
      case "code":
        return <CodeBracketIcon className="size-8 text-gray-500" />;
      case "image":
        return <PhotoIcon className="size-8 text-gray-500" />;
      default:
        return <DocumentTextIcon className="size-8 text-gray-500" />;
    }
  };

  return (
    <div className="relative p-4 border shadow-lg rounded-lg">
      {/* Icon oben rechts */}
      <div className="absolute top-3 right-3 ">{getIcon()}</div>
      <h2 className="text-lg font-bold mb-4">{node.name}</h2>
      {/* Markdown ohne className, stattdessen über `components` gestylt */}
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mt-2">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mt-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mt-2">{children}</ol>
          ),
          li: ({ children }) => <li className="mt-1">{children}</li>,
        }}
      >
        {node.content}
      </ReactMarkdown>
    </div>
  );
}

export default NodeContentCard;
