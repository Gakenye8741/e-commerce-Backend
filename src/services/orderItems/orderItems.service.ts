
import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { orderItems, TInsertOrderItem, TSelectOrderItem } from "../../drizzle/schema";

// Get all order items
export const getAllOrderItemsService = async (): Promise<TSelectOrderItem[]> => {
  const itemList = await db.query.orderItems.findMany({
    orderBy: [desc(orderItems.orderItemId)],
  });
  return itemList;
};

// Get order item by ID
export const getOrderItemByIdService = async (
  orderItemId: number
): Promise<TSelectOrderItem | undefined> => {
  const item = await db.query.orderItems.findFirst({
    where: eq(orderItems.orderItemId, orderItemId),
  });
  return item ?? undefined;
};

// Get order items by Order ID
export const getOrderItemsByOrderIdService = async (
  orderId: number
): Promise<TSelectOrderItem[]> => {
  const result = await db.query.orderItems.findMany({
    where: eq(orderItems.orderId, orderId),
    orderBy: [desc(orderItems.orderItemId)],
  });
  return result;
};

// Create order item
export const createOrderItemService = async (
  item: TInsertOrderItem
): Promise<string> => {
  await db.insert(orderItems).values(item).returning();
  return "Order item created successfully 📦";
};

// Update order item
export const updateOrderItemService = async (
  orderItemId: number,
  updates: Partial<TInsertOrderItem>
): Promise<string> => {
  await db
    .update(orderItems)
    .set(updates)
    .where(eq(orderItems.orderItemId, orderItemId));
  return "Order item updated successfully 🔄";
};

// Delete order item
export const deleteOrderItemService = async (
  orderItemId: number
): Promise<string> => {
  await db.delete(orderItems).where(eq(orderItems.orderItemId, orderItemId));
  return "Order item deleted successfully 🗑️";
};
