import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import {
  CreateTicket,
  DeleteTicket,
  EditTicket,
  FindTicketById,
  FindTickets,
} from "../controllers/ticket.controller.js";

const router = express.Router();

router.route("/create").post(AuthMiddleware, CreateTicket);
router.route("/delete/:id").delete(AuthMiddleware, DeleteTicket);
router.route("/edit/:id").put(AuthMiddleware, EditTicket);
router.route("/get").get(AuthMiddleware, FindTickets);
router.route("/view/:id").get(AuthMiddleware, FindTicketById);

export default router;
