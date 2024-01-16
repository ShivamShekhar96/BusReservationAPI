import getPool from "../db";
import {
  CreateReservation,
  DeleteReservation,
  GetReservationById,
  GetReservations,
  ResetReservation,
  UpdateReservation,
} from "../utils/interface/reservation.interface";

const db = getPool();
const CANCEL_STATUS = "cancelled";
const CONFIRM_STATUS = "confirmed";

export const getReservations = (params: GetReservations) => {
  let status = [CONFIRM_STATUS, CANCEL_STATUS];
  if (params.status) status = params.status;
  const query =
    "SELECT * FROM reservations r JOIN seats s ON s.id = r.seat_id WHERE s.bus_id = $1 AND status in ($2) ORDER BY created_at ASC";
  db.query(query, [params.bus_id, status.toString()], (error, results) => {
    if (error) {
      throw error;
    }
    return results.rows;
  });
};

export const getReservationById = async (params: GetReservationById) => {
  const id = params.reservation_id;
  console.log(id, db);
  const result = await db.query(
    "SELECT * FROM public.reservations WHERE id = $1",
    [id]
  );
  console.log(result, result.rows)
  return result.rows
};

// TODO: status is hardcoded to confirmed. convert to dynamic. [0: pending, 1: confirmed, 2: cancelled]
export const createReservation = (params: CreateReservation) => {
  const { seat_id, passenger_details } = params;
  let booking_user_id: number | null = null;
  if (params.booking_user_id)
    booking_user_id = parseInt(params.booking_user_id.toString());
  db.query(
    "INSERT INTO reservations (seat_id, passenger_data, booking_user_id, status) VALUES ($1, $2) RETURNING *",
    [seat_id, passenger_details, booking_user_id, CONFIRM_STATUS],
    (error, results) => {
      if (error) {
        throw error;
      }
      //   response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

export const updateReservation = (params: UpdateReservation) => {
  const id = params.reservation_id;
  const currReservationPassenger = db.query(
    "SELECT passenger_data from reservations where id = $1",
    [id],
    (error: any, results: any) => {
      return results.rows[0].passenger_data;
    }
  );
  const newPassengerDetails = {
    ...currReservationPassenger,
    ...params.update_details,
  };

  db.query(
    "UPDATE reservations SET passenger_data = $1 WHERE id = $2",
    [newPassengerDetails, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return id;
    }
  );
};

export const deleteReservation = (params: DeleteReservation) => {
  const id = params.reservation_id;
  db.query(
    "UPDATE reservations SET status = $1 WHERE id = $2",
    [CANCEL_STATUS, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return `Reservation was successfully cancelled for reservation_id: ${id}`;
    }
  );
};

export const resetReservations = (params: ResetReservation) => {
  db.query(
    "UPDATE reservations SET status = $1 WHERE status = $2",
    [CANCEL_STATUS, CONFIRM_STATUS],
    (error, results) => {
      if (error) {
        throw error;
      }
      return "Reservations were successfully reset";
    }
  );
};
