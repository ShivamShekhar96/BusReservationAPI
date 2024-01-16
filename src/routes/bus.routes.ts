import { getAllBuses } from "../controllers/bus.controller";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
router.get(
  "/buses/all",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getAllBuses();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
