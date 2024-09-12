const axios = require('axios');

const SIMKL_API_BASE_URL = 'https://api.simkl.com'; 
const SIMKL_CLIENT_ID = '1fd0377b09c5f76dcc6c47957b0ea21f557736d07c31e645697cd9bddee9d63d'; // Simkl API Client Key

// Fetch popular movies from Simkl API
const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${SIMKL_API_BASE_URL}/movies/popular`, {
      headers: {
        'Content-Type': 'application/json',
        'simkl-api-key': SIMKL_CLIENT_ID,
      },
    });
    return response.data; // Return the list of popular movies
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error('Unable to fetch popular movies');
  }
};

// Fetch a specific movie by its ID
const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${SIMKL_API_BASE_URL}/movies/${movieId}`, {
      headers: {
        'Content-Type': 'application/json',
        'simkl-api-key': SIMKL_CLIENT_ID,
      },
    });
    return response.data; // Return the movie data
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw new Error('Unable to fetch movie');
  }
};

// Fetch movie recommendations based on the user's watchlist
const getMovieRecommendations = async (watchlist) => {
  try {
    const response = await axios.post(`${SIMKL_API_BASE_URL}/movies/recommend`, { watchlist }, {
      headers: {
        'Content-Type': 'application/json',
        'simkl-api-key': SIMKL_CLIENT_ID,
      },
    });
    return response.data; // Return the list of recommended movies
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw new Error('Unable to fetch recommendations');
  }
};

// Search for movies based on a query
const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${SIMKL_API_BASE_URL}/search/movie?q=${query}`, {
      headers: {
        'Content-Type': 'application/json',
        'simkl-api-key': SIMKL_CLIENT_ID,
      },
    });
    return response.data; // Return the search results
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw new Error('Unable to search for movies');
  }
};

module.exports = {
  getPopularMovies,
  getMovieById,
  getMovieRecommendations,
  searchMovies,
};
