import getPool from "../db";
import { CreateUser, GetUserById } from "../utils/interface/user.interface";

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

  const results = await db.query(
    "SELECT id, email, first_name, last_name, phone FROM public.users WHERE id = $1",
    [id]
  );
  return results.rows[0];
};

export const createUser = (params: CreateUser) => {
  const result = db.query(
    "INSERT INTO public.users (email, first_name, last_name, phone) VALUES ($1, $2, $3, $4) RETURNING id",
    [params.email, params.first_name, params.last_name, params.phone]
  );

  return result.rows[0].id;
};

// export const updateUser = (params) => {
//   const id = parseInt(params.id);

//   db.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     // response.status(200).json(results.rows);
//   });
// };
