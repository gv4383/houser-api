import { Router } from 'express';

import { getHouses } from '../controllers/housesController';
import { getStatus } from '../controllers/statusController';

const router = Router();

router.get('/status', getStatus);

router.get('/houses', getHouses);

export default router;
