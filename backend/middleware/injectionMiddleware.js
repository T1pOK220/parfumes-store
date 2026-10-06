export const injectionMiddleware = async (req, res, next) => { 
    const r = Math.random();
    if (r < 0.15) await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
    if (r > 0.80) {
        const err = Math.random() < 0.5 ? "unavailable" : "unexpected";
        const code = err === "unavailable" ? 503 : 500;
        throw createError(
            err.toUpperCase() + "_ERROR",
            "injection",
            `Injected ${err} error`,
            code,
            err === "unavailable" ? "ServiceUnavailableError" : "InternalServerError",
        );
    }
    next();
}