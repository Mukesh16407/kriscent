const { body } = require("express-validator");

const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
];

module.exports = { validateBook };
