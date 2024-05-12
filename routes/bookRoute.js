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
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books available.
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: './models/bookModal.js'
 *
 *
 */

router.get(
  "/",
  verifyToken,
  authorizeRoles(["Admin", "Author", "Reader"]),
  getAllBooks
);

/**
 * @swagger
 * /books/book-by-id/{id}:
 *   get:
 *     summary: Get a single book by ID
 *   description: Retrieve details of a single book by its ID.
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: Details of the requested book
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: './models/bookModal.js'
 *
 *
 */
router.get(
  "/book-by-id/:id",
  verifyToken,
  authorizeRoles(["Admin", "Author", "Reader"]),
  getSingleBook
);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book entry.
 *     tags:
 *       - Books
 *
 *     responses:
 *       '201':
 *         description: The created book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/bookModal.js'
 *
 */

router.post("/", verifyToken, authorizeRoles(["Admin", "Author"]), createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Update an existing book.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/bookModal.js'
 *     responses:
 *       '200':
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/bookModal.js'
 */
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(["Admin", "Author"]),
  updateBook
);
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Delete an existing book.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to delete.
 *     responses:
 *       '204':
 *         description: Book deleted successfully
 *       '403':
 *         description: Forbidden - user does not have permission to delete the book
 *       '404':
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 *               required:
 *                 - error
 */
router.delete("/:id", verifyToken, authorizeRoles(["Admin"]), deleteBook);

module.exports = router;
