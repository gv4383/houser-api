import { Request, Response } from 'express';

import db, { houses } from '../db';
import { TABLES } from '../db/constants';
import { House } from '../types/houses';

let idCount = 2;

export const getHouses = (_: Request, res: Response): void => {
  db.select()
    .table(TABLES.HOUSES)
    .then((houses: House[]) => res.json(houses))
    .catch(err => res.status(500).json({ message: err.message }));
};

export const getHouse = (req: Request, res: Response): void => {
  const { id } = req.params;

  db(TABLES.HOUSES)
    .where('id', id)
    .then((houses: House[]) => {
      if (houses.length === 0) {
        return res.status(404).json({ message: 'Not Found. The requested id does not exist.' });
      }

      return res.json(houses[0]);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

export const addHouse = (req: Request, res: Response): Response => {
  const newHouse = {
    id: idCount,
    ...req.body,
  };

  houses.push(newHouse);
  idCount += 1;

  return res.json(newHouse);
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
