import { GetSeats } from "../utils/interface/seat.interface";
import getPool from "../db";

const db = getPool();

export const getSeats = async (params?: GetSeats) => {
  const results = await db.query(
    "SELECT * FROM public.seats where bus_id = $1",
    [params.bus_id]
  );
  return results.rows;
};
