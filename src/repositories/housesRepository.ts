import { Response } from 'express';

import db from '../db';
import { COLUMNS, TABLES } from '../db/constants';
import { House } from '../types/houses';

export const getHouses = async (res: Response): Promise<House[] | Response> => {
  try {
    const houses: House[] = await db.select().table(TABLES.HOUSES);

    return houses;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getHouse = async (id: string, res: Response): Promise<House | Response> => {
  try {
    const houses: House[] = await db(TABLES.HOUSES).where(COLUMNS.ID, id);

    if (houses.length === 0) {
      return res.status(404).json({ message: 'Not Found. The requested id does not exist.' });
    }

    return houses[0];
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addHouse = async (newHouse: House, res: Response): Promise<House | Response> => {
  try {
    const newHouseIds: number[] = await db(TABLES.HOUSES).insert(newHouse, COLUMNS.ID);

    const addedHouses: House[] = await db(TABLES.HOUSES).where(COLUMNS.ID, newHouseIds[0]);

    return addedHouses[0];
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
