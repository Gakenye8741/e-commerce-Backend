
import { Router } from "express";
import {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoryWithContent,
} from "./subcategories.controller";

const subcategoryRoutes = Router();

// Get all subcategories
subcategoryRoutes.get("/all-subcategories", getAllSubcategories);

// Get subcategory by ID
subcategoryRoutes.get("/subcategory/:subcategoryId", getSubcategoryById);

// Create a new subcategory
subcategoryRoutes.post("/add-subcategory", createSubcategory);

// Update a subcategory
subcategoryRoutes.put("/update-subcategory/:subcategoryId", updateSubcategory);

// Delete a subcategory
subcategoryRoutes.delete("/delete-subcategory/:subcategoryId", deleteSubcategory);

// Get subcategory with all its content (products, images, reviews)
subcategoryRoutes.get("/subcategory-content/:subcategoryId", getSubcategoryWithContent);

export default subcategoryRoutes;
