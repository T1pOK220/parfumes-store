import { z } from "zod";

export const createParfumeSchema = z.object({
    name: z.string().min(3).max(50),
    price: z.number().positive(),
    brand: z.string().max(50),
    volume: z.number().int().positive(),
    gender: z.enum(["male", "female", "unisex"]),
    category: z.string().max(50),
    stock: z.number().int().min(0),
});