import { FDB } from "../config/firebase.ts";
import { ref, set, get, update, remove, push } from "firebase/database";

// Define Book Type
interface Book {
  name: string;
  author: string;
  SPN_NO: string;
  quantity: number;
}

export const createBook = async (book: Book) => {
  try {
    const booksRef = ref(FDB, "books"); // Reference to the books collection
    const newBookRef = push(booksRef); // Generate a unique Firebase key

    // Save the book data to Firebase
    await set(newBookRef, book);

    return { success: true, message: "Book added successfully!", bookId: newBookRef.key };
  } catch (error) {
    console.error("Create Book Error:", error);
    throw error;
  }
};

// ** Retrieve All Books (With IDs) **
export const getAllBooks = async () => {
  try {
    const booksRef = ref(FDB, "books");
    const snapshot = await get(booksRef);

    if (snapshot.exists()) {
      const books: Book[] = [];
      snapshot.forEach((childSnapshot) => {
        const book = childSnapshot.val();
        book.id = childSnapshot.key; // Add the auto-generated key as the ID
        books.push(book);
      });
      return books;
    } else {
      console.log("No books found.");
      return [];
    }
  } catch (error) {
    console.error("Get All Books Error:", error);
    throw error;
  }
};

// ** Update a Book **
export const updateBook = async (bookId: string, newData: Partial<Omit<Book, "id">>) => {
  try {
    const bookRef = ref(FDB, `books/${bookId}`);

    await update(bookRef, newData);

    return { success: true, message: "Book updated successfully!", bookId };
  } catch (error) {
    console.error("Update Book Error: ", error);
    throw error;
  }
};

// ** Delete a Book **
export const deleteBook = async (bookId: string) => {
  try {
    const bookRef = ref(FDB, `books/${bookId}`);
    await remove(bookRef);

    return { success: true, message: "Book deleted successfully!" };
  } catch (error) {
    console.error("Delete Book Error: ", error);
    throw error;
  }
};
