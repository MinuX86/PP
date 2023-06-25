import connectToDB from "@server/database";
import Book from "@server/models/book";
import { getSession } from "next-auth/react";

export const GET = async (req: Request) => {
  try {
    await connectToDB({ dbName: "book" });
    const session = await getSession();
    const { book } = await req.json();

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const bookItem = await Book.find({ book });

    if (!bookItem || bookItem.length === 0) {
      return new Response(JSON.stringify({ message: "Book Not Found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ bookItem }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const { book, email } = await req.json();
    await connectToDB({ dbName: "book" });
    const session = await getSession();

    console.log("i am here ??", book, email, session);

    // if (!session) {
    //   return new Response(JSON.stringify({ message: "Unauthorized" }), {
    //     status: 401,
    //   });
    // }

    try {
      const newBook = new Book({ book, email });
      await newBook.save();

      return new Response(JSON.stringify({ newBook }), { status: 201 });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "Failed to create a new book" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request) => {
  try {
    await connectToDB({ dbName: "book" });
    const session = await getSession();
    const { book, email } = await req.json();

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    try {
      const existingBook = await Book.findOne({ book, email });

      if (!existingBook) {
        return new Response(JSON.stringify({ message: "Book not found" }), {
          status: 404,
        });
      }

      // Update the book with new data
      existingBook.book = book;
      existingBook.email = email;
      await existingBook.save();

      return new Response(
        JSON.stringify({ message: "Successfully updated the book" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: "Error updating book" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    await connectToDB({ dbName: "book" });
    const session = await getSession();
    const { book } = await req.json();

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    try {
      await Book.findOneAndRemove({ book });
      return new Response(
        JSON.stringify({ message: "Book deleted successfully" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: "Error deleting book" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
