import { Request, Response } from "express";
import {
  getAllPaymentsService,
  getPaymentByIdService,
  getPaymentsByUserIdService,
  createPaymentService,
  updatePaymentService,
  deletePaymentService
} from "./payment.service";

// Get all payments
export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await getAllPaymentsService();
    res.status(200).json({ payments });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch payments." });
  }
};

// Get payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
  const paymentId = parseInt(req.params.paymentId);
  if (isNaN(paymentId)) {
    return res.status(400).json({ error: "Invalid payment ID" });
  }

  try {
    const payment = await getPaymentByIdService(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve payment." });
  }
};

// Get payments by user ID
export const getPaymentsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const payments = await getPaymentsByUserIdService(userId);
    res.status(200).json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to retrieve user payments." });
  }
};

// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
  const { userId, amount, method, status, transactionId } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ error: "userId and amount are required." });
  }

  try {
    const message = await createPaymentService({ userId, amount, method, status, transactionId });
    res.status(201).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create payment." });
  }
};

// Update payment
export const updatePayment = async (req: Request, res: Response) => {
  const paymentId = parseInt(req.params.paymentId);
  if (isNaN(paymentId)) {
    return res.status(400).json({ error: "Invalid payment ID" });
  }

  const updates = req.body;
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No fields provided to update." });
  }

  try {
    const message = await updatePaymentService(paymentId, updates);
    res.status(200).json({ message, updatedFields: updates });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update payment." });
  }
};

// Delete payment
export const deletePayment = async (req: Request, res: Response) => {
  const paymentId = parseInt(req.params.paymentId);
  if (isNaN(paymentId)) {
    return res.status(400).json({ error: "Invalid payment ID" });
  }

  try {
    const message = await deletePaymentService(paymentId);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete payment." });
  }
};
