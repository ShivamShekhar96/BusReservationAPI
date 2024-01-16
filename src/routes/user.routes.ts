import { Router, Response, Request, NextFunction } from "express";
import { createUser, getUserById } from "../controllers/user.controller";

const router = Router();

router.get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        user_id: parseInt(req.params.id),
      };
      const data = await getUserById(payload);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/users/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
      };
      const profile = await createUser(payload);
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }
);

// router.put(
//   "/users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const profile = await updateUser(req.params);
//       res.json({ profile });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete(
//   "/users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const profile = await deleteUser(req.params);
//       res.json({ profile });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default router;
