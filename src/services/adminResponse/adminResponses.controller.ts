import { Request, Response } from "express";
import {
  createAdminResponseService,
  getResponsesByTicketIdService,
  getResponsesByAdminIdService,
  deleteAdminResponseService,
  updateAdminResponseService,
} from "./adminResponses.service";

// Create a new response
export const createAdminResponse = async (req: Request, res: Response) => {
  try {
    const message = await createAdminResponseService(req.body);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Failed to create response ❌" });
  }
};

// Get responses by ticket ID
export const getResponsesByTicketId = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const responses = await getResponsesByTicketIdService(Number(ticketId));
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch responses ❌" });
  }
};

// Get responses by admin ID
export const getResponsesByAdminId = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;
    const responses = await getResponsesByAdminIdService(Number(adminId));
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin responses ❌" });
  }
};

// Update a response
export const updateAdminResponse = async (req: Request, res: Response) => {
  try {
    const { responseId } = req.params;
    const { message } = req.body;
    const result = await updateAdminResponseService(Number(responseId), message);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update response ❌" });
  }
};

// Delete a response
export const deleteAdminResponse = async (req: Request, res: Response) => {
  try {
    const { responseId } = req.params;
    const result = await deleteAdminResponseService(Number(responseId));
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete response ❌" });
  }
};
