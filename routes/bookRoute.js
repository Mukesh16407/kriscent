const express = require("express");
const router = express.Router();
const {
  verifyToken,
  authorizeRoles,
} = require("../middleWares/authMiddleWare");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getSingleBook,
} = require("../controllers/bookController");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Test Api
 *     description: Testing an API.
 */

router.get(
  "/",
  verifyToken,
  authorizeRoles(["Admin", "Author", "Reader"]),
  getAllBooks
);
router.get(
  "/book-by-id/:id",
  verifyToken,
  authorizeRoles(["Admin", "Author", "Reader"]),
  getSingleBook
);
router.post("/", verifyToken, authorizeRoles(["Admin", "Author"]), createBook);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(["Admin", "Author"]),
  updateBook
);
router.delete("/:id", verifyToken, authorizeRoles(["Admin"]), deleteBook);

module.exports = router;
