import { Router } from "express";
import reservationController from "./reservation.routes";
import userController from "./user.routes";

const api = Router().use(reservationController).use(userController);

export default Router().use("/api", api);
