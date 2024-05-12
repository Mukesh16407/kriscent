const Book = require("../models/bookModel");

exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    return res.send({ success: true, message: "Book added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: books });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};
exports.getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.send({ success: true, data: book });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};
exports.updateBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Book updated successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};
