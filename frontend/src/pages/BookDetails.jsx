import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const bookResponse = await fetch(`/api/books/${id}`);
        if (!bookResponse.ok) {
          throw new Error(`HTTP error! status: ${bookResponse.status}`);
        }
        const bookData = await bookResponse.json();
        setBook(bookData);

        // Fetch related books based on category
        if (bookData && bookData.category) {
          const relatedBooksResponse = await fetch(`/api/books/category/${bookData.category}`);
          if (!relatedBooksResponse.ok) {
            throw new Error(`HTTP error! status: ${relatedBooksResponse.status}`);
          }
          let relatedData = await relatedBooksResponse.json();
          
          // Filter out the current book and get 3 random related books
          relatedData = relatedData.filter(b => b._id !== id);
          const shuffled = relatedData.sort(() => 0.5 - Math.random());
          setRelatedBooks(shuffled.slice(0, 3));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="book-details-container">Loading book details...</div>;
  }

  if (error) {
    return <div className="book-details-container">Error: {error}</div>;
  }

  if (!book) {
    return <div className="book-details-container">Book not found.</div>;
  }

  // Dummy owner data - replace with actual data if available in book model
  const owner = {
    name: 'Jane Doe',
    avatar: 'https://via.placeholder.com/40', // Placeholder for avatar
  };

  return (
    <div className="book-details-page-wrapper">
      {/* REMOVED: <Navbar /> */}
      {/* REMOVED: <SearchProvider> */}
      <div className="book-details-container">
        {/* Content of the BookDetails page */}
        <div className="book-details-header">
          <div className="book-cover-large">
            <img src={book.coverImage} alt={book.title} />
          </div>
          <div className="book-info">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">by {book.author}</p>
            <p className="book-category">Category: {book.category}</p>
            <p className="book-condition">Condition: {book.condition}</p>
            <p className="book-price">Price: ${book.price}</p>
            <p className="book-description">{book.description}</p>

            <div className="book-owner-info">
              <img src={owner.avatar} alt="Owner Avatar" className="owner-avatar" />
              <span className="owner-name">Owner: {owner.name}</span>
            </div>

            <div className="book-actions">
              <button
                className="buy-button"
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Buy Now
              </button>
              <button
                className="message-button"
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Message Owner
              </button>
            </div>
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <div className="related-books-section">
            <h2 className="related-books-title">You may also like</h2>
            <div className="related-books-grid">
              {relatedBooks.map(relatedBook => (
                <BookCard key={relatedBook._id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* REMOVED: </SearchProvider> */}
      {/* REMOVED: <Footer /> */}
    </div>
  );
};

export default BookDetails;

