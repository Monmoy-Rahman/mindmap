const asyncHandler = require('express-async-handler');
const MindMap = require('../models/MindMap');
const Node = require('../models/Node');

// @desc    Get all mind maps for a user
// @route   GET /api/mindmaps
// @access  Private
const getMindMaps = asyncHandler(async (req, res) => {
  const mindMaps = await MindMap.find({ user: req.user._id }).populate('nodes');
  res.json(mindMaps);
});

// @desc    Get a single mind map by ID
// @route   GET /api/mindmaps/:id
// @access  Private
const getMindMapById = asyncHandler(async (req, res) => {
  const mindMap = await MindMap.findById(req.params.id).populate('nodes');

  if (mindMap && mindMap.user.toString() === req.user._id.toString()) {
    res.json(mindMap);
  } else {
    res.status(404);
    throw new Error('Mind map not found');
  }
});

// @desc    Create a new mind map
// @route   POST /api/mindmaps
// @access  Private
const createMindMap = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const mindMap = new MindMap({
    user: req.user._id,
    title,
    nodes: [],
  });

  const createdMindMap = await mindMap.save();
  res.status(201).json(createdMindMap);
});

// @desc    Update a mind map
// @route   PUT /api/mindmaps/:id
// @access  Private
const updateMindMap = asyncHandler(async (req, res) => {
  const { title, nodes } = req.body;

  const mindMap = await MindMap.findById(req.params.id);

  if (mindMap && mindMap.user.toString() === req.user._id.toString()) {
    mindMap.title = title || mindMap.title;
    // Note: Updating nodes array directly might require more complex logic
    // depending on how node changes are sent from the frontend.
    // For simplicity, this example assumes the entire nodes array is sent.
    // A more robust solution might involve separate routes for node operations.
    mindMap.nodes = nodes || mindMap.nodes;

    const updatedMindMap = await mindMap.save();
    res.json(updatedMindMap);
  } else {
    res.status(404);
    throw new Error('Mind map not found');
  }
});

// @desc    Delete a mind map
// @route   DELETE /api/mindmaps/:id
// @access  Private
const deleteMindMap = asyncHandler(async (req, res) => {
  const mindMap = await MindMap.findById(req.params.id);

  if (mindMap && mindMap.user.toString() === req.user._id.toString()) {
    // Also delete associated nodes
    await Node.deleteMany({ mindMap: mindMap._id });
    await mindMap.remove();
    res.json({ message: 'Mind map removed' });
  } else {
    res.status(404);
    throw new Error('Mind map not found');
  }
});

// @desc    Create a new node for a mind map
// @route   POST /api/mindmaps/:id/nodes
// @access  Private
const createNode = asyncHandler(async (req, res) => {
  const { text, position } = req.body;
  const mindMapId = req.params.id;

  const mindMap = await MindMap.findById(mindMapId);

  if (mindMap && mindMap.user.toString() === req.user._id.toString()) {
    const node = new Node({
      mindMap: mindMapId,
      text,
      position,
      connections: [],
    });

    const createdNode = await node.save();

    mindMap.nodes.push(createdNode._id);
    await mindMap.save();

    res.status(201).json(createdNode);
  } else {
    res.status(404);
    throw new Error('Mind map not found');
  }
});

// @desc    Update a node
// @route   PUT /api/nodes/:id
// @access  Private
const updateNode = asyncHandler(async (req, res) => {
  const { text, position, connections } = req.body;

  const node = await Node.findById(req.params.id);

  if (node) {
    const mindMap = await MindMap.findById(node.mindMap);
    if (mindMap && mindMap.user.toString() === req.user._id.toString()) {
      node.text = text || node.text;
      node.position = position || node.position;
      node.connections = connections || node.connections;

      const updatedNode = await node.save();
      res.json(updatedNode);
    } else {
      res.status(404);
      throw new Error('Mind map not found for this user');
    }
  } else {
    res.status(404);
    throw new Error('Node not found');
  }
});

// @desc    Delete a node
// @route   DELETE /api/nodes/:id
// @access  Private
const deleteNode = asyncHandler(async (req, res) => {
  const node = await Node.findById(req.params.id);

  if (node) {
    const mindMap = await MindMap.findById(node.mindMap);
    if (mindMap && mindMap.user.toString() === req.user._id.toString()) {
      // Remove node reference from mind map
      mindMap.nodes.pull(node._id);
      await mindMap.save();

      await node.remove();
      res.json({ message: 'Node removed' });
    } else {
      res.status(404);
      throw new Error('Mind map not found for this user');
    }
  } else {
    res.status(404);
    throw new Error('Node not found');
  }
});


module.exports = {
  getMindMaps,
  getMindMapById,
  createMindMap,
  updateMindMap,
  deleteMindMap,
  createNode,
  updateNode,
  deleteNode,
};
