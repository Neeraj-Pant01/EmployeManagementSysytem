import React from "react";
import { Link } from "react-router-dom";
// import "./index.css";

const books = [
  {
    title: "Origin",
    author: "Dan Brown",
    category: "Thriller/Suspense",
    rating: "4.5",
    total: 100,
    available: 42,
    image: "https://avibrantpalette.com/wp-content/uploads/2019/08/BookReview_Origin.png",
  },
];

const popularBooks = [
  {
    title: "Origin",
    author: "Dan Brown",
    category: "Thriller/Mystery",
    image: "https://avibrantpalette.com/wp-content/uploads/2019/08/BookReview_Origin.png",
  },
  {
    title: "The Fury",
    author: "Alex Michaelides",
    category: "Psychological Thriller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTePKt3KrvlzJcNrQMFiGFkc_L2EEIGg2o70Q&s",
  },
  {
    title: "The Maidens",
    author: "Alex Michaelides",
    category: "Psychological Thriller",
    image: "https://hachette.imgix.net/books/9781409181682.jpg?auto=compress&w=440",
  },
  {
    title: "Gerald’s Game",
    author: "Stephen King",
    category: "Horror Game",
    image: "https://m.media-amazon.com/images/I/71R0PRLJi5L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Don’t Turn Around",
    author: "Je...",
    category: "Thriller/Suspense",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1701962690i/197525638.jpg",
  },
  {
    title: "Amazing Facts",
    author: "Je...",
    category: "Educational",
    image: "https://rupapublications.co.in/wp-content/uploads/2016/10/Untitled-36.png",
  },
];

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-darkBg text-textColor font-sans">
      {/* Navbar */}
      <nav className="flex sticky z-[50] top-0 justify-between items-center px-10 py-5 bg-[white] shadow-md">
        <h1 className="text-xl font-bold text-[black]">📖 BookLibrary</h1>
        <div className="space-x-6 font-semibold text-[#0b5c71]">
          <a href="#" className="hover:text-[#169fd5]">Home</a>
          <a href="#" className="hover:text-[#169fd5]">Books</a>
          <a href="#" className="hover:text-[#169fd5]">Contact</a>
          <Link to="/login" clLinkssName="hover:text-[#169fd5]">Login</Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="px-10 py-10">
        {books.map((book, index) => (
          <div key={index} className="flex items-center justify-between gap-10">
            <div className='w-[60%]'>
              <h2 className="text-4xl text-[#097087] font-bold mt-2">{book.title}</h2>
              <p className="text-sm text-[gray] my-2">
                By <span className="text-[goldenrod]">{book.author}</span> | Category: <span className="text-[goldenrod]">{book.category}</span>
              </p>
              <p className="text-sm mt-2 my-3">
                ⭐ {book.rating} | Total books: {book.total} | Available: {book.available}
              </p>
              <p className="text-[black]] mt-4 w-[80%]">
              Origin is a 2017 mystery thriller novel by American author Dan Brown and the fifth installment in his Robert Langdon series, following Inferno. The book was released on October 3, 2017, by Doubleday. The book is predominantly set in Spain and features minor sections in Sharjah and Budapest
              </p>
              <button className="mt-4 bg-[beige] text-black px-4 py-2 rounded">📚 Borrow Book Request</button>
            </div>
            <div className="w-[40%] flex items-center justify-center">
            <img src={book.image} alt={book.title} className="w-52 rounded-lg shadow-md shadow-[#59b9c8]" />
            </div>
          </div>
        ))}
      </div>

      {/* Popular Books */}
      <div className="px-10 py-10">
        <h3 className="text-2xl text-[#097087] font-semibold px-16 mb-4">Popular Books</h3>
        <div className="grid grid-cols-6 gap-4">
          {popularBooks.map((book, index) => (
            <div key={index} className="text-center">
              <img src={book.image} alt={book.title} className="w-24 h-32 object-cover mx-auto rounded-md shadow-md" />
              <p className="text-sm font-semibold mt-2">{book.title}-By {book.author}</p>
              <p className="text-xs text-gray-400">{book.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500">
        © 2025 XYZ Pvt. Ltd. All rights reserved
      </footer>
    </div>
  );
};

export default Homepage;
