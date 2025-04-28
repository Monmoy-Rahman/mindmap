import React, { createContext, useReducer } from 'react';

const MindMapContext = createContext();

const mindMapReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MINDMAP':
      return { mindMap: action.payload };
    case 'ADD_NODE':
      return {
        ...state,
        mindMap: {
          ...state.mindMap,
          nodes: [...state.mindMap.nodes, action.payload],
        },
      };
    case 'UPDATE_NODE':
      return {
        ...state,
        mindMap: {
          ...state.mindMap,
          nodes: state.mindMap.nodes.map((node) =>
            node._id === action.payload._id ? action.payload : node
          ),
        },
      };
    case 'DELETE_NODE':
      return {
        ...state,
        mindMap: {
          ...state.mindMap,
          nodes: state.mindMap.nodes.filter(
            (node) => node._id !== action.payload
          ),
        },
      };
    // TODO: Add cases for connecting nodes
    default:
      return state;
  }
};

export const MindMapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mindMapReducer, {
    mindMap: null,
  });

  return (
    <MindMapContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MindMapContext.Provider>
  );
};

export default MindMapContext;
