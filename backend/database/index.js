import pool from "./database.js";
import Parfumes from "../repository/parfumes.js";
import UserRepository from "../repository/users.js";
export const parfumes = new Parfumes(pool);
export const users = new UserRepository(pool);