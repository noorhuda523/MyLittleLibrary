import React, { useState } from "react";
import './BookCard.css';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaBookmark, FaShare } from 'react-icons/fa';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(!showQuickView);
  };

  return (
    <div 
      className="book-card" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/books/${book._id}`)}
    >
      <div className="book-card-actions">
        <button 
          className="action-btn favorite-btn" 
          onClick={handleFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart className="favorite-icon" /> : <FaRegHeart />}
        </button>
        <button 
          className="action-btn bookmark-btn"
          title="Bookmark"
        >
          <FaBookmark />
        </button>
        <button 
          className="action-btn share-btn"
          title="Share"
        >
          <FaShare />
        </button>
      </div>

      <div className="book-card-img">
        <img src={book.coverImage} alt={book.title} />
        {isHovered && (
          <div className="quick-view-overlay" onClick={handleQuickView}>
            Quick View
          </div>
        )}
      </div>

      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <div className="book-card-author">{book.author}</div>
        <div className="book-card-category">{book.category}</div>
        {book.price && <div className="book-card-price">Rs. {book.price}</div>}
        
        <div className="book-card-actions-bottom">
          <button className="book-card-btn add-to-cart">
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="book-card-btn quick-view-btn" onClick={handleQuickView}>
            Quick View
          </button>
        </div>
      </div>

      {showQuickView && (
        <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
          <div className="quick-view-content">
            <button className="close-btn" onClick={handleQuickView}>×</button>
            <div className="quick-view-image">
              <img src={book.coverImage} alt={book.title} />
            </div>
            <div className="quick-view-details">
              <h2>{book.title}</h2>
              <p className="author">By {book.author}</p>
              <p className="category">Category: {book.category}</p>
              <p className="price">Price: Rs. {book.price}</p>
              <p className="description">{book.description}</p>
              <div className="quick-view-actions">
                <button className="action-btn primary">Add to Cart</button>
                <button className="action-btn secondary">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;



