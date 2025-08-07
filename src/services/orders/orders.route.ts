
import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createNewOrder,
  updateOrder,
  deleteOrder
} from "./orders.controller";
import { anyAuthenticatedUser } from "../../middleware/authBearer";

const orderRoutes = Router();

// Get All Orders
orderRoutes.get("/AllOrders", getAllOrders);

// Get Order By ID
orderRoutes.get("/Order/:orderId", getOrderById);

// Get Orders By User ID
orderRoutes.get("/UserOrders/:userId", getOrdersByUserId);

// Create Order
orderRoutes.post("/create-Order", createNewOrder);

// Update Order
orderRoutes.put("/update-Order/:orderId", anyAuthenticatedUser, updateOrder);

// Delete Order
orderRoutes.delete("/delete-Order/:orderId",anyAuthenticatedUser, deleteOrder);

export default orderRoutes;
