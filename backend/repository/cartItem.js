class CartItemRepository {
    constructor(db) {
        this.db = db;
    }
    async addCartItem(cartId,parfumeId,quanity=1) {
        const result = this.db.query("INSERT INTO cart_items (cart_id,parume_id,quanity)VALUES($1,$2,$3) RETURNING *", [cartId, parfumeId, quanity]);
        return result ?? null;
    }
    async deleteFromCartItem(cartId, cartItemId) {
        const result = this.db.query(`DELETE FROM cart_items ci USING carts c WHERE ci.cart_id = c.id AND ci.id = $1 AND c.id = $2 RETURNING ci.*`[cartId, cartItemId]);
        return result ?? null;
    }
    async changeItemQuantity(quantity,cartItemId,cartId) {
        const result = await this.db.query(`UPDATE cart_item ci SET quantity = $1 FROM carts c WHERE ci.cart_id = $1 AND ci.id = $3 RETURNING ci.*`, [quantity,cartId, cartItemId]);
    return result.rows[0] ?? null;
    }
}
export default CartItemRepository;