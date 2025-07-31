
import { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  getReviewsByUserId,
  createReview,
  updateReview,
  deleteReview,
} from "./reveiws.controller";

const reviewRoutes = Router();

// Get all reviews
reviewRoutes.get("/AllReviews", getAllReviews);

// Get review by ID
reviewRoutes.get("/Review/:reviewId", getReviewById);

// Get reviews by product ID
reviewRoutes.get("/ProductReviews/:productId", getReviewsByProductId);

// Get reviews by user ID
reviewRoutes.get("/UserReviews/:userId", getReviewsByUserId);

// Create a new review
reviewRoutes.post("/create-Review", createReview);

// Update a review
reviewRoutes.put("/update-Review/:reviewId", updateReview);

// Delete a review
reviewRoutes.delete("/delete-Review/:reviewId", deleteReview);

export default reviewRoutes;
