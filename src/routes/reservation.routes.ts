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
      const data = await getReservationById({
        reservation_id: parseInt(req.params.id),
      });
      res.status(200).json({ data });
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
      const data = await getReservations(payload);
      res.status(200).json({ data });
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
      const data = await createReservation(payload);
      res.json({ data });
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
      const data = await updateReservation(payload);
      res.json({ data });
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
      const data = await deleteReservation(payload);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/reservations/reset",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await resetReservations(req.params);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
