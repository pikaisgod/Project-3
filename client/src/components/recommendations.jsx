import React, { useEffect, useState } from 'react';
import axios from 'axios';

const recommendations = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/movies/recommendations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecommendedMovies(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Movies</h2>
      <ul>
        {recommendedMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default recommendations;
