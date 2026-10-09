class CartRepository {
    constructor(db) {
        this.db = db;
    }
    async getCartByUser(id) {
        const cart = this.db.query("SELECT * FROM carts c LEFT JOIN cart_items ci ON ci.cart_id = c.id LEFT JOIN parfumes p ON p.id = ci.parfume_id WHERE c.user_id = $1;",[id]);
        return cart.rows ?? [];
    }
    async clearCart(id) {
        const cart = this.db.query("DELETE FROM c carts JOIN ci cart_items ON c.id=ci.cart_id WHERE user_id = $1 RETURNING *",[id]);
        return cart.rows ?? [];
    }
}
export default CartRepository;