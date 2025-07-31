import { Router } from "express";
import {
  getAllCarts,
  getCartById,
  getCartsByUserId,
  createCart,
  updateCart,
  deleteCart,
  clearCartByUser
} from "./cart.controller";

const cartRoutes = Router();

// Get all cart items
cartRoutes.get("/all-carts", getAllCarts);

// Get cart by cartId
cartRoutes.get("/cart/:cartId", getCartById);

// Get all cart items for a specific user
cartRoutes.get("/user-cart/:userId", getCartsByUserId);

// Add item to cart
cartRoutes.post("/add-cart", createCart);

// Update a cart item
cartRoutes.put("/update-cart/:cartId", updateCart);

// Delete a cart item
cartRoutes.delete("/delete-cart/:cartId", deleteCart);

// Clear all items from a user's cart
cartRoutes.delete("/clear-user-cart/:userId", clearCartByUser);

export default cartRoutes;
