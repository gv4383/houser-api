import { Request, Response } from 'express';

import {
  addHouse,
  deleteHouse,
  getHouse,
  getHouses,
  updateHouse,
} from '../repositories/housesRepository';
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

export const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  await deleteHouse(id, res);

  return res.sendStatus(204);
};
