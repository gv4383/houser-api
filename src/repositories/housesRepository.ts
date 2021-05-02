import { Response } from 'express';

import db from '../db';
import { COLUMNS, TABLES } from '../db/constants';
import { House } from '../types/houses';

export const getHouses = async (res: Response): Promise<House[] | Response> => {
  try {
    const houses = await db.select().table(TABLES.HOUSES);

    return houses;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
