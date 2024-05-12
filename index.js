const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const app = express();

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const PORT = process.env.PORT || 3000;

//middleWare

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    data: "hey you hit node api",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
