const PORT = process.env.PORT || 8080;
import { app } from "./server.js";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}/health`);
});
