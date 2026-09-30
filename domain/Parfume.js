class Parfume {
    constructor({
        id,
        name,
        price,
        brand,
        volume,
        gender,
        category,
        stock
    }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.volume = volume;
        this.gender = gender;
        this.brand = brand;
        this.stock = stock;
        this.category = category;
    }

    changePrice(newPrice) {
        this.price = newPrice;
    }

    changeStock(quantity) {
        this.stockQuantity = quantity;
    }

    isAvailable() {
        return this.stockQuantity > 0;
    }
}
export default Parfume;