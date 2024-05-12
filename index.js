const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const dbConfig = require("./config/dbConfig");

const swaggerDocument = require("./swagger.json");
const userRoutes = require("./routes/usersRoute");
const bookRoutes = require("./routes/bookRoute");

const logger = require("./middleWares/logger");
const errorHandler = require("./middleWares/errorHandler");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

//middleWare

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

// Error Handling Middleware
app.use(errorHandler);
// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({
    data: "hey you hit node api",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
