const mongoose = require('mongoose');

const mindMapSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    nodes: [
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

const MindMap = mongoose.model('MindMap', mindMapSchema);

module.exports = MindMap;
