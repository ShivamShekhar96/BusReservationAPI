import { Router } from "express";
import reservationRoutes from "./reservation.routes";
import userRoutes from "./user.routes";
import healthCheckRoutes from "./healthCheck.routes";
import busRoutes from "./bus.routes";

const api = Router()
  .use(reservationRoutes)
  .use(userRoutes)
  .use(healthCheckRoutes)
  .use(busRoutes);

export default Router().use("/api/v1/", api);
