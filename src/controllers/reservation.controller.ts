import getPool from "../db";
import {
  CreateReservation,
  DeleteReservation,
  GetReservationById,
  GetReservations,
  ResetReservation,
  UpdateReservation,
} from "../utils/interface/reservation.interface";
import { createUser } from "./user.controller";

const db = getPool();
const CANCEL_STATUS = "cancelled";
const CONFIRM_STATUS = "confirmed";

export const getReservations = async (params: GetReservations) => {
  let stage = CONFIRM_STATUS;
  if (params.stage) stage = params.stage;
  let query =
    "SELECT r.id, r.bus_id, r.seat_id, r.bus_id, r.stage, r.created_at, r.passenger_data, s.number, s.status, s.type, s.price FROM public.reservations r JOIN public.seats s ON r.seat_id = s.id WHERE r.bus_id = $1 AND r.stage = $2 ORDER BY r.created_at ASC";
  const results = await db.query(query, [params.bus_id, stage]);
  return results.rows;
};

export const getReservationById = async (params: GetReservationById) => {
  const id = params.reservation_id;
  const result = await db.query(
    "SELECT id, seat_id, bus_id, stage, passenger_data, booking_user_id, created_at FROM public.reservations WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const existingReservation = async (params: any) => {
  const result = await db.query(
    "SELECT id FROM public.reservations WHERE seat_id=$1 AND stage=$2",
    [params.seat_id, "confirmed"]
  );
  return result.rows.length > 0;
};
// TODO: status is hardcoded to confirmed. convert to dynamic.
export const createReservation = async (params: CreateReservation) => {
  if (existingReservation(params.seat_id)) return "Seat already reserved.";
  const { seat_id, passenger_data, bus_id } = params;
  let booking_user_id: number | null = null;
  if (params.booking_user_id)
    booking_user_id = parseInt(params.booking_user_id.toString());
  const result = await db.query(
    "INSERT INTO public.reservations (seat_id, passenger_data, booking_user_id, stage, bus_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [seat_id, passenger_data, booking_user_id, CONFIRM_STATUS, bus_id]
  );
  // if (!!passenger_data.email) createUser(passenger_data);
  if (result.rows.length > 0)
    await db.query("UPDATE public.seats SET status = $1 WHERE id = $2", [
      "booked",
      seat_id,
    ]);
  return `New reservation created with ID ${result.rows[0].id}`;
};

export const updateReservation = async (params: UpdateReservation) => {
  const result = await db.query(
    "UPDATE public.reservations SET passenger_data = $1 WHERE id = $2 RETURNING id",
    [params.passenger_data, params.reservation_id]
  );
  return `Successfully updated passenger details for reservation id ${result.rows[0].id}`;
};

export const deleteReservation = async (params: DeleteReservation) => {
  const id = params.reservation_id;
  const result = await db.query(
    "UPDATE public.reservations SET stage = $1 WHERE id = $2 RETURNING id, seat_id",
    [CANCEL_STATUS, id]
  );
  if (result.rows.length > 0)
    await db.query("UPDATE public.seats SET status = $1 where id = $2", [
      "available",
      result.rows[0].seat_id,
    ]);
  return `Reservation was successfully cancelled for reservation_id: ${result.rows[0].id}`;
};

export const resetReservations = async (params: ResetReservation) => {
  const results = await db.query(
    "UPDATE public.reservations SET stage = $1 WHERE bus_id = $2 AND stage = $3",
    [CANCEL_STATUS, params.bus_id, CONFIRM_STATUS]
  );

  await db.query("UPDATE public.seats SET status = $1 WHERE bus_id = $2", [
    "available",
    params.bus_id,
  ]);
  return "Reservations were successfully reset";
};
