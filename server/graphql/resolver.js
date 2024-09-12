const { getPopularMovies, getMovieById } = require('../services/simklService');
const User = require('../models/User'); // Import User model for watchlist management

const resolvers = {
  Query: {
    // Resolver for fetching popular movies
    getMovies: async () => {
      return await getPopularMovies();
    },
    // Resolver for fetching a movie by ID
    getMovie: async (_, { movieId }) => {
      return await getMovieById(movieId);
    },
    // Resolver for fetching a user by username
    getUser: async (_, { username }) => {
      return await User.findOne({ username }).populate('watchlist');
    }
  },
  Mutation: {
    // Resolver for adding a user
    addUser: async (_, { username, password }) => {
      const user = new User({ username, password });
      return await user.save();
    },
    // Resolver for adding a movie to the user's watchlist
    addMovieToWatchlist: async (_, { userId, movieId }) => {
      const user = await User.findById(userId);
      user.watchlist.push(movieId);
      return await user.save();
    }
  }
};

module.exports = resolvers;
