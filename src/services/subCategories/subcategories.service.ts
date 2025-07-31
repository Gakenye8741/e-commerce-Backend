
import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import {
  subcategories,
  products,
  images,
  reviews,
  TInsertSubcategory,
  TSelectSubcategory,
} from "../../drizzle/schema";

// Get all subcategories
export const getAllSubcategoriesService = async (): Promise<TSelectSubcategory[]> => {
  return await db.query.subcategories.findMany({
    orderBy: [desc(subcategories.subcategoryId)],
  });
};

// Get subcategory by ID
export const getSubcategoryByIdService = async (
  subcategoryId: number
): Promise<TSelectSubcategory | undefined> => {
  return await db.query.subcategories.findFirst({
    where: eq(subcategories.subcategoryId, subcategoryId),
  });
};

// Create a new subcategory
export const createSubcategoryService = async (
  subcategory: TInsertSubcategory
): Promise<string> => {
  await db.insert(subcategories).values(subcategory).returning();
  return "Subcategory created successfully ✅";
};

// Update a subcategory
export const updateSubcategoryService = async (
  subcategoryId: number,
  updates: Partial<TInsertSubcategory>
): Promise<string> => {
  await db.update(subcategories).set(updates).where(eq(subcategories.subcategoryId, subcategoryId));
  return "Subcategory updated successfully 🔄";
};

// Delete a subcategory
export const deleteSubcategoryService = async (
  subcategoryId: number
): Promise<string> => {
  await db.delete(subcategories).where(eq(subcategories.subcategoryId, subcategoryId));
  return "Subcategory deleted successfully 🗑️";
};

// Get subcategory with its products, each with images and reviews
export const getSubcategoryWithContentService = async (subcategoryId: number) => {
  const subcategory = await db.query.subcategories.findFirst({
    where: eq(subcategories.subcategoryId, subcategoryId),
    with: {
      products: {
        with: {
          images: true,
          reviews: true,
        },
      },
    },
  });

  return subcategory;
};
