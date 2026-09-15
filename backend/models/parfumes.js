class Parfumes{
    constructor(db) {
        this.db = db;
        // checkConnection()
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
      async getItems() {
    const result = await this.db.query(
      "SELECT * FROM items"
    );

    return result.rows;
  }
}
export default Parfumes;