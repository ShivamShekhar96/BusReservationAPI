import { Router } from "express";
import reservationController from "./reservation.routes";
import userController from "./user.routes";
import healthCheckController from "./healthCheck.routes";

const api = Router()
  .use(reservationController)
  .use(userController)
  .use(healthCheckController);

export default Router().use("/api", api);
