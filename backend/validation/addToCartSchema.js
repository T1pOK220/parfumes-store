import { z } from "zod";
export const addToCartSchema = z.object({
    parfumeId: z.number().int(),
    quantity: z.number().int()
});