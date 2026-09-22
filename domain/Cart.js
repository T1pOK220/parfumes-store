import CartItem from "./CartItem";
class Cart{
    constructor({ id, userId }) {
        this.id = id;
        this.userId = userId;
        this.items = [];
    }
    addItem(parfume, quantity) {
        this.items.push(
            new CartItem({
                perfumeId: parfume.id,
                quantity
            })
        );
    }
    removeItem(parfumeId) {
        return this.items.filter(parfume => parfume.parfumeId !== parfumeId);
    }
    clear() {
        this.items = [];
    }
}