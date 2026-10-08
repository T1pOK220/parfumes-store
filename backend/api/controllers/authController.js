import * as authService from "../../service/authService.js";
export const registerController = async (req, res) => {
  const userData = req.body;
  const user = await authService.register(userData);
  res.status(201).json({user: user, message: "Успішно зареєстровано"});
}
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.loginUser(email, password);
  res.status(200).json({ token: token, message: "Успішно увійшли в систему" });
}
export const getUserByIdController = async (req, res) => {
  const userId = req.user.id;
  const user = await authService.getUserById(userId);
  res.status(200).json({ user: user });
}
export const updateUserController = async (req, res) => {
    const userId = req.user.id;
    const userData = req.body;
    const updatedUser = await authService.updateUser(userId, userData);
    res.status(200).json({ user: updatedUser,message:"Дані успішно оновлено" });
}