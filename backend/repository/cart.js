class CartRepository {
    constructor(db) {
        this.db = db;
    }
    async getCartByUser(id) {
        const cart = await this.db.query("SELECT * FROM carts c LEFT JOIN cart_items ci ON ci.cart_id = c.id LEFT JOIN parfumes p ON p.id = ci.parfume_id WHERE c.user_id = $1;",[id]);
        return cart.rows ?? [];
    }
   async clearCart(id) {
    const cart = await this.db.query(
        `DELETE FROM cart_items ci
         USING carts c
         WHERE ci.cart_id = c.id
         AND c.user_id = $1
         RETURNING ci.*`,
        [id]
    );

    return cart.rows ?? [];
}
}
export default CartRepository;