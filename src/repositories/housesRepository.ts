import { ERROR_MESSAGES } from '../constants';
import db from '../db';
import { COLUMNS, TABLES } from '../db/constants';
import { House } from '../types/houses';

export const getHouses = async (): Promise<House[]> => {
  try {
    const houses: House[] = await db.select().table(TABLES.HOUSES);

    return houses;
  } catch (err) {
    throw err;
  }
};

export const getHouse = async (id: string): Promise<House> => {
  try {
    const houses: House[] = await db(TABLES.HOUSES).where(COLUMNS.ID, id);

    if (houses.length === 0) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }

    return houses[0];
  } catch (err) {
    throw err;
  }
};

export const addHouse = async (newHouse: House): Promise<House> => {
  try {
    const newHouseIds: number[] = await db(TABLES.HOUSES).insert(newHouse, COLUMNS.ID);

    const addedHouses: House[] = await db(TABLES.HOUSES).where(COLUMNS.ID, newHouseIds[0]);

    return addedHouses[0];
  } catch (err) {
    throw err;
  }
};

export const updateHouse = async (houseId: string, updatedHouse: House): Promise<House> => {
  try {
    const houseIds: number[] = await db(TABLES.HOUSES)
      .where(COLUMNS.ID, houseId)
      .update(updatedHouse, COLUMNS.ID);

    if (houseIds.length === 0) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }

    const updatedHouses: House[] = await db(TABLES.HOUSES).where(COLUMNS.ID, houseId);

    return updatedHouses[0];
  } catch (err) {
    throw err;
  }
};

export const deleteHouse = async (houseId: string): Promise<void> => {
  try {
    const houseIds: number[] = await db(TABLES.HOUSES).where(COLUMNS.ID, houseId).del(COLUMNS.ID);

    if (houseIds.length === 0) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
  } catch (err) {
    throw err;
  }
};
