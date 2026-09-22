class Order{
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
        this.OrderItems = [];
        this.status = "created";
    }
     addItem(perfume, quantity) {
        this.items.push(
            new OrderItem({
                perfumeId: perfume.id,
                quantity,
                price: perfume.price
            })
        );
    }

    calculateTotal() {
        return this.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }

    cancel() {
        if (this.status === "created") {
            this.status = "cancelled";
        }
    }
}
export default Order;