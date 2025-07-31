
import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getProductByTitle,
  createNewProduct,
  updateProduct,
  deleteProduct
} from "./Product.controller";

const productRoutes = Router();

// Get All Products
productRoutes.get('/All-Products', getAllProducts);

// Get Product By Id
productRoutes.get('/Product/:productId', getProductById);

// Create Product
productRoutes.post('/create-Product', createNewProduct);

// Search Product By Title
productRoutes.get('/search-product', getProductByTitle);

// Update Product
productRoutes.put('/update-Product/:productId', updateProduct);

// Delete Product
productRoutes.delete('/delete-Product/:productId', deleteProduct);

export default productRoutes;
