import { getSeats } from "../controllers/seat.controller";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
router.get(
  "/buses/all",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        bus_id: parseInt(req.params.bus_id),
      };
      const data = await getSeats(payload);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
