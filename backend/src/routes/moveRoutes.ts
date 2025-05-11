import express from 'express';
import { getMoves } from '../controllers/moveController';

const router = express.Router();

router.get('/moves', getMoves);
export default router;