import { Request, Response } from 'express';

import db, { houses } from '../db';
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

export const updateHouse = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const houseIndex = houses.findIndex((house: House) => house.id === parseInt(id));

  if (houseIndex < 0) {
    res.status(404);

    return res.json({ message: 'Not Found. The requested id does not exist.' });
  }

  const updatedHouse = {
    ...houses[houseIndex],
    ...req.body,
  };

  houses[houseIndex] = updatedHouse;

  return res.json(updatedHouse);
};

export const deleteHouse = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const houseIndex = houses.findIndex((house: House) => house.id === parseInt(id));

  if (houseIndex < 0) {
    res.status(404);

    return res.json({ message: 'Not Found. The requested id does not exist.' });
  }

  houses.splice(houseIndex, 1);

  return res.sendStatus(204);
};
