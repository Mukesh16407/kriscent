const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
