import { th } from "zod/v4/locales";

class Parfumes {
  constructor(db) {
    this.db = db;
  }
  async getParfumes() {
    const result = await this.db.query("SELECT * FROM parfumes");

    return result.rows ?? null;
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
      `INSERT INTO parfumes
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

    return result.rows[0] ?? null;
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
      `UPDATE parfumes
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
      `DELETE FROM parfumes
     WHERE id = $1
     RETURNING *`,
      [id],
    );

    return result.rows[0];
  }
  async getParfumeById(id) {
    const result = await this.db.query(`SELECT * FROM parfumes WHERE id = $1 RETURNING *`, [id])
    return result.rows[0] ?? null;
  }
  async getUniqueBrand(){
    const getUniqueBrand = await this.db.query(`SELECT DISTINCT brand FROM parfumes WHERE brand IS NOT NULL ORDER BY brand;`);
    return getUniqueBrand.rows[0]??null;
  }
  async getUniqueVolume(){
    const getUniqueVolume = await this.db.query(`SELECT DISTINCT volume FROM parfumes WHERE volume IS NOT NULL ORDER BY volume;`);
    return getUniqueVolume.rows[0]??null;
  }
  async getUniqueGender(){
    const getUniqueBrand = await this.db.query(`SELECT DISTINCT gender FROM parfumes WHERE gender IS NOT NULL ORDER BY gender;`);
    return getUniqueBrand.rows[0]??null;
  }
  async getUniqueCategory(){
    const getUniqueBrand = await this.db.query(`SELECT DISTINCT category FROM parfumes WHERE category IS NOT NULL ORDER BY category;`);
    return getUniqueBrand.rows[0]??null;
  }
  async getMaxPrice(){
    const max = await this.db.query("SELECT MAX(price) AS max_price FROM parfumes");
    return max.rows[0].max_price??null;
  }
    async getMinPrice(){
    const min = await this.db.query("SELECT MIN(price) AS min_price FROM parfumes");
    return min.rows[0].min_price??null;
  }
}
export default Parfumes;
