import { Request, Response } from "express";
import {
  getAllImagesService,
  getImageByIdService,
  getImagesByProductIdService,
  createImageService,
  updateImageService,
  deleteImageService
} from "./images.Service";

// Get all images
export const getAllImages = async (req: Request, res: Response) => {
  try {
    const allImages = await getAllImagesService();
    if (allImages.length === 0) {
      res.status(404).json({ message: "No images found!" });
    } else {
      res.status(200).json({ allImages, message: "Images fetched successfully!" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch images" });
  }
};

// Get image by ID
export const getImageById = async (req: Request, res: Response) => {
  const imageId = parseInt(req.params.imageId);
  if (isNaN(imageId)) {
    res.status(400).json({ error: "Enter a valid Image ID (number)" });
    return;
  }

  try {
    const image = await getImageByIdService(imageId);
    if (!image) {
      res.status(404).json({ message: "No image found with that ID" });
    } else {
      res.status(200).json({ image });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching image by ID" });
  }
};

// Get images by Product ID
export const getImagesByProductId = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    res.status(400).json({ error: "Enter a valid Product ID" });
    return;
  }

  try {
    const images = await getImagesByProductIdService(productId);
    if (images.length === 0) {
      res.status(404).json({ message: "No images found for this product" });
    } else {
      res.status(200).json({ images });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching images by Product ID" });
  }
};

// Create image
export const createImage = async (req: Request, res: Response) => {
  const { productId, url, alt } = req.body;

  if (!productId || !url) {
    res.status(400).json({ message: "Product ID and URL are required fields" });
    return;
  }

  try {
    const result = await createImageService({ productId, url, alt });
    res.status(201).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error creating image" });
  }
};

// Update image
export const updateImage = async (req: Request, res: Response) => {
  const imageId = parseInt(req.params.imageId);
  if (isNaN(imageId)) {
    res.status(400).json({ error: "Enter a valid Image ID" });
    return;
  }

  const { productId, url, alt } = req.body;
  const updates: any = {};
  if (productId !== undefined) updates.productId = productId;
  if (url !== undefined) updates.url = url;
  if (alt !== undefined) updates.alt = alt;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const result = await updateImageService(imageId, updates);
    res.status(200).json({ message: result, updatedFields: updates });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update image" });
  }
};

// Delete image
export const deleteImage = async (req: Request, res: Response) => {
  const imageId = parseInt(req.params.imageId);
  if (isNaN(imageId)) {
    res.status(400).json({ error: "Enter a valid Image ID" });
    return;
  }

  try {
    const result = await deleteImageService(imageId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete image" });
  }
};
