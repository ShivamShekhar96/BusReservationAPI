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

export const getReservations = async (params: GetReservations) => {
  let status = [CONFIRM_STATUS, CANCEL_STATUS];
  if (params.status) status = params.status;
  const query =
    "SELECT * FROM public.reservations r JOIN public.seats s ON s.id = r.seat_id WHERE s.bus_id = $1 AND status in ($2) ORDER BY created_at ASC";
  const results = await db.query(query, [params.bus_id, status.toString()]);
  return results.rows;
};

export const getReservationById = async (params: GetReservationById) => {
  const id = params.reservation_id;
  const result = await db.query(
    "SELECT * FROM public.reservations WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// TODO: status is hardcoded to confirmed. convert to dynamic. [0: pending, 1: confirmed, 2: cancelled]
export const createReservation = async (params: CreateReservation) => {
  const { seat_id, passenger_details } = params;
  let booking_user_id: number | null = null;
  if (params.booking_user_id)
    booking_user_id = parseInt(params.booking_user_id.toString());
  const result = await db.query(
    "INSERT INTO public.reservations (seat_id, passenger_data, booking_user_id, status) VALUES ($1, $2) RETURNING *",
    [seat_id, passenger_details, booking_user_id, CONFIRM_STATUS]
  );
  return `New reservation created with ID ${result.id}`;
};

export const updateReservation = async (params: UpdateReservation) => {
  const id = params.reservation_id;
  const currReservationPassenger = db.query(
    "SELECT passenger_data FROM public.reservations WHERE id = $1",
    [id],
    (error: any, results: any) => {
      return results.rows[0].passenger_data;
    }
  );
  const newPassengerDetails = {
    ...currReservationPassenger,
    ...params.update_details,
  };

  const result = await db.query(
    "UPDATE public.reservations SET passenger_data = $1 WHERE id = $2",
    [newPassengerDetails, id]
  );
  return result.id;
};

export const deleteReservation = async (params: DeleteReservation) => {
  const id = params.reservation_id;
  const result = await db.query(
    "UPDATE public.reservations SET status = $1 WHERE id = $2",
    [CANCEL_STATUS, id]
  );
  return `Reservation was successfully cancelled for reservation_id: ${result.id}`;
};

export const resetReservations = async (params: ResetReservation) => {
  await db.query(
    "UPDATE public.reservations SET status = $1 WHERE status = $2",
    [CANCEL_STATUS, CONFIRM_STATUS]
  );
  return "Reservations were successfully reset";
};
