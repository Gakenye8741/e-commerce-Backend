
import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  searchCategoriesByName,
  getCategoryWithSubcategories,
  getAllCategoriesWithSubcategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categories.controller";
import { adminAuth, anyAuthenticatedUser } from "../../middleware/authBearer";

const categoryRoutes = Router();

// Get all categories
categoryRoutes.get("/all-categories", getAllCategories);

// Get all categories with subcategories
categoryRoutes.get("/all-categories-with-subcategories", getAllCategoriesWithSubcategories);

// Get category by ID
categoryRoutes.get("/category/:categoryId", getCategoryById);

// Get category by exact name
categoryRoutes.get("/category-name/:name", getCategoryByName);

// Search categories by name (partial match)
categoryRoutes.get("/search-categories", searchCategoriesByName);

// Get single category with its subcategories
categoryRoutes.get("/category-with-subcategories/:categoryId", getCategoryWithSubcategories);

// Create new category
categoryRoutes.post("/add-category",adminAuth, createCategory);

// Update category
categoryRoutes.put("/update-category/:categoryId",adminAuth, updateCategory);

// Delete category
categoryRoutes.delete("/delete-category/:categoryId",adminAuth, deleteCategory);

export default categoryRoutes;
