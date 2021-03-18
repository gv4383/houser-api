import { Router } from 'express';

import { addHouse, getHouse, getHouses } from '../controllers/housesController';
import { getStatus } from '../controllers/statusController';

const router = Router();

router.get('/status', getStatus);

router.get('/houses', getHouses);
router.post('/houses', addHouse);
router.get('/houses/:id', getHouse);

export default router;
