import { Request, Response } from "express";
import {
  getAllOrdersService,
  getOrderByIdService,
  getOrdersByUserIdService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
} from "./orders.service";

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const allOrders = await getAllOrdersService();
    if (allOrders.length === 0) {
      res.status(404).json({ message: "No orders found!" });
    } else {
      res.status(200).json({ allOrders, message: "Orders fetched successfully!" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch orders" });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "Enter a valid Order ID (number)" });
    return;
  }

  try {
    const order = await getOrderByIdService(orderId);
    if (!order) {
      res.status(404).json({ message: "No order found with that ID" });
    } else {
      res.status(200).json({ order });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching order by ID" });
  }
};

// Get orders by User ID
export const getOrdersByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Enter a valid User ID (number)" });
    return;
  }

  try {
    const orders = await getOrdersByUserIdService(userId);
    if (orders.length === 0) {
      res.status(404).json({ message: "No orders found for this user" });
    } else {
      res.status(200).json({ orders });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching orders by User ID" });
  }
};

// ✅ Create new order
export const createNewOrder = async (req: Request, res: Response) => {
  const { userId, totalAmount } = req.body;

  if (!userId || totalAmount === undefined) {
    res.status(400).json({ message: "userId and totalAmount are required fields" });
    return;
  }

  try {
    const order = await createOrderService({ userId, totalAmount });

    res.status(201).json({
      message: "Order created successfully 🧾",
      order, // ✅ Now includes orderId
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error creating order" });
  }
};


// Update order
export const updateOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "Enter a valid Order ID" });
    return;
  }

  const { userId, totalAmount } = req.body;
  const updates: any = {};
  if (userId !== undefined) updates.userId = userId;
  if (totalAmount !== undefined) updates.totalAmount = totalAmount;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const result = await updateOrderService(orderId, updates);
    res.status(200).json({ message: result, updatedFields: updates });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update order" });
  }
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "Enter a valid Order ID" });
    return;
  }

  try {
    const result = await deleteOrderService(orderId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete order" });
  }
};
