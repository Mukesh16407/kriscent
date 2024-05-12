const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/usersModal.js'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request - invalid registration data
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

router.post("/register", registerUser);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate and log in a user with the provided credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './models/usersModal.js'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized - invalid credentials
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
router.post("/login", loginUser);

module.exports = router;
