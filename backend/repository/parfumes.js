class Parfumes {
  constructor(db) {
    this.db = db;
  }
  async checkConnection() {
    try {
      await this.db.query("SELECT 1");

      console.log("База даних успішно підключена");
    } catch (error) {
      console.error(error);
      console.log("Помилка підключення");
    }
  }
  async getParfumes() {
    const result = await this.db.query("SELECT * FROM items");

    return result.rows;
  }

  async createParfume(data) {
    const {
      name,
      brand,
      description,
      price,
      volume,
      gender,
      category,
      imageUrl,
      stock,
    } = data;

    const result = await this.db.query(
      `INSERT INTO items
        (name, brand, description, price, volume, gender, category, image_url, stock)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        name,
        brand,
        description,
        price,
        volume,
        gender,
        category,
        imageUrl,
        stock,
      ],
    );

    return result.rows[0];
  }

  async updateParfume(id, data) {
    const {
      name,
      brand,
      description,
      price,
      volume,
      gender,
      category,
      imageUrl,
      stock,
    } = data;

    const result = await this.db.query(
      `UPDATE items
     SET name = $1,
         brand = $2,
         description = $3,
         price = $4,
         volume = $5,
         gender = $6,
         category = $7,
         image_url = $8,
         stock = $9
     WHERE id = $10
     RETURNING *`,
      [
        name,
        brand,
        description,
        price,
        volume,
        gender,
        category,
        imageUrl,
        stock,
        id,
      ],
    );

    return result.rows[0];
  }

  async deleteParfume(id) {
    const result = await this.db.query(
      `DELETE FROM items
     WHERE id = $1
     RETURNING *`,
      [id],
    );

    return result.rows[0];
  }
}
export default Parfumes;
