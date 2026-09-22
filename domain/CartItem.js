import Parfume from "./Parfume.js";
class CartItem{
    constructor({ id, cartId, parfumeId, quantity }) {
        this.id = id;
        this.cartId = cartId;
        this.parfumeId = parfumeId;
        this.quantity = quantity;
    }
    addQuantity(amount) {
        this.quantity += amount;
    }
    substractQuantity(amount) {
        this.quantity -= amount;
    }
}
export default CartItem;