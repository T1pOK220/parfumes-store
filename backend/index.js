const PORT = process.env.PORT || 5000;
import { app } from "./server.js";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
