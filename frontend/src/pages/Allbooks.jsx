import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import './Allbooks.css';
import { SearchProvider } from '../context/SearchContext'; // Keep SearchProvider if needed by children

const Allbooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllBooks(data);
      } catch (error) {
        console.error("Failed to fetch all books:", error);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div className="all-books-page-container">
      <div className="all-books-content-wrapper">
        <h1 className="all-books-title">All Books</h1>
        <div className="all-books-grid">
          {allBooks.length === 0 ? (
            <p>No books available.</p>
          ) : (
            allBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Allbooks;
