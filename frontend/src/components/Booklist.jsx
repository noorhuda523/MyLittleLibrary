import React from "react";
import BookCard from "./BookCard";
import './Booklist.css';

const categories = ['Fiction', 'Educational', ' History', 'Science', 'Other'];

const BookList = ({ books }) => {
  return (
    <div className="booklist-container">
      {categories.map(category => {
        const filteredBooks = books ? books.filter(book => book.category === category) : [];
        return (
        <div key={category} className="category-block">
          <h2 className="category-title">
            {category}
          </h2>
          <div className="category-books-row">
              {filteredBooks.length === 0 ? (
              <div className="no-books">No books in this category.</div>
            ) : (
                filteredBooks.map(book => (
                <BookCard key={book._id} book={book} />
              ))
            )}
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default BookList;
