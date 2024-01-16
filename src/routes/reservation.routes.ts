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
        bus_id: parseInt(req.query.bus_id as string),
        stage: req.query.stage as string,
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
        passenger_data: req.body.passenger_data as any,
        seat_id: parseInt(req.body.seat_id),
        bus_id: parseInt(req.body.bus_id),
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
        passenger_data: req.body.passenger_data,
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
      const payload = {
        bus_id: parseInt(req.query.bus_id as string)
      }
      
      const data = await resetReservations(payload);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
