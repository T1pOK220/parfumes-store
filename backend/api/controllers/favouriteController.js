import * as favouriteService from "../../service/favouriteService.js"
export const getAllFavouriteController = async (req, res) => {
    const items = await favouriteService.getAllByUser(req.user.id);
    res.status(200).json({items,message:"Отримано успішно"})
} 
export const addToFavouriteController = async (req, res) => {
    const item = await favouriteService.addToFavourite(req.user.id, req.params.id);
    res.status(200).json({ item, message: "Додано в улюблені" });
}
export const deleteFromFavouriteController = async (req, res) => {
    const item = await favouriteService.deleteFromFavourite(req.user.id, req.params.id);
    res.status(200).json({item,message:"Видалено успішно"})
}