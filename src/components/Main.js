import React from 'react';
import bruschettaImage from '../assets/bruchetta.jpg';  // Adjust path as needed
import greekSaladImage from '../assets/greek-salad.jpg';  // Adjust path as needed
import lemonDessertImage from '../assets/lemon-dessert.jpg';  // Adjust path as needed
import heroImage from '../assets/plate-food.jpg';  // Adjust path as needed

function Main() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          <button className="reserve-button">Reserve a Table</button>
        </div>
        <img src={heroImage} alt="Restaurant dish" className="hero-image" />
      </section>

      {/* Specials Section */}
      <section className="specials">
        <div className="specials-header">
          <h3 className="specials-title">Weekly specials</h3>
          <button className="online-menu-button">Online Menu</button>
        </div>
        
        <div className="cards-container">
          <div className="card">
            <img src={greekSaladImage} alt="Greek salad" className="card-image" />
            <div className="card-content">
              <div className="card-title">
                <h4>Greek salad</h4>
                <span className="card-price">$12.99</span>
              </div>
              <p className="card-description">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
              <button className="delivery-button">Order a delivery</button>
            </div>
          </div>

          <div className="card">
            <img src={bruschettaImage} alt="Bruschetta" className="card-image" />
            <div className="card-content">
              <div className="card-title">
                <h4>Bruschetta</h4>
                <span className="card-price">$5.99</span>
              </div>
              <p className="card-description">Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
              <button className="delivery-button">Order a delivery</button>
            </div>
          </div>

          <div className="card">
            <img src={lemonDessertImage} alt="Lemon Dessert" className="card-image" />
            <div className="card-content">
              <div className="card-title">
                <h4>Lemon Dessert</h4>
                <span className="card-price">$5.00</span>
              </div>
              <p className="card-description">This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
              <button className="delivery-button">Order a delivery</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h3>Testimonials</h3>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="rating">Rating</div>
            <h4>Name</h4>
            <p>Review text</p>
          </div>
          <div className="testimonial-card">
            <div className="rating">Rating</div>
            <h4>Name</h4>
            <p>Review text</p>
          </div>
          <div className="testimonial-card">
            <div className="rating">Rating</div>
            <h4>Name</h4>
            <p>Review text</p>
          </div>
          <div className="testimonial-card">
            <div className="rating">Rating</div>
            <h4>Name</h4>
            <p>Review text</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
        </div>
        <div className="about-images">
          {/* Placeholder for about images */}
        </div>
      </section>
    </main>
  );
}

export default Main;