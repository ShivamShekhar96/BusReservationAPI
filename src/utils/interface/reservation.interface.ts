export interface GetReservations {
  bus_id: number;
  status: Array<string>;
}

export interface GetReservationById {
  reservation_id: number;
}

export interface UpdateReservation {
  update_details: { email?: string; first_name?: string; last_name?: string };
  reservation_id: number;
}

export interface CreateReservation {
  passenger_details: { email: string; first_name: string; last_name: string };
  seat_id: number;
  booking_user_id?: number;
}

export interface DeleteReservation {
  reservation_id: number;
}

export interface ResetReservation {
  bus_id?: number;
}