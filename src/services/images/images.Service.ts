import { eq, desc } from "drizzle-orm";
import db from "../../drizzle/db";
import {
  images,
  TInsertImage,
  TSelectImage,
  
} from "../../drizzle/schema";

// ✅ Get all images (newest first)
export const getAllImagesService = async (): Promise<TSelectImage[]> => {
  return await db.query.images.findMany({
    orderBy: [desc(images.imageId)],
  });
};

// ✅ Get image by imageId
export const getImageByIdService = async (
  imageId: number
): Promise<TSelectImage | undefined> => {
  return await db.query.images.findFirst({
    where: eq(images.imageId, imageId),
  });
};

// ✅ Get images by productId
export const getImagesByProductIdService = async (
  productId: number
): Promise<TSelectImage[]> => {
  return await db.query.images.findMany({
    where: eq(images.productId, productId),
    orderBy: [desc(images.imageId)],
  });
};

// ✅ Create new image
export const createImageService = async (
  newImage: TInsertImage
): Promise<string> => {
  await db.insert(images).values(newImage).returning();
  return "Image uploaded successfully ✅";
};

// ✅ Update image by imageId
export const updateImageService = async (
  imageId: number,
  updatedFields: Partial<TInsertImage>
): Promise<string> => {
  await db.update(images).set(updatedFields).where(eq(images.imageId, imageId));
  return "Image updated successfully 🔄";
};

// ✅ Delete image by imageId
export const deleteImageService = async (
  imageId: number
): Promise<string> => {
  await db.delete(images).where(eq(images.imageId, imageId));
  return "Image deleted successfully ❌";
};
