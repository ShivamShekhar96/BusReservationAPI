import { Request, Router, Response, NextFunction } from "express";
import {
  getReservationById,
  getReservations,
  updateReservation,
  resetReservations,
  createReservation,
  deleteReservation,
} from "../controllers/reservation.controller";

const router = Router();

router.get(
  "/reservations/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqReservation = await getReservationById({
        reservation_id: parseInt(req.params.id),
      });
      res.json({ reqReservation });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/reservations/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        bus_id: parseInt(req.params.bus_id),
        status: [req.params.status],
      };
      const reqReservations = await getReservations(payload);
      res.json({ reqReservations });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/reservations/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        passenger_details: {
          email: req.params.email,
          first_name: req.params.first_name,
          last_name: req.params.last_name,
        },
        seat_id: parseInt(req.params.seat_id),
      };
      const newReservation = await createReservation(payload);
      res.json({ newReservation });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/reservations/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        update_details: {
          email: req.params.email,
          first_name: req.params.first_name,
          last_name: req.params.last_name,
        },
        reservation_id: parseInt(req.params.id),
      };
      const response = await updateReservation(payload);
      res.json({ response });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/reservations/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        reservation_id: parseInt(req.params.id),
      };
      const response = await deleteReservation(payload);
      res.json({ response });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/reservations/reset",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await resetReservations(req.params);
      res.json({ response });
    } catch (error) {
      next(error);
    }
  }
);

export default router;