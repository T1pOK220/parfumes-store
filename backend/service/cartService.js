import { cart, cartItem, parfumes } from "../database/index.js";
import { createError } from "../utilities/errorResponse.js";
export const getAllFromCart = async (userId) => {
    if (!userId) throw createError("USER_NOT_FOUND", "userId", "невдалось отримати ID",404);
    const cartItems = await cart.getCartByUser(userId);
    if (!cartItems) throw createError("CART_NOT_FOUND", "cart", "Кошик не знайдено");
    return cartItems;
}
export const clearCart = async (userId) => {
      if (!userId) throw createError("USER_NOT_FOUND", "userId", "невдалось отримати ID",404);
    const cartItems = await cart.clearCart(userId);
    if (!cartItems) throw createError("CART_NOT_FOUND", "cart", "Кошика не знайдено", 404);
    return cartItems;
}
export const addToCart = async (userId, parfumeId, quantity) => {
    if (!userId) throw createError("USER_NOT_FOUND", "userId", "невдалось отримати ID",404);
    const basket = await cart.getCartByUser(userId);
    if (!basket) throw createError("NOT_FOUND", "cart", "Невдалось знайти кошик", 404);
    const item = await cartItem.addCartItem(basket.id, parfumeId,quantity);
    if (!item) throw createError("BAD_REQUEST", "itme", "Невдалось додати до кошика", 400);
    return item;
}
export const deleteFromCart = async (userId, cartItemId) => {
    if (!userId) throw createError("USER_NOT_FOUND", "userId", "невдалось отримати ID",404);
    const basket = await cart.getCartByUser(userId);
    if (!basket) throw createError("NOT_FOUND", "cart", "Невдалось знайти кошик", 404);
    const item = await cartItem.deleteFromCartItem(basket.id, cartItemId);
    if (!item) throw createError("BAD_REQUEST", "itme", "Невдалось видалити з кошика", 400);
    return item;
}
export const updateQuantity = async (quantity, userId,cartItemId,parfumeId) => {
    if (!userId) throw createError("USER_NOT_FOUND", "userId", "невдалось отримати ID", 404);
    const parfume = await parfumes.getParfumeById(parfumeId);
    if (parfume.stock < quantity) {
    throw createError(
    409,
    "INSUFFICIENT_STOCK",
    `Недостатньо товару "${parfume.name}" на складі`);
    }
    const basket = await cart.getCartByUser(userId);
    const item = await cartItem.changeItemQuantity(quantity, cartItemId,basket.id);
    if (!item) throw createError("BAD_REQUEST", "itme", "Невдалось змінити кількість", 400);
    return item;
}