import { Request, Router, Response, NextFunction } from "express";

const router = Router();

router.get(
  "/health/ping",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json("Success.");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
