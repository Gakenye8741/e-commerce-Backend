import { Router } from "express";
import {
  getAllOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
} from "./orderItems.controller";

const orderItemRoutes = Router();

// Get All Order Items
orderItemRoutes.get("/AllOrderItems", getAllOrderItems);

// Get Order Item by ID
orderItemRoutes.get("/OrderItem/:orderItemId", getOrderItemById);

// Get Order Items by Order ID
orderItemRoutes.get("/OrderItemsByOrder/:orderId", getOrderItemsByOrderId);

// Create Order Item
orderItemRoutes.post("/create-OrderItem", createOrderItem);

// Update Order Item
orderItemRoutes.put("/update-OrderItem/:orderItemId", updateOrderItem);

// Delete Order Item
orderItemRoutes.delete("/delete-OrderItem/:orderItemId", deleteOrderItem);

export default orderItemRoutes;
