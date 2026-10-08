import { favourites } from "../database/index.js"
import { createError } from "../utilities/errorResponse.js";
export const getAllByUser = async (userId) => {
    const favouriteItems = await favourites.getAllByUser(userId);
    if (!favouriteItems) throw createError("FAVOURITES_ITEMS_NOT_FOUND", "favouriteItems", "незнайдено улюблених для цього користувача", 404);
    return favouriteItems;
}
export const addToFavourite = async (userId, parfumeId) => {
    if (!userId || !parfumeId) throw createError("VALIDATION", "validation", "незнайдено ід",400);
    const item = await favourites.addToFavourite(userId, parfumeId);
    if (!item) throw createError("BAD_REQUEST", "bad request", "Невдалось додати до улюбленого", 400)
    return item;
}
export const deleteFromFavourite = async (userId, parfumeId) => {
    if (!userId || !parfumeId) throw createError("VALIDATION", "validation", "незнайдено ід", 400);
    const item = await favourites.deleteFromFavourite(userId, parfumeId);
    if (!item) throw createError("BAD_REQUEST", "bad request", "Невдалось видалити з улбюленого", 400);
    return item;
}