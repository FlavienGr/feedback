require("./db/mongodb");
const express = require("express");
const app = express();

require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const PORT = process.env.PORT || 5000;

authRoutes(app);

app.listen(PORT, () => {
  console.log(`listen on port:${PORT}`);
});
