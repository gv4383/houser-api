import { Request, Response } from 'express';

import db from '../db';
import { COLUMNS, TABLES } from '../db/constants';
import { addHouse, getHouse, getHouses, updateHouse } from '../repositories/housesRepository';
import { House } from '../types/houses';

export const index = async (_: Request, res: Response): Promise<Response> => {
  const houses = await getHouses(res);

  return res.json(houses);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const house = await getHouse(id, res);

  return res.json(house);
};

export const create = async (req: Request, res: Response): Promise<Response> => {
  const newHouse: House = { ...req.body };
  const addedHouse = await addHouse(newHouse, res);

  return res.json(addedHouse);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const updatedHouse: House = { ...req.body };
  const newlyUpdatedHouse = await updateHouse(id, updatedHouse, res);

  return res.json(newlyUpdatedHouse);
};

export const destroy = (req: Request, res: Response): void => {
  const { id } = req.params;

  db(TABLES.HOUSES)
    .where(COLUMNS.ID, id)
    .del(COLUMNS.ID)
    .then((ids: number[]) => {
      if (ids.length === 0) {
        return res.status(404).json({ message: 'Not Found. The requested id does not exist.' });
      }

      return res.sendStatus(204);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};
