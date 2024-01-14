import { Router, Response, Request, NextFunction } from "express";
import { getUserById } from "../controllers/user.controller";

const router = Router();

router.get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = {
        user_id: parseInt(req.params.id),
      };
      const user = await getUserById(payload);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

// router.post(
//   "/users/",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const profile = await createUser(req.params);
//       res.json({ profile });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

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
