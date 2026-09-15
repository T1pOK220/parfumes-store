import pool from "./database.js";
import Parfumes from "../models/parfumes.js";
export const parfumes = new Parfumes(pool);