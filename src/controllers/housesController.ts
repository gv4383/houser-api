import { Request, Response } from 'express';

import db from '../db';
import { COLUMNS, TABLES } from '../db/constants';
import { House } from '../types/houses';

export const getHouses = (_: Request, res: Response): void => {
  db.select()
    .table(TABLES.HOUSES)
    .then((houses: House[]) => res.json(houses))
    .catch(err => res.status(500).json({ message: err.message }));
};

export const getHouse = (req: Request, res: Response): void => {
  const { id } = req.params;

  db(TABLES.HOUSES)
    .where(COLUMNS.ID, id)
    .then((houses: House[]) => {
      if (houses.length === 0) {
        return res.status(404).json({ message: 'Not Found. The requested id does not exist.' });
      }

      return res.json(houses[0]);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

export const addHouse = async (req: Request, res: Response): Promise<void> => {
  const newHouse: House = { ...req.body };
  let newHouseId;

  await db(TABLES.HOUSES)
    .insert(newHouse, COLUMNS.ID)
    .then((ids: number[]) => {
      newHouseId = ids[0];
    })
    .catch(err => res.status(500).json({ message: err.message }));

  await db(TABLES.HOUSES)
    .where(COLUMNS.ID, newHouseId)
    .then((houses: House[]) => res.json(houses[0]))
    .catch(err => res.status(500).json({ message: err.message }));
};

export const updateHouse = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedHouse = { ...req.body };

  await db(TABLES.HOUSES)
    .where(COLUMNS.ID, id)
    .update(updatedHouse, COLUMNS.ID)
    .then((ids: number[]) => {
      if (ids.length === 0) {
        return res.status(404).json({ message: 'Not Found. The requested id does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));

  await db(TABLES.HOUSES)
    .where(COLUMNS.ID, id)
    .then((houses: House[]) => res.json(houses[0]))
    .catch(err => res.status(500).json({ message: err.message }));
};

export const deleteHouse = (req: Request, res: Response): void => {
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
