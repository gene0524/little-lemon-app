import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <Router>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <Nav />
      <Main id="main-content" />
      <Footer />
    </Router>
  );
}

export default App;