
import { Request, Response } from "express";
import {
  getAllOrderItemsService,
  getOrderItemByIdService,
  getOrderItemsByOrderIdService,
  createOrderItemService,
  updateOrderItemService,
  deleteOrderItemService,
} from "./orderItems.service";

// Get All Order Items
export const getAllOrderItems = async (req: Request, res: Response) => {
  try {
    const items = await getAllOrderItemsService();
    if (items.length === 0) {
      res.status(404).json({ message: "No order items found!" });
    } else {
      res.status(200).json({ items, message: "Order items fetched successfully!" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch order items" });
  }
};

// Get Order Item by ID
export const getOrderItemById = async (req: Request, res: Response) => {
  const orderItemId = parseInt(req.params.orderItemId);
  if (isNaN(orderItemId)) {
    res.status(400).json({ error: "Enter a valid Order Item ID (number)" });
    return;
  }

  try {
    const item = await getOrderItemByIdService(orderItemId);
    if (!item) {
      res.status(404).json({ message: "Order item not found!" });
    } else {
      res.status(200).json({ item });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching order item by ID" });
  }
};

// Get Order Items by Order ID
export const getOrderItemsByOrderId = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    res.status(400).json({ error: "Enter a valid Order ID (number)" });
    return;
  }

  try {
    const items = await getOrderItemsByOrderIdService(orderId);
    if (items.length === 0) {
      res.status(404).json({ message: "No order items found for this order!" });
    } else {
      res.status(200).json({ items });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching order items" });
  }
};

// Create Order Item
export const createOrderItem = async (req: Request, res: Response) => {
  const { orderId, productId, quantity, price } = req.body;

  if (!orderId || !productId || !quantity || !price) {
    res.status(400).json({ message: "All fields are required!" });
    return;
  }

  try {
    const result = await createOrderItemService({ orderId, productId, quantity, price });
    res.status(201).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create order item" });
  }
};

// Update Order Item
export const updateOrderItem = async (req: Request, res: Response) => {
  const orderItemId = parseInt(req.params.orderItemId);
  if (isNaN(orderItemId)) {
    res.status(400).json({ error: "Enter a valid Order Item ID" });
    return;
  }

  const { orderId, productId, quantity, price } = req.body;
  const updates: any = {};
  if (orderId !== undefined) updates.orderId = orderId;
  if (productId !== undefined) updates.productId = productId;
  if (quantity !== undefined) updates.quantity = quantity;
  if (price !== undefined) updates.price = price;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const result = await updateOrderItemService(orderItemId, updates);
    res.status(200).json({ message: result, updatedFields: updates });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update order item" });
  }
};

// Delete Order Item
export const deleteOrderItem = async (req: Request, res: Response) => {
  const orderItemId = parseInt(req.params.orderItemId);
  if (isNaN(orderItemId)) {
    res.status(400).json({ error: "Enter a valid Order Item ID" });
    return;
  }

  try {
    const result = await deleteOrderItemService(orderItemId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete order item" });
  }
};
