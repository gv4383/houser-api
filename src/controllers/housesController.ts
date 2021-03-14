import { Request, Response } from 'express';

import houses from '../db';
import { House } from '../types/houses';

export const getHouses = (req: Request, res: Response): void => {
  res.status(200).send(houses);
};

export const getHouse = (req: Request, res: Response): void => {
  const { id } = req.params;
  const houseIndex = houses.findIndex((house: House) => house.id === parseInt(id));

  if (houseIndex < 0) {
    res.status(404).send('Not Found. The requested id does not exist.');
  } else {
    res.status(200).send(houses[houseIndex]);
  }
};
