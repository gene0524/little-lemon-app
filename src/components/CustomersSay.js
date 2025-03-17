import React from 'react';

function CustomersSay() {
  // Testimonial data - in a real app, this would come from an API or database
  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      review: 'The Greek salad was so fresh and authentic! Definitely coming back for more.'
    },
    {
      id: 2,
      name: 'John D.',
      rating: 4,
      review: 'Great atmosphere and even better food. The lemon dessert is to die for!'
    },
    {
      id: 3,
      name: 'Maria L.',
      rating: 5,
      review: 'Best Mediterranean food in Chicago! The service was impeccable.'
    },
    {
      id: 4,
      name: 'Robert K.',
      rating: 4,
      review: 'Authentic flavors that remind me of my trip to Greece. Highly recommended!'
    }
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <section className="testimonials">
      <h3>Testimonials</h3>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="rating">{renderStars(testimonial.rating)}</div>
            <h4>{testimonial.name}</h4>
            <p>{testimonial.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomersSay;