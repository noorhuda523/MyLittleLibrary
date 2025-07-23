import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import './CategoryBook.css';

const CategoryBook = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/books/category/${category}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(`Failed to fetch books for category ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksByCategory();
  }, [category]);

  return (
    <div className="category-page-container">
      <div className="category-content-wrapper">
        <h1 className="category-page-title">Category: {category}</h1>
        <div className="category-page-grid">
          {loading ? (
            <p>Loading books...</p>
          ) : books.length === 0 ? (
            <p>No books found in this category.</p>
          ) : (
            books.map(book => (
              <BookCard key={book._id} book={book} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryBook;
