import { RequestHandler } from "express";
import {
  getAllImagesService,
  getImagesByProductIdService,
  getImageByIdService,
  createImageService,
  updateImageService,
  deleteImageService,
} from "./images.Service";

// 📥 Get all images
export const getAllImagesController: RequestHandler = async (_req, res) => {
  try {
    const allImages = await getAllImagesService();
    res.status(200).json(allImages);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

// 📥 Get image by ID
export const getImageByIdController: RequestHandler = async (req, res) => {
  const imageId = parseInt(req.params.imageId);
  if (isNaN(imageId)) {
    res.status(400).json({ message: "Invalid image ID" });
    return;
  }

  try {
    const image = await getImageByIdService(imageId);
    if (!image) {
      res.status(404).json({ message: "Image not found" });
      return;
    }
    res.status(200).json(image);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch image", error: error.message });
  }
};

// 📥 Get images by productId
export const getImagesByProductIdController: RequestHandler = async (req, res) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    res.status(400).json({ message: "Invalid product ID" });
    return;
  }

  try {
    const images = await getImagesByProductIdService(productId);
    res.status(200).json(images);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch images for product", error: error.message });
  }
};

// ➕ Create new image
export const createImageController: RequestHandler = async (req, res) => {
  const { productId, url, alt } = req.body;

  if (!productId || !url) {
    res.status(400).json({ message: "Missing required fields: productId and url" });
    return;
  }

  try {
    await createImageService({ productId, url, alt });
    res.status(201).json({ message: "Image created successfully ✅" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to create image", error: error.message });
  }
};

// 🔄 Update image
export const updateImageController: RequestHandler = async (req, res) => {
  const imageId = parseInt(req.params.imageId);
  if (isNaN(imageId)) {
    res.status(400).json({ message: "Invalid image ID" });
    return;
  }

  try {
    await updateImageService(imageId, req.body);
    res.status(200).json({ message: "Image updated successfully 🔄" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update image", error: error.message });
  }
};

// 🗑️ Delete image
export const deleteImageController: RequestHandler = async (req, res) => {
  const imageId = parseInt(req.params.imageId);
  if (isNaN(imageId)) {
    res.status(400).json({ message: "Invalid image ID" });
    return;
  }

  try {
    await deleteImageService(imageId);
    res.status(200).json({ message: "Image deleted successfully ❌" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};
