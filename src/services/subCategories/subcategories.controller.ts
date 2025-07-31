import { Request, Response } from "express";
import {
  getAllSubcategoriesService,
  getSubcategoryByIdService,
  createSubcategoryService,
  updateSubcategoryService,
  deleteSubcategoryService,
  getSubcategoryWithContentService,
} from "./subcategories.service";

// Get all subcategories
export const getAllSubcategories = async (req: Request, res: Response) => {
  try {
    const subcategories = await getAllSubcategoriesService();
    res.status(200).json({ subcategories, message: "All subcategories fetched successfully ✅" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch subcategories ❌" });
  }
};

// Get subcategory by ID
export const getSubcategoryById = async (req: Request, res: Response) => {
  const subcategoryId = parseInt(req.params.subcategoryId);
  if (isNaN(subcategoryId)) {
    res.status(400).json({ error: "Invalid subcategory ID" });
    return;
  }

  try {
    const subcategory = await getSubcategoryByIdService(subcategoryId);
    if (!subcategory) {
      res.status(404).json({ message: "Subcategory not found" });
    } else {
      res.status(200).json(subcategory);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch subcategory" });
  }
};

// Create new subcategory
export const createSubcategory = async (req: Request, res: Response) => {
  const { name, categoryId } = req.body;
  if (!name || !categoryId) {
    res.status(400).json({ error: "Both name and categoryId are required" });
    return;
  }

  try {
    const result = await createSubcategoryService({ name, categoryId });
    res.status(201).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create subcategory" });
  }
};

// Update subcategory
export const updateSubcategory = async (req: Request, res: Response) => {
  const subcategoryId = parseInt(req.params.subcategoryId);
  if (isNaN(subcategoryId)) {
    res.status(400).json({ error: "Invalid subcategory ID" });
    return;
  }

  const updates = req.body;
  if (!updates || Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No updates provided" });
    return;
  }

  try {
    const result = await updateSubcategoryService(subcategoryId, updates);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update subcategory" });
  }
};

// Delete subcategory
export const deleteSubcategory = async (req: Request, res: Response) => {
  const subcategoryId = parseInt(req.params.subcategoryId);
  if (isNaN(subcategoryId)) {
    res.status(400).json({ error: "Invalid subcategory ID" });
    return;
  }

  try {
    const result = await deleteSubcategoryService(subcategoryId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete subcategory" });
  }
};

// Get subcategory with products, images, and reviews
export const getSubcategoryWithContent = async (req: Request, res: Response) => {
  const subcategoryId = parseInt(req.params.subcategoryId);
  if (isNaN(subcategoryId)) {
    res.status(400).json({ error: "Invalid subcategory ID" });
    return;
  }

  try {
    const subcategory = await getSubcategoryWithContentService(subcategoryId);
    if (!subcategory) {
      res.status(404).json({ message: "Subcategory not found" });
    } else {
      res.status(200).json({ subcategory, message: "Subcategory content fetched successfully ✅" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch subcategory content" });
  }
};
