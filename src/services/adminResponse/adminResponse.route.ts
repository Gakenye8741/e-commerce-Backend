import { Router } from "express";
import {
  createAdminResponse,
  getResponsesByTicketId,
  getResponsesByAdminId,
  updateAdminResponse,
  deleteAdminResponse,
} from "./adminResponses.controller";

const adminResponseRoutes = Router();

// Create a new admin response
adminResponseRoutes.post("/create-response", createAdminResponse);

// Get all responses by support ticket ID
adminResponseRoutes.get("/responses/ticket/:ticketId", getResponsesByTicketId);

// Get all responses by admin ID
adminResponseRoutes.get("/responses/admin/:adminId", getResponsesByAdminId);

// Update a specific response
adminResponseRoutes.put("/update-response/:responseId", updateAdminResponse);

// Delete a specific response
adminResponseRoutes.delete("/delete-response/:responseId", deleteAdminResponse);

export default adminResponseRoutes;
