import { Router } from "express";
import {
  getAllImages,
  getImageById,
  getImagesByProductId,
  createImage,
  updateImage,
  deleteImage
} from "./images.controller";

const imageRoutes = Router();

// Get All Images
imageRoutes.get("/AllImages", getAllImages);

// Get Image By ID
imageRoutes.get("/Image/:imageId", getImageById);

// Get Images By Product ID
imageRoutes.get("/ProductImages/:productId", getImagesByProductId);

// Create Image
imageRoutes.post("/create-Image", createImage);

// Update Image
imageRoutes.put("/update-Image/:imageId", updateImage);

// Delete Image
imageRoutes.delete("/delete-Image/:imageId", deleteImage);

export default imageRoutes;
