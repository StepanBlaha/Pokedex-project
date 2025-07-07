import express from 'express';
import { getRecord, createRecord } from '../controllers/favouriteController';
const router = express.Router();

router.post('/favourite/create', createRecord)
router.post('/favourite/get', getRecord)
export default router;