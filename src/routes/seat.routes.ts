import { getSeats } from "../controllers/seat.controller";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
router.get(
  "/seats",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        bus_id: parseInt(req.query.bus_id as string),
      };
      const data = await getSeats(payload);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
