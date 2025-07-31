
import { Request, Response } from "express";
import {
  createSupportTicketService,
  deleteSupportTicketService,
  getAllSupportTicketsService,
  getSupportTicketByIdService,
  getSupportTicketsByUserIdService,
  updateSupportTicketService,
} from "./supportTicket.service";

// Get all support tickets
export const getAllSupportTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllSupportTicketsService();
    res.status(200).json({ tickets });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch tickets" });
  }
};

// Get ticket by ID
export const getSupportTicketById = async (req: Request, res: Response) => {
  const ticketId = parseInt(req.params.ticketId);
  if (isNaN(ticketId)) {
    return res.status(400).json({ message: "Invalid ticket ID" });
  }

  try {
    const ticket = await getSupportTicketByIdService(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching ticket" });
  }
};

// Get tickets by user ID
export const getSupportTicketsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const tickets = await getSupportTicketsByUserIdService(userId);
    res.status(200).json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch user tickets" });
  }
};

// Create ticket
export const createSupportTicket = async (req: Request, res: Response) => {
  const { userId, subject, message } = req.body;

  if (!userId || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const response = await createSupportTicketService({ userId, subject, message });
    res.status(201).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create ticket" });
  }
};

// Update ticket
export const updateSupportTicket = async (req: Request, res: Response) => {
  const ticketId = parseInt(req.params.ticketId);
  if (isNaN(ticketId)) {
    return res.status(400).json({ message: "Invalid ticket ID" });
  }

  const updates = req.body;

  try {
    const message = await updateSupportTicketService(ticketId, updates);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update ticket" });
  }
};

// Delete ticket
export const deleteSupportTicket = async (req: Request, res: Response) => {
  const ticketId = parseInt(req.params.ticketId);
  if (isNaN(ticketId)) {
    return res.status(400).json({ message: "Invalid ticket ID" });
  }

  try {
    const message = await deleteSupportTicketService(ticketId);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete ticket" });
  }
};