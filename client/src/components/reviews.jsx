import React, { useState, useEffect } from 'react';
import axios from 'axios';

const reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${movieId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  const submitReview = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`/api/reviews/${movieId}`, {
        rating,
        review: reviewText,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviewText('');
      setRating(0);
      // Fetch reviews again after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h3>Submit a Review</h3>
      <div>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button onClick={submitReview}>Submit</button>
      </div>

      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id}>
          <p>{review.review}</p>
          <small>Rating: {review.rating}</small>
        </div>
      ))}
    </div>
  );
};

export default reviews;
