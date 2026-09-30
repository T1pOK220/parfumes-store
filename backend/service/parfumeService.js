import { parfumes } from "../database/index.js";
import { createError } from "../utilities/errorResponse.js";

export const getAllParfumes = async () => {
  const result = await parfumes.getParfumes();

  return result;
};

export const createParfume = async (data) => {
  const {
    name,
    brand,
    description,
    price,
    volume,
    gender,
    category,
    imageUrl,
    stock,
  } = data;

  if (!name) {
    throw createError("NAME_REQUIRED", "name", "Name is required");
  }

  if (!brand) {
    throw createError("BRAND_REQUIRED", "brand", "Brand is required");
  }

  if (!description) {
    throw createError(
      "DESCRIPTION_REQUIRED",
      "description",
      "Description is required",
    );
  }

  if (price === undefined) {
    throw createError("PRICE_REQUIRED", "price", "Price is required");
  }

  if (volume === undefined) {
    throw createError("VOLUME_REQUIRED", "volume", "Volume is required");
  }

  if (!gender) {
    throw createError("GENDER_REQUIRED", "gender", "Gender is required");
  }

  if (!category) {
    throw createError("CATEGORY_REQUIRED", "category", "Category is required");
  }

  if (!imageUrl) {
    throw createError(
      "IMAGE_URL_REQUIRED",
      "imageUrl",
      "Image URL is required",
    );
  }

  if (stock === undefined) {
    throw createError("STOCK_REQUIRED", "stock", "Stock is required");
  }

  return await parfumes.createParfume({
    name,
    brand,
    description,
    price,
    volume,
    gender,
    category,
    imageUrl,
    stock,
  });
};

export const updateParfume = async (id, data) => {
  const {
    name,
    brand,
    description,
    price,
    volume,
    gender,
    category,
    imageUrl,
    stock,
  } = data;

  if (!name) {
    throw createError("NAME_REQUIRED", "name", "Name is required");
  }

  if (!brand) {
    throw createError("BRAND_REQUIRED", "brand", "Brand is required");
  }

  if (!description) {
    throw createError(
      "DESCRIPTION_REQUIRED",
      "description",
      "Description is required",
    );
  }

  if (price === undefined) {
    throw createError("PRICE_REQUIRED", "price", "Price is required");
  }

  if (volume === undefined) {
    throw createError("VOLUME_REQUIRED", "volume", "Volume is required");
  }

  if (!gender) {
    throw createError("GENDER_REQUIRED", "gender", "Gender is required");
  }

  if (!category) {
    throw createError("CATEGORY_REQUIRED", "category", "Category is required");
  }

  if (!imageUrl) {
    throw createError(
      "IMAGE_URL_REQUIRED",
      "imageUrl",
      "Image URL is required",
    );
  }

  if (stock === undefined) {
    throw createError("STOCK_REQUIRED", "stock", "Stock is required");
  }

  return await parfumes.updateParfume(id, {
    name,
    brand,
    description,
    price,
    volume,
    gender,
    category,
    imageUrl,
    stock,
  });
};

export const deleteParfume = async (id) => {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    throw createError("ID_INVALID", "id", "Id must be a positive integer");
  }

  const parfume = await parfumes.deleteParfume(id);

  if (!parfume) {
    throw createError(
      "PARFUME_NOT_FOUND",
      "id",
      "Parfume not found",
      404,
      "NotFoundError",
    );
  }

  return parfume;
};
