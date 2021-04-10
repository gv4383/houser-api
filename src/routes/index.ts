import { Router } from 'express';

import { addHouse, deleteHouse, getHouse, getHouses } from '../controllers/housesController';
import { getStatus } from '../controllers/statusController';

const router = Router();

router.get('/status', getStatus);

router.get('/houses', getHouses);
router.post('/houses', addHouse);
router.get('/houses/:id', getHouse);
router.delete('/houses/:id', deleteHouse);

export default router;
