import React from 'react';
// Import placeholder images - replace with actual restaurant images
import restaurantImage1 from '../assets/restaurant.jpg'; // Adjust path as needed
import restaurantImage2 from '../assets/restaurant-chef.jpg'; // Adjust path as needed

function Chicago() {
  return (
    <section className="about">
      <div className="about-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Little Lemon opened in 1995 by two Italian brothers, Adrian and Mario.
          Despite the city's diversity, the two brothers recognized the lack of Mediterranean cuisine in Chicago,
          and were inspired to bring the flavors of their hometown in Italy to the people of Chicago.
        </p>
        <p>
          The two brothers continue to oversee the Little Lemon restaurant, nearly thirty years later.
          They are committed to sourcing the freshest ingredients and creating unique, delicious dishes for their customers.
        </p>
      </div>
      <div className="about-images">
        <img src={restaurantImage1} alt="Little Lemon restaurant interior" className="about-image" />
        <img src={restaurantImage2} alt="Little Lemon chef" className="about-image chef" />
      </div>
    </section>
  );
}

export default Chicago;