import express from 'express';
import { getItems, createItemEntries, getSearchedItems } from '../controllers/itemController';

const router = express.Router();
// Get items
router.get('/items', getItems);
// Get searched items
router.post('/searchItems', getSearchedItems)
// Create db entries for items
router.post('/itemdb/entry', createItemEntries);
export default router;