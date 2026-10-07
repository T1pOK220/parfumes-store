import { z } from "zod";
export const registerSchema = z.object({
    firstName: z.string().min(5).max(50),
    lastName: z.string().min(5).max(50),
    email: z.email(),
    password: z.string().min(8)
})