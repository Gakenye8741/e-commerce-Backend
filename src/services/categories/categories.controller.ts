
import { Request, Response } from "express";
import {
  getAllCategoriesService,
  getCategoryByIdService,
  getCategoryByNameService,
  searchCategoriesByNameService,
  getCategoryWithSubcategoriesService,
  getAllCategoriesWithSubcategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "./categories.service";

// Get all categories
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json({ categories, message: "All categories fetched successfully ✅" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch categories ❌" });
  }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId);
  if (isNaN(categoryId)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const category = await getCategoryByIdService(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch category ❌" });
  }
};

// Get category by name
export const getCategoryByName = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const category = await getCategoryByNameService(name);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch category ❌" });
  }
};

// Search categories by name
export const searchCategoriesByName = async (req: Request, res: Response) => {
  const search = req.query.search as string;

  if (!search) {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    const results = await searchCategoriesByNameService(search);
    res.status(200).json({ results, message: "Search completed ✅" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to search categories ❌" });
  }
};

// Get category with subcategories
export const getCategoryWithSubcategories = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId);
  if (isNaN(categoryId)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const category = await getCategoryWithSubcategoriesService(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch category and subcategories ❌" });
  }
};

// Get all categories with subcategories
export const getAllCategoriesWithSubcategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesWithSubcategoriesService();
    res.status(200).json({ categories, message: "Categories with subcategories fetched ✅" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch categories ❌" });
  }
};

// Create category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const message = await createCategoryService(req.body);
    res.status(201).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create category ❌" });
  }
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId);
  if (isNaN(categoryId)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  const updates = req.body;
  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No updates provided" });
  }

  try {
    const message = await updateCategoryService(categoryId, updates);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update category ❌" });
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId);
  if (isNaN(categoryId)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const message = await deleteCategoryService(categoryId);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete category ❌" });
  }
};
