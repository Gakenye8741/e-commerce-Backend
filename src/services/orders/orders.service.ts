import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { orders, TInsertOrder, TSelectOrder } from "../../drizzle/schema";

// Get all orders
export const getAllOrdersService = async (): Promise<TSelectOrder[]> => {
  const orderList = await db.query.orders.findMany({
    orderBy: [desc(orders.orderId)],
  });
  return orderList;
};

// Get order by ID
export const getOrderByIdService = async (
  orderId: number
): Promise<TSelectOrder | undefined> => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.orderId, orderId),
  });
  return order ?? undefined;
};

// Get orders by User ID
export const getOrdersByUserIdService = async (
  userId: number
): Promise<TSelectOrder[]> => {
  const result = await db.query.orders.findMany({
    where: eq(orders.userId, userId),
    orderBy: [desc(orders.orderId)],
  });
  return result;
};

// Create new order
export const createOrderService = async (
  order: TInsertOrder
): Promise<TSelectOrder> => {
  const [createdOrder] = await db.insert(orders).values(order).returning(); // returning full row
  return createdOrder; // ✅ contains orderId, userId, etc.
};


// Update order
export const updateOrderService = async (
  orderId: number,
  updates: Partial<TInsertOrder>
): Promise<string> => {
  await db.update(orders).set(updates).where(eq(orders.orderId, orderId));
  return "Order updated successfully 🔄";
};

// Delete order
export const deleteOrderService = async (
  orderId: number
): Promise<string> => {
  await db.delete(orders).where(eq(orders.orderId, orderId));
  return "Order deleted successfully 🗑️";
};
