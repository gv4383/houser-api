import { Router } from 'express';

import { create, destroy, index, show, update } from '../controllers/housesController';
import { getStatus } from '../controllers/statusController';

const router = Router();

router.get('/status', getStatus);

router.get('/houses', index);
router.post('/houses', create);
router.get('/houses/:id', show);
router.put('/houses/:id', update);
router.delete('/houses/:id', destroy);

export default router;
