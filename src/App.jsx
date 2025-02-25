import { useState } from "react";

import "./App.css";
import FilesystemItem from "./components/FilesystemItem.jsx";

function App() {
  let nodes = [
    {
      name: "Home",
      nodes: [
        {
          name: "Movies",
          nodes: [
            {
              name: "Action",
              nodes: [
                {
                  name: "2000s",
                  nodes: [
                    { name: "Lego-Movie.mp4" },
                    { name: "Lego-Movie2.mp4" },
                  ],
                },
                { name: "2010s", nodes: [] },
              ],
            },
            { name: "Comedy", nodes: [{ name: "2000s", nodes: [] }] },
            {
              name: "Music",
              nodes: [
                { name: "Rock", nodes: [] },
                { name: "Metal", nodes: [] },
              ],
            },
            { name: "Pictures", nodes: [] },
            { name: "Documents", nodes: [] },
            { name: "password.txt" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="p-8 max-w-sm mx-auto">
        <ul>
          <li className="my-1.5">
            <ul className="pl-6">
              {nodes.map((node) => (
                <FilesystemItem node={node} key={node.name} />
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
