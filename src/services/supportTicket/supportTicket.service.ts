
import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import {
  supportTickets,
  TInsertSupportTicket,
  TSelectSupportTicket,
} from "../../drizzle/schema";

// Get all support tickets
export const getAllSupportTicketsService = async (): Promise<TSelectSupportTicket[]> => {
  return await db.query.supportTickets.findMany({
    orderBy: [desc(supportTickets.ticketId)],
  });
};

// Get support ticket by ID
export const getSupportTicketByIdService = async (
  ticketId: number
): Promise<TSelectSupportTicket | undefined> => {
  return await db.query.supportTickets.findFirst({
    where: eq(supportTickets.ticketId, ticketId),
  });
};

// Get tickets by User ID
export const getSupportTicketsByUserIdService = async (
  userId: number
): Promise<TSelectSupportTicket[]> => {
  return await db.query.supportTickets.findMany({
    where: eq(supportTickets.userId, userId),
    orderBy: [desc(supportTickets.ticketId)],
  });
};

// Create a new support ticket
export const createSupportTicketService = async (
  ticket: TInsertSupportTicket
): Promise<string> => {
  await db.insert(supportTickets).values(ticket).returning();
  return "Support ticket created 📝";
};

// Update (e.g., mark as resolved)
export const updateSupportTicketService = async (
  ticketId: number,
  updates: Partial<TInsertSupportTicket>
): Promise<string> => {
  await db.update(supportTickets).set(updates).where(eq(supportTickets.ticketId, ticketId));
  return "Support ticket updated 🔄";
};

// Delete a support ticket
export const deleteSupportTicketService = async (
  ticketId: number
): Promise<string> => {
  await db.delete(supportTickets).where(eq(supportTickets.ticketId, ticketId));
  return "Support ticket deleted 🗑️";
};
