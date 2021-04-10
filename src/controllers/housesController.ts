import { Request, Response } from 'express';

import houses from '../db';
import { House } from '../types/houses';

let idCount = 2;

export const getHouses = (_: Request, res: Response): Response => res.json(houses);

export const getHouse = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const houseIndex = houses.findIndex((house: House) => house.id === parseInt(id));

  if (houseIndex < 0) {
    res.status(404);

    return res.json({ message: 'Not Found. The requested id does not exist.' });
  }

  return res.json(houses[houseIndex]);
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
