
import { eq } from "drizzle-orm";
import {
  adminResponses,
  TInsertAdminResponse,
  TSelectAdminResponse,
} from "../../drizzle/schema";
import db from "../../drizzle/db";

// Create a new admin response
export const createAdminResponseService = async (
  response: TInsertAdminResponse
): Promise<string> => {
  await db.insert(adminResponses).values(response).returning();
  return "Response submitted successfully ✅";
};

// Get all responses by ticket ID
export const getResponsesByTicketIdService = async (
  ticketId: number
): Promise<TSelectAdminResponse[]> => {
  const responses = await db.query.adminResponses.findMany({
    where: eq(adminResponses.ticketId, ticketId),
  });
  return responses;
};

// Get all responses by admin ID
export const getResponsesByAdminIdService = async (
  adminId: number
): Promise<TSelectAdminResponse[]> => {
  const responses = await db.query.adminResponses.findMany({
    where: eq(adminResponses.adminId, adminId),
  });
  return responses;
};

// Update an existing response
export const updateAdminResponseService = async (
  responseId: number,
  newMessage: string
): Promise<string> => {
  await db
    .update(adminResponses)
    .set({ message: newMessage })
    .where(eq(adminResponses.responseId, responseId));
  return "Response updated successfully ✏️";
};

// Delete a response
export const deleteAdminResponseService = async (
  responseId: number
): Promise<string> => {
  await db.delete(adminResponses).where(eq(adminResponses.responseId, responseId));
  return "Response deleted successfully 🗑️";
};
