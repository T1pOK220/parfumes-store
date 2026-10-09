import { createError } from "../utilities/errorResponse.js";
import { cart, order } from "../database/index.js";
export const createOrder = async(userId)=>{
    if (!userId) throw createError("USER_NOT_FOUND", "userId", "невдалось отримати ID",404);
    const items = await cart.getCartByUser(userId);
    if(items.length===0)throw createError("EMPTY_CART","cart","Пустий кошик",404);
    const orderInfo = await order.CreateOrder(items,userId);
    if(!orderInfo)throw createError("BAD_REQUEST","order","Невдалось створити замовлення");
    await cart.clearCart(userId);
    return orderInfo;
}
export const getOrdersByUser=async(userId)=>{
    if (!userId) throw createError("USER_NOT_FOUND", "userId", "невдалось отримати ID",404);
    const orders = await order.getAllOrdersByUser(userId);
    if(!orders)throw createError("BAD_REQUEST","order","Невдалось отримати замовлення");
    return orders;
}