
import { Request, Response } from "express";
import {
  getAllProductsService,
  getProductByIdService,
  getProductsByTitleService,
  createProductService,
  updateProductService,
  deleteProductService
} from "./Products.service";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await getAllProductsService();
    if (allProducts.length === 0) {
      res.status(404).json({ message: "No products found!" });
    } else {
      res.status(200).json({ allProducts, message: "Products fetched successfully!" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch products" });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    res.status(400).json({ error: "Enter a valid Product ID (number)" });
    return;
  }

  try {
    const product = await getProductByIdService(productId);
    if (!product) {
      res.status(404).json({ message: "No product found with that ID" });
    } else {
      res.status(200).json({ product });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching product by ID" });
  }
};

// Search products by title
export const getProductByTitle = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  if (!title) {
    res.status(400).json({ message: "Title query parameter is required" });
    return;
  }

  try {
    const products = await getProductsByTitleService(title);
    if (products.length === 0) {
      res.status(404).json({ message: "No products found with that title" });
    } else {
      res.status(200).json({ products, message: "Products found successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error searching products by title" });
  }
};



// Create new product
export const createNewProduct = async (req: Request, res: Response) => {
  const { title, description, price, stock, subcategoryId } = req.body;

  // Validate required fields
  if (!title || price === undefined || stock === undefined || !subcategoryId) {
    res.status(400).json({ message: "Title, price, stock, and subcategoryId are required fields" });
    return;
  }

  try {
    // Convert values to appropriate types if necessary
    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;
    const parsedStock = typeof stock === "string" ? parseInt(stock) : stock;
    const parsedSubcategoryId = typeof subcategoryId === "string" ? parseInt(subcategoryId) : subcategoryId;

    const result = await createProductService({
      title,
      description,
      price: parsedPrice,
      stock: parsedStock,
      subcategoryId: parsedSubcategoryId,
    });

    res.status(201).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error creating product" });
  }
};


// Update product
export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    res.status(400).json({ error: "Enter a valid Product ID" });
    return;
  }

  const { title, description, price, stock } = req.body;
  const updates: any = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (price !== undefined) updates.price = price;
  if (stock !== undefined) updates.stock = stock;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const result = await updateProductService(productId, updates);
    res.status(200).json({ message: result, updatedFields: updates });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update product" });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    res.status(400).json({ error: "Enter a valid Product ID" });
    return;
  }

  try {
    const result = await deleteProductService(productId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete product" });
  }
};
