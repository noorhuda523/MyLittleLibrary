import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BookList from '../components/Booklist';
import { FaArrowUp } from 'react-icons/fa';
import './Home.css';

function Home() {
  return (
    <div>
      <Hero />
      <BookList />
    </div>
  );
}
export default Home;