import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  book: {
    type: String,
    unique: [true, "Book already exists!"],
    required: [true, "Book is required!"],
  },

  email: {
    type: String,
    required: [true, "email is required!"],
  },
});

const Book = models.Book || model("Book", BookSchema);

export default Book;
