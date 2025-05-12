import express from 'express';
import { getMoves, createMoveEntries, getSearchedMove } from '../controllers/moveController';

const router = express.Router();

router.get('/moves', getMoves);
router.post('/searchMoves', getSearchedMove)
// Insert types into mongo - !!!use only once!!!
router.post('/movedb/entry', createMoveEntries)
export default router;