// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList'; // Importing the MovieList component
import MovieService from '../services/MovieService'; // Service to fetch movies from Simkl API

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies on component mount
    MovieService.getMovies()
      .then((res) => setMovies(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} /> {/* Display the list of movies */}
    </div>
  );
};

export default Home;
