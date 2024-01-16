import getPool from "../db";
import { GetUserById } from "../utils/interface/user.interface";

const db = getPool();

// export const deleteUser = (params) => {
//   const id = parseInt(params.id);

//   db.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     // response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

export const getUserById = async (params: GetUserById) => {
  const id = params.user_id;

  const results = await db.query("SELECT * FROM public.users WHERE id = $1", [id]);
  return results.rows[0];
};

// export const createUser = (params) => {
//   const id = parseInt(params.id);

//   db.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     // response.status(200).json(results.rows);
//   });
// };

// export const updateUser = (params) => {
//   const id = parseInt(params.id);

//   db.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     // response.status(200).json(results.rows);
//   });
// };
