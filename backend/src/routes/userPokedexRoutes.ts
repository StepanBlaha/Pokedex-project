import express from 'express';
import { getRecord, createRecord, updateRecord} from '../controllers/userPokedexController';
const router = express.Router();

router.post('/userpokedex/create', createRecord)
router.post('/userpokedex/get', getRecord)
router.post('/userpokedex/update', updateRecord)
export default router;