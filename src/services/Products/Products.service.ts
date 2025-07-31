import { desc, eq, ilike } from "drizzle-orm";
import db from "../../drizzle/db";
import { products, TInsertProduct, TSelectProduct } from "../../drizzle/schema";

// Get all products
export const getAllProductsService = async (): Promise<TSelectProduct[]> => {
  const productList = await db.query.products.findMany({
    orderBy: [desc(products.productId)],
  });
  return productList;
};

// Get product by ID
export const getProductByIdService = async (
  productId: number
): Promise<TSelectProduct | undefined> => {
  const product = await db.query.products.findFirst({
    where: eq(products.productId, productId),
  });
  return product ?? undefined;
};

// Search products by title
export const getProductsByTitleService = async (
  title: string
): Promise<TSelectProduct[]> => {
  const results = await db.query.products.findMany({
    where: ilike(products.title, `%${title}%`),
  });
  return results;
};

// Create a product
export const createProductService = async (
  product: TInsertProduct
): Promise<string> => {
  await db.insert(products).values(product).returning();
  return "Product created successfully 🛒";
};

// Update a product
export const updateProductService = async (
  productId: number,
  product: Partial<TInsertProduct>
): Promise<string> => {
  await db.update(products).set(product).where(eq(products.productId, productId));
  return "Product updated successfully 🔄";
};

// Delete a product
export const deleteProductService = async (
  productId: number
): Promise<string> => {
  await db.delete(products).where(eq(products.productId, productId));
  return "Product deleted successfully 🗑️";
};
