import * as cartService from "../../service/cartService.js";
export const getAllFromCartController = async (req, res) => {
    const cartItems = await cartService.getAllFromCart(req.user.id);
    res.status(200).json({ cartItems });
}
export const clearCartController = async (req, res) => {
    const cartItmes = await cartService.clearCart(req.user.id);
    res.status(200).json({ cartItmes });
}
export const addToCartController = async (req, res) => {
    const { parfumeId, quantity } = req.body;
    const userId = req.user.id;
    const item = await cartService.addToCart(userId, parfumeId, quantity);
    res.status(200).json({ item ,message:"Успішно додано в кошик"});
}
export const deleteFromCartController = async (req, res) => {
    const cartItemId = req.params.id;
    const userId = req.user.id;
    const item = await cartService.deleteFromCart(userId, cartItemId);
    res.status(200).json({ item, message: "Видалено успішно" });
}
export const updateQuantityController = async (req, res) => {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    const userId = req.user.id;
    const item = await cartService.updateQuantity(quantity, userId, cartItemId);
    res.status(200).json({ item, message: "Кількість оновлена успішно" });
}