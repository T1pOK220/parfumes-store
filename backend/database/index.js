import pool from "./database.js";
import Parfumes from "../repository/parfumes.js";
export const parfumes = new Parfumes(pool);
