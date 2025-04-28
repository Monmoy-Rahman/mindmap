const mongoose = require('mongoose');

const nodeSchema = mongoose.Schema(
  {
    mindMap: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'MindMap',
    },
    text: {
      type: String,
      required: true,
    },
    position: {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Node',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
