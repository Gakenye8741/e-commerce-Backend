
import { Request, Response } from "express";
import {
  getAllCartsService,
  getCartByIdService,
  getCartsByUserIdService,
  createCartService,
  updateCartService,
  deleteCartService,
  clearCartByUserService,
} from "./cart.service";

// Get all cart items
export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const carts = await getAllCartsService();
    res.status(200).json({ carts, message: "All carts fetched successfully ✅" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch carts ❌" });
  }
};

// Get cart item by cartId
export const getCartById = async (req: Request, res: Response) => {
  const cartId = parseInt(req.params.cartId);
  if (isNaN(cartId)) {
    res.status(400).json({ error: "Invalid cart ID" });
    return;
  }

  try {
    const cart = await getCartByIdService(cartId);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch cart item" });
  }
};

// Get cart items by userId
export const getCartsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const carts = await getCartsByUserIdService(userId);
    res.status(200).json(carts);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch user's cart items" });
  }
};

// Add item to cart
export const createCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    res.status(400).json({ error: "All fields are required: userId, productId, quantity" });
    return;
  }

  try {
    const result = await createCartService({ userId, productId, quantity });
    res.status(201).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to add to cart" });
  }
};

// Update cart item
export const updateCart = async (req: Request, res: Response) => {
  const cartId = parseInt(req.params.cartId);
  if (isNaN(cartId)) {
    res.status(400).json({ error: "Invalid cart ID" });
    return;
  }

  const updates = req.body;
  if (!updates || Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No updates provided" });
    return;
  }

  try {
    const result = await updateCartService(cartId, updates);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update cart item" });
  }
};

// Delete cart item
export const deleteCart = async (req: Request, res: Response) => {
  const cartId = parseInt(req.params.cartId);
  if (isNaN(cartId)) {
    res.status(400).json({ error: "Invalid cart ID" });
    return;
  }

  try {
    const result = await deleteCartService(cartId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete cart item" });
  }
};

// Clear cart for a user
export const clearCartByUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const result = await clearCartByUserService(userId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to clear user cart" });
  }
};
