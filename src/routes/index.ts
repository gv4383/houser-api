import { Router } from 'express';

import { getHouse, getHouses } from '../controllers/housesController';
import { getStatus } from '../controllers/statusController';

const router = Router();

router.get('/status', getStatus);

router.get('/houses', getHouses);
router.get('/houses/:id', getHouse);

export default router;
