import { createError } from "../utilities/errorResponse.js";
export const validationMiddleware = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
         const details = result.error.issues.map(i => ({
    field: i.path.join("."),   
    message: i.message,
  }));
        throw createError("VALIDATION","validation","Невірний формат данних",400,details);
    }

    req.body = result.data;
    next();
};