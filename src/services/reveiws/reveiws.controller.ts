import { Request, Response } from "express";
import {
  getAllReviewsService,
  getReviewByIdService,
  getReviewsByProductIdService,
  getReviewsByUserIdService,
  createReviewService,
  updateReviewService,
  deleteReviewService,
} from "./reveiws.service";

// Get all reviews
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await getAllReviewsService();
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found." });
    }
    res.status(200).json({ reviews, message: "All reviews fetched successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Could not fetch reviews." });
  }
};

// Get review by ID
export const getReviewById = async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.reviewId);
  if (isNaN(reviewId)) {
    return res.status(400).json({ error: "Invalid review ID." });
  }

  try {
    const review = await getReviewByIdService(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }
    res.status(200).json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error retrieving review." });
  }
};

// Get reviews by product ID
export const getReviewsByProductId = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid product ID." });
  }

  try {
    const reviews = await getReviewsByProductIdService(productId);
    res.status(200).json({ reviews });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching product reviews." });
  }
};

// Get reviews by user ID
export const getReviewsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  try {
    const reviews = await getReviewsByUserIdService(userId);
    res.status(200).json({ reviews });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error fetching user reviews." });
  }
};

// Create a review
export const createReview = async (req: Request, res: Response) => {
  const { userId, productId, rating, comment } = req.body;

  if (!userId || !productId || !rating) {
    return res.status(400).json({ message: "userId, productId and rating are required." });
  }

  try {
    const result = await createReviewService({ userId, productId, rating, comment });
    res.status(201).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error creating review." });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.reviewId);
  if (isNaN(reviewId)) {
    return res.status(400).json({ error: "Invalid review ID." });
  }

  const updates = req.body;
  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No fields provided for update." });
  }

  try {
    const result = await updateReviewService(reviewId, updates);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error updating review." });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  const reviewId = parseInt(req.params.reviewId);
  if (isNaN(reviewId)) {
    return res.status(400).json({ error: "Invalid review ID." });
  }

  try {
    const result = await deleteReviewService(reviewId);
    res.status(200).json({ message: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error deleting review." });
  }
};
