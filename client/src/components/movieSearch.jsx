import React, { useState } from 'react';
import axios from 'axios';

const movieSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/movies/search?query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } 
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {results.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <button onClick={() => window.location.href = `/movie/${movie.id}`}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default movieSearch;
