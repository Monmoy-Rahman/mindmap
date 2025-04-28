const express = require('express');
const router = express.Router();
const {
  getMindMaps,
  getMindMapById,
  createMindMap,
  updateMindMap,
  deleteMindMap,
  createNode,
  updateNode,
  deleteNode,
} = require('../controllers/mindmapController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getMindMaps).post(protect, createMindMap);
router
  .route('/:id')
  .get(protect, getMindMapById)
  .put(protect, updateMindMap)
  .delete(protect, deleteMindMap);
router.route('/:id/nodes').post(protect, createNode);
router.route('/nodes/:id').put(protect, updateNode).delete(protect, deleteNode);

module.exports = router;
