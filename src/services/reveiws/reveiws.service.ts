
import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { reviews, TInsertReview, TSelectReview } from "../../drizzle/schema";

// Get all reviews
export const getAllReviewsService = async (): Promise<TSelectReview[]> => {
  const reviewList = await db.query.reviews.findMany({
    orderBy: [desc(reviews.reviewId)],
  });
  return reviewList;
};

// Get review by ID
export const getReviewByIdService = async (
  reviewId: number
): Promise<TSelectReview | undefined> => {
  const review = await db.query.reviews.findFirst({
    where: eq(reviews.reviewId, reviewId),
  });
  return review ?? undefined;
};

// Get reviews by Product ID
export const getReviewsByProductIdService = async (
  productId: number
): Promise<TSelectReview[]> => {
  return await db.query.reviews.findMany({
    where: eq(reviews.productId, productId),
    orderBy: [desc(reviews.reviewId)],
  });
};

// Get reviews by User ID
export const getReviewsByUserIdService = async (
  userId: number
): Promise<TSelectReview[]> => {
  return await db.query.reviews.findMany({
    where: eq(reviews.userId, userId),
    orderBy: [desc(reviews.reviewId)],
  });
};

// Create review
export const createReviewService = async (
  review: TInsertReview
): Promise<string> => {
  await db.insert(reviews).values(review).returning();
  return "Review submitted successfully ⭐";
};

// Update review
export const updateReviewService = async (
  reviewId: number,
  updates: Partial<TInsertReview>
): Promise<string> => {
  await db.update(reviews).set(updates).where(eq(reviews.reviewId, reviewId));
  return "Review updated successfully 🔄";
};

// Delete review
export const deleteReviewService = async (
  reviewId: number
): Promise<string> => {
  await db.delete(reviews).where(eq(reviews.reviewId, reviewId));
  return "Review deleted successfully 🗑️";
};
