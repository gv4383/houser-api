import { Request, Response } from 'express';

export const getStatus = (req: Request, res: Response): void => {
  res.status(200).send({ status: 'ok' });
};
