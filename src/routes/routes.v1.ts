import { Router } from "express";
import reservationRoutes from "./reservation.routes";
import userRoutes from "./user.routes";
import healthCheckRoutes from "./healthCheck.routes";
import busRoutes from "./bus.routes";
import seatRoutes from "./seat.routes";

const api = Router()
  .use(reservationRoutes)
  .use(userRoutes)
  .use(healthCheckRoutes)
  .use(busRoutes)
  .use(seatRoutes);

export default Router().use("/api/v1/", api);
