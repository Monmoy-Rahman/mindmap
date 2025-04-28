import React from 'react';

function NodeCard({ node }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p>{node.text}</p>
      {/* TODO: Add node interaction logic (drag, connect, edit, delete) */}
    </div>
  );
}

export default NodeCard;
