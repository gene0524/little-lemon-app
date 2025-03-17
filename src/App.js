import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/about" element={<h1>About Page (Coming Soon)</h1>} />
        <Route path="/menu" element={<h1>Menu Page (Coming Soon)</h1>} />
        <Route path="/order-online" element={<h1>Order Online Page (Coming Soon)</h1>} />
        <Route path="/login" element={<h1>Login Page (Coming Soon)</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;