import { Request, Response } from 'express';

import houses from '../db';

export const getHouses = (req: Request, res: Response): void => {
  res.status(200).send(houses);
};
