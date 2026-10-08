class FavouritesRepository {
    constructor(db) {
        this.db = db;
    }

    async getAllByUser(userId) {
        const result = await this.db.query(
            "SELECT * FROM favourites WHERE user_id = $1",
            [userId]
        );
        return result.rows;
    }

    async addToFavourite(userId, parfumeId) {
        const result = await this.db.query(
            `INSERT INTO favourites (user_id, parfume_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, parfume_id) DO NOTHING
             RETURNING *`,
            [userId, parfumeId]
        );
        return result.rows[0] ?? null;
    }

    async deleteFromFavourite(userId,perfumeId) {
        const result = await this.db.query(
            "DELETE FROM favourites WHERE user_id = $1 AND parfume_id = $2 RETURNING *",
            [userId,perfumeId]
        );
        return result.rows[0] ?? null;
    }
}

export default FavouritesRepository;