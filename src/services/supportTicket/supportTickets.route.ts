
import { Router } from "express";
import {
  getAllSupportTickets,
  getSupportTicketById,
  getSupportTicketsByUserId,
  createSupportTicket,
  updateSupportTicket,
  deleteSupportTicket,
} from "./supportTicket.controller";

const supportTicketRoutes = Router();

// Get all support tickets
supportTicketRoutes.get("/all-tickets", getAllSupportTickets);

// Get a support ticket by ID
supportTicketRoutes.get("/ticket/:ticketId", getSupportTicketById);

// Get support tickets by user ID
supportTicketRoutes.get("/user-tickets/:userId", getSupportTicketsByUserId);

// Create a new support ticket
supportTicketRoutes.post("/create-ticket", createSupportTicket);

// Update a support ticket
supportTicketRoutes.put("/update-ticket/:ticketId", updateSupportTicket);

// Delete a support ticket
supportTicketRoutes.delete("/delete-ticket/:ticketId", deleteSupportTicket);

export default supportTicketRoutes;
