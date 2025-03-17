import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/plate-food.jpg';  // Adjust path as needed

function CallToAction() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <Link to="/booking" className="reserve-button">Reserve a Table</Link>
      </div>
      <div className="hero-image-container">
        <img src={heroImage} alt="Restaurant dish" className="hero-image" />
      </div>
    </section>
  );
}

export default CallToAction;