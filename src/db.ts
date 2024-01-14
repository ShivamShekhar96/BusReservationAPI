import { Pool } from "pg";

let _pool: any;
export const initDB = () => {
  if (_pool) {
  }
  _pool = new Pool({
    user: process.env.DB_USER || "me",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_URL || "api",
    password: process.env.DB_PASSWORD || "password",
    port: 5432,
  });
};

export const getDB = () => {
  return _pool;
};

export default {
  initDB,
  getDB,
};
