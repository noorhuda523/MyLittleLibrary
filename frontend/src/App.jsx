import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryBook from './pages/CategoryBook';
import Allbooks from './pages/AllBooks';
import BookDetails from './pages/BookDetails';
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import MyBooks from "./pages/MyBooks";
import RentBooks from "./pages/RentBooks";
import SwapBooks from "./pages/SwapBooks";
import SaleBooks from "./pages/SaleBooks";
import RegisterLibrary from "./pages/RegisterLibrary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";

// Placeholder components for demonstration
// const Books = () => <div style={{padding: '100px', textAlign: 'center'}}>Books Page</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <SearchProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navbar is rendered here, outside of Routes, but within SearchProvider */}
            <Navbar hideAuthButtons={true} />
            <div style={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Allbooks />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-books" element={<MyBooks />} />
                <Route path="/rent-books" element={<RentBooks />} />
                <Route path="/swap-books" element={<SwapBooks />} />
                <Route path="/sale-books" element={<SaleBooks />} />
                <Route path="/books/:category" element={<CategoryBook />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/bookdetails-test" element={<BookDetails id="testid123" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Route without Navbar and Footer - specific and placed at the end */}
                <Route path="/register-library" element={<RegisterLibrary />} />
              </Routes>
            </div>
            {/* Footer is rendered here, outside of Routes, but within SearchProvider */}
            <Footer />
          </div>
        </SearchProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
