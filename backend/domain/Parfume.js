class Parfume {
  constructor({
    id,
    name,
    brand,
    description,
    price,
    volume,
    gender,
    category,
    imageUrl,
    stock,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.price = price;
    this.volume = volume;
    this.gender = gender;
    this.category = category;
    this.imageUrl = imageUrl;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Parfume;
