// images.route.ts
import { Router } from "express";
import {
  getAllImagesController,
  getImageByIdController,
  getImagesByProductIdController,
  createImageController,
  updateImageController,
  deleteImageController
} from "./images.controller";
import { adminAuth } from "../../middleware/authBearer";

const imageRoutes = Router();

// 📥 GET all images
imageRoutes.get("/AllImages", getAllImagesController);

// 📥 GET image by imageId
imageRoutes.get("/Image/:imageId", getImageByIdController);

// 📥 GET images by productId
imageRoutes.get("/ProductImages/:productId", getImagesByProductIdController);

// ➕ POST create new image
imageRoutes.post("/create-Image",adminAuth, createImageController);

// 🔄 PUT update image
imageRoutes.put("/update-Image/:imageId",adminAuth, updateImageController);

// 🗑️ DELETE image
imageRoutes.delete("/delete-Image/:imageId",adminAuth, deleteImageController);

export default imageRoutes;
