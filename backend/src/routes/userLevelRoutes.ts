import express from 'express';
import { getRecord, createRecord } from '../controllers/userLevelController';
const router = express.Router();

router.post('/userlevel/create', createRecord)
router.post('/userlevel/get', getRecord)
export default router;