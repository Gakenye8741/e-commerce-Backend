import { Router } from "express";
import {
  getAllPayments,
  getPaymentById,
  getPaymentsByUserId,
  createPayment,
  updatePayment,
  deletePayment
} from "./payment.controller";

const paymentRoutes = Router();

// Get all payments
paymentRoutes.get("/all-payments", getAllPayments);

// Get payment by ID
paymentRoutes.get("/payment/:paymentId", getPaymentById);

// Get all payments by user ID
paymentRoutes.get("/user-payments/:userId", getPaymentsByUserId);

// Create a payment
paymentRoutes.post("/create-payment", createPayment);

// Update a payment
paymentRoutes.put("/update-payment/:paymentId", updatePayment);

// Delete a payment
paymentRoutes.delete("/delete-payment/:paymentId", deletePayment);

export default paymentRoutes;
