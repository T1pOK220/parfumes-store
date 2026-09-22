class Parfume {
    constructor({
        id,
        name,
        price,
        brand,
        volume,
        gender,
        fragranceType,
        stockQuantity
    }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.volume = volume;
        this.gender = gender;
        this.brand = brand;
        this.fragranceType = fragranceType;
        this.stockQuantity = stockQuantity;
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