import { desc, eq, and } from "drizzle-orm";
import db from "../../drizzle/db";
import { carts, TInsertCart, TSelectCart } from "../../drizzle/schema";

// Get all cart items
export const getAllCartsService = async (): Promise<TSelectCart[]> => {
  const cartList = await db.query.carts.findMany({
    orderBy: [desc(carts.cartId)],
  });
  return cartList;
};

// Get cart item by ID
export const getCartByIdService = async (
  cartId: number
): Promise<TSelectCart | undefined> => {
  const cart = await db.query.carts.findFirst({
    where: eq(carts.cartId, cartId),
  });
  return cart ?? undefined;
};

// Get cart items by User ID
export const getCartsByUserIdService = async (
  userId: number
): Promise<TSelectCart[]> => {
  return await db.query.carts.findMany({
    where: eq(carts.userId, userId),
    orderBy: [desc(carts.cartId)],
  });
};

// Add product to cart
export const createCartService = async (
  cart: TInsertCart
): Promise<string> => {
  await db.insert(carts).values(cart).returning();
  return "Item added to cart 🛒";
};

// Update cart item (e.g., quantity)
export const updateCartService = async (
  cartId: number,
  updates: Partial<TInsertCart>
): Promise<string> => {
  await db.update(carts).set(updates).where(eq(carts.cartId, cartId));
  return "Cart updated successfully 🔄";
};

// Delete cart item
export const deleteCartService = async (
  cartId: number
): Promise<string> => {
  await db.delete(carts).where(eq(carts.cartId, cartId));
  return "Item removed from cart 🗑️";
};

// Delete all cart items by user (e.g., after checkout)
export const clearCartByUserService = async (
  userId: number
): Promise<string> => {
  await db.delete(carts).where(eq(carts.userId, userId));
  return "Cart cleared for user 🧹";
};
