import { users } from "../database/index.js";
import { createError } from "../utilities/errorResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
export const login = async (email, password) => {
    const user = await users.getUserByEmail(email);
    if (!user) { throw createError("USER_NOT_FOUND", "email", "User not found", 404); }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) { throw createError("INVALID_PASSWORD", "password", "Невірний пароль", 401); }
    const token = jwt.sign({ id: user.id, email: user.email, lastName: user.lastName ,firstName: user.firstName,role: user.role}, SECRET_KEY, { expiresIn: "1h" });
    return token;
}
export const register = async (userData) => {
    const { email, password } = userData;
    const existingUser = await users.getUserByEmail(email);
    if (existingUser) { throw createError("USER_ALREADY_EXISTS", "email", "Користувач з цією email адресою вже існує", 409); }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.registerUser({ ...userData, password: hashedPassword });
    return newUser;
}
export const getUserById = async (id) => {
    const user = await users.getUserById(id);
    if (!user) { throw createError("USER_NOT_FOUND", "email", "User not found", 404); }
    return user;
}
export const updateUser = async (id, userData) => {
    const updatedUser = await users.updateUser(id, userData);
    if (!updatedUser) { throw createError("USER_NOT_FOUND", "id", "User not found", 404); }
    const newToken = jwt.sign({ id: updatedUser.id, email: updatedUser.email, lastName: updatedUser.lastName ,firstName: updatedUser.firstName,role: updatedUser.role}, SECRET_KEY, { expiresIn: "1h" });
    return { user: updatedUser, token: newToken };
}
    