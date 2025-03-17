import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <Main />
      <Footer />
    </Router>
  );
}

export default App;