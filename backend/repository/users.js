class UserRepository {
    constructor(db){
        this.db = db;
    }
    async registerUser(userData){
        const {firstName, lastName, email, password} = userData;
        const result = await this.db.query(
            `INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [firstName, lastName, email, password]
        );
        return result.rows[0];
    }
    async getUserByEmail(email){
        const result = await this.db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    }
    async getUserById(id){
        const result = await this.db.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    }
    async updateUser(id, userData){
        const {firstName, lastName, email, password} = userData;
        const result = await this.db.query(
        `UPDATE users SET firstName = COALESCE($1, firstName), lastName = COALESCE($2, lastName), email = COALESCE($3, email), password = COALESCE($4, password) WHERE id = $5 RETURNING *`,
            [firstName, lastName, email, password, id]
        );
        return result.rows[0];
    }

}
export default UserRepository;