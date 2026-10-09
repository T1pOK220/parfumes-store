import * as orderService from "../../service/orderService.js";
export const createOrderController=async(req,res)=>{
    const order = await orderService.createOrder(req.user.id);
    res.status(201).json({order,message:"Замовлення успішно створено"});
}
export const getOrdersController = async (req,res)=>{
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.status(200).json({orders})
}