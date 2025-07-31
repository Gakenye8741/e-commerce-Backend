
import { desc, eq, ilike } from "drizzle-orm";
import db from "../../drizzle/db";
import {
  categories,
  subcategories,
  TInsertCategory,
  TSelectCategory,
  TSelectSubcategory,
} from "../../drizzle/schema";

// Types
export type TCategoryWithSubcategories = TSelectCategory & {
  subcategories: TSelectSubcategory[];
};

// Get all categories
export const getAllCategoriesService = async (): Promise<TSelectCategory[]> => {
  return await db.query.categories.findMany({
    orderBy: [desc(categories.categoryId)],
  });
};

// Get category by ID
export const getCategoryByIdService = async (
  categoryId: number
): Promise<TSelectCategory | undefined> => {
  return await db.query.categories.findFirst({
    where: eq(categories.categoryId, categoryId),
  });
};

// Get category by exact name
export const getCategoryByNameService = async (
  name: string
): Promise<TSelectCategory | undefined> => {
  return await db.query.categories.findFirst({
    where: eq(categories.name, name),
  });
};

// 🔍 Search categories by name (partial match, case-insensitive)
export const searchCategoriesByNameService = async (
  searchTerm: string
): Promise<TSelectCategory[]> => {
  return await db.query.categories.findMany({
    where: ilike(categories.name, `%${searchTerm}%`),
    orderBy: [desc(categories.categoryId)],
  });
};

// Get a single category and its subcategories
export const getCategoryWithSubcategoriesService = async (
  categoryId: number
): Promise<TCategoryWithSubcategories | undefined> => {
  return await db.query.categories.findFirst({
    where: eq(categories.categoryId, categoryId),
    with: {
      subcategories: true,
    },
  });
};

// Get all categories with subcategories
export const getAllCategoriesWithSubcategoriesService = async (): Promise<TCategoryWithSubcategories[]> => {
  return await db.query.categories.findMany({
    with: {
      subcategories: true,
    },
    orderBy: [desc(categories.categoryId)],
  });
};

// Create a new category
export const createCategoryService = async (
  category: TInsertCategory
): Promise<string> => {
  await db.insert(categories).values(category).returning();
  return "Category created 🆕";
};

// Update an existing category
export const updateCategoryService = async (
  categoryId: number,
  updates: Partial<TInsertCategory>
): Promise<string> => {
  await db.update(categories).set(updates).where(eq(categories.categoryId, categoryId));
  return "Category updated 🔄";
};

// Delete a category
export const deleteCategoryService = async (
  categoryId: number
): Promise<string> => {
  await db.delete(categories).where(eq(categories.categoryId, categoryId));
  return "Category deleted 🗑️";
};
