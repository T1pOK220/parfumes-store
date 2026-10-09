class Order{
    constructor(id, userId,sum) {
        this.id = id;
        this.userId = userId;
        this.OrderItems = [];
        this.status = "created";
        this.sum=sum;
    }
     addItem(perfume, quantity) {
        this.OrderItems.push(
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