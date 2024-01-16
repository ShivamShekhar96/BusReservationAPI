import { GetSeats } from "../utils/interface/seat.interface";
import getPool from "../db";

const db = getPool();

export const getSeats = async (params?: GetSeats) => {
  const results = await db.query(
    "SELECT id, type, price, status  FROM public.seats where bus_id = $1 ORDER BY number ASC",
    [params.bus_id]
  );
  return results.rows;
};
