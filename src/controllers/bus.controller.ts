import getPool from "db";

const db = getPool();

export const getAllBuses = async (params?: any) => {
  const query = "SELECT * FROM public.buses";
  const results = await db.query(query, [params.bus_id, status.toString()]);
  return results.rows;
};
