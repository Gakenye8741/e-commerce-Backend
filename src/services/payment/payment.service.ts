
import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { payments, TInsertPayment, TSelectPayment } from "../../drizzle/schema";

// Get all payments
export const getAllPaymentsService = async (): Promise<TSelectPayment[]> => {
  return await db.query.payments.findMany({
    orderBy: [desc(payments.paymentId)],
  });
};

// Get payment by ID
export const getPaymentByIdService = async (
  paymentId: number
): Promise<TSelectPayment | undefined> => {
  return await db.query.payments.findFirst({
    where: eq(payments.paymentId, paymentId),
  });
};

// Get payments by user ID
export const getPaymentsByUserIdService = async (
  userId: number
): Promise<TSelectPayment[]> => {
  return await db.query.payments.findMany({
    where: eq(payments.userId, userId),
    orderBy: [desc(payments.paymentId)],
  });
};

// Create a new payment
export const createPaymentService = async (
  payment: TInsertPayment
): Promise<string> => {
  await db.insert(payments).values(payment).returning();
  return "Payment recorded successfully 💰";
};

// Update payment status or transaction ID
export const updatePaymentService = async (
  paymentId: number,
  updates: Partial<TInsertPayment>
): Promise<string> => {
  await db.update(payments).set(updates).where(eq(payments.paymentId, paymentId));
  return "Payment updated successfully 🔄";
};

// Delete a payment
export const deletePaymentService = async (
  paymentId: number
): Promise<string> => {
  await db.delete(payments).where(eq(payments.paymentId, paymentId));
  return "Payment deleted 🗑️";
};
