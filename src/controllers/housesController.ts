import { Request, Response } from 'express';

import { ERROR_MESSAGES } from '../constants';

import {
  addHouse,
  deleteHouse,
  getHouse,
  getHouses,
  updateHouse,
} from '../repositories/housesRepository';
import { House } from '../types/houses';

export const index = async (_: Request, res: Response): Promise<Response> => {
  try {
    const houses = await getHouses();

    return res.json(houses);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const house = await getHouse(id);

    return res.json(house);
  } catch (err) {
    const errorStatus = err.message === ERROR_MESSAGES.NOT_FOUND ? 404 : 500;

    return res.status(errorStatus).json({ message: err.message });
  }
};

export const create = async (req: Request, res: Response): Promise<Response> => {
  const newHouse: House = { ...req.body };

  try {
    const addedHouse = await addHouse(newHouse);

    return res.json(addedHouse);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const updatedHouse: House = { ...req.body };
  try {
    const newlyUpdatedHouse = await updateHouse(id, updatedHouse);

    return res.json(newlyUpdatedHouse);
  } catch (err) {
    const errorStatus = err.message === ERROR_MESSAGES.NOT_FOUND ? 404 : 500;

    return res.status(errorStatus).json({ message: err.message });
  }
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await deleteHouse(id);

    return res.sendStatus(204);
  } catch (err) {
    const errorStatus = err.message === ERROR_MESSAGES.NOT_FOUND ? 404 : 500;

    return res.status(errorStatus).json({ message: err.message });
  }
};
