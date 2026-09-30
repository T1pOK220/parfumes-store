export const createError = (
  code,
  field,
  message,
  status = 400,
  error = "ValidationError",
) => {
  const err = new Error(message);

  err.status = status;
  err.error = error;
  err.code = code;
  err.details = [
    {
      field,
      message,
    },
  ];

  return err;
};
