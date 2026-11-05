export const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.error || "InternalServerError",
    code: error.code || "INTERNAL_SERVER_ERROR",
    details: error.details || [
      {
        field: null,
        message: error.message,
      },
    ],
    requestId:req.rid,
  });
};
