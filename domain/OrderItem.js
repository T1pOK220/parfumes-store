class OrderItem {
    constructor({ id,perfumeId, quantity, price }) {
        this.id = id;
        this.perfumeId = perfumeId;
        this.quantity = quantity;
    }

    addQuantity(amount) {
        this.quantity += amount;
    }

    substractQuantity(amount) {
        this.quantity -= amount;
    }
}