const express = require("express");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const dbConfig = require("./config/dbConfig");

const authRoutes = require("./routes/authRoute");
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

app.use("/users", authRoutes);
app.use("/books", bookRoutes);

// Error Handling Middleware
app.use(errorHandler);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API",
      description: "API documentation for Book ",

      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "local server",
      },
    ],
  },
  apis: ["./routes*.js", "index.js"], // files containing annotations as above
};

// Swagger UI
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Test Api
 *     description: Testing an API.
 */

app.get("/", (req, res) => {
  res.json({
    data: "hey you hit node api",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
