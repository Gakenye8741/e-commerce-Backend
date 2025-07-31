
import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { images, TInsertImage, TSelectImage } from "../../drizzle/schema";

// Get all images
export const getAllImagesService = async (): Promise<TSelectImage[]> => {
  const imageList = await db.query.images.findMany({
    orderBy: [desc(images.imageId)],
  });
  return imageList;
};

// Get image by ID
export const getImageByIdService = async (
  imageId: number
): Promise<TSelectImage | undefined> => {
  const image = await db.query.images.findFirst({
    where: eq(images.imageId, imageId),
  });
  return image ?? undefined;
};

// Get images by Product ID
export const getImagesByProductIdService = async (
  productId: number
): Promise<TSelectImage[]> => {
  const result = await db.query.images.findMany({
    where: eq(images.productId, productId),
    orderBy: [desc(images.imageId)],
  });
  return result;
};

// Create new image
export const createImageService = async (
  image: TInsertImage
): Promise<string> => {
  await db.insert(images).values(image).returning();
  return "Image created successfully 🖼️";
};

// Update image
export const updateImageService = async (
  imageId: number,
  image: Partial<TInsertImage>
): Promise<string> => {
  await db.update(images).set(image).where(eq(images.imageId, imageId));
  return "Image updated successfully 🔄";
};

// Delete image
export const deleteImageService = async (
  imageId: number
): Promise<string> => {
  await db.delete(images).where(eq(images.imageId, imageId));
  return "Image deleted successfully 🗑️";
};
