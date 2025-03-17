import React from 'react';
import bruschettaImage from '../assets/bruchetta.jpg';
import greekSaladImage from '../assets/greek-salad.jpg';
import lemonDessertImage from '../assets/lemon-dessert.jpg';

function Specials() {
  const specialsData = [
    {
      id: 1,
      title: 'Greek salad',
      price: '$12.99',
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
      image: greekSaladImage,
      alt: 'Greek salad'
    },
    {
      id: 2,
      title: 'Bruschetta',
      price: '$5.99',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
      image: bruschettaImage,
      alt: 'Bruschetta'
    },
    {
      id: 3,
      title: 'Lemon Dessert',
      price: '$5.00',
      description: 'This comes straight from grandma\'s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
      image: lemonDessertImage,
      alt: 'Lemon Dessert'
    }
  ];

  return (
    <section className="specials">
      <div className="specials-header">
        <h3 className="specials-title">Weekly Specials</h3>
        <button className="online-menu-button">Online Menu</button>
      </div>
      
      <div className="cards-container">
        {specialsData.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.alt} className="card-image" />
            <div className="card-content">
              <div className="card-title">
                <h4>{item.title}</h4>
                <span className="card-price">{item.price}</span>
              </div>
              <p className="card-description">{item.description}</p>
              <button className="delivery-button">Order a delivery</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specials;