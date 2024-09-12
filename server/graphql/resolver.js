const { getPopularMovies, getMovieById } = require('../services/simklService');
const User = require('../models/user'); // Import User model for watchlist management

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
      return await User.findOne({ username })
      .populate('toWatchList')
      .populate('watchedList')
      .populate('topRatedMovies');;
    },
    // Search for movies
    searchMovies: async (_, { query }) => {
      return await searchMovies(query);
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
    },
    markToWatch: async (_, { userId, movieId }) => {
      const user = await User.findById(userId);
      if (!user.toWatchList.includes(movieId)) {
        user.toWatchList.push(movieId);
      }
      return await user.save();
    },
    // Add a movie to the user's watched list
    markWatched: async (_, { userId, movieId }) => {
      const user = await User.findById(userId);
      if (!user.watchedList.includes(movieId)) {
        user.watchedList.push(movieId);
      }
      return await user.save();
    },
    // Add a movie to the user's top-rated movies
    addTopRatedMovie: async (_, { userId, movieId }) => {
      const user = await User.findById(userId);
      if (!user.topRatedMovies.includes(movieId)) {
        user.topRatedMovies.push(movieId);
      }
      return await user.save();
    },
    getRecommendations: async (_, { userId }) => {
      const user = await User.findById(userId);
      if (user && user.watchlist.length > 0) {
        // Pass the user's watchlist to the recommendation function
        return await getMovieRecommendations(user.watchlist);
      }
      throw new Error('Watchlist is empty or user not found');
    },
     // Create a new movie collection for a user
    createCollection: async (_, { userId, name, movies }) => {
      const collection = new Collection({ userId, name, movies });
      return await collection.save();
    },
    // Add a movie to an existing collection
    addMovieToCollection: async (_, { collectionId, movieId }) => {
      const collection = await Collection.findById(collectionId);
      if (!collection.movies.includes(movieId)) {
        collection.movies.push(movieId);
      }
      return await collection.save();
    },
    // Add review
    addReview: async (_, { userId, movieId, rating, review }) => {
      const existingReview = await Review.findOne({ userId, movieId });
      if (existingReview) {
        existingReview.rating = rating;
        existingReview.review = review;
        return await existingReview.save(); // Update existing review
      } else {
        const newReview = new Review({ userId, movieId, rating, review });
        return await newReview.save(); // Create a new review
      }
    },
    // Delete a review
    deleteReview: async (_, { userId, movieId }) => {
      const deletedReview = await Review.findOneAndDelete({ userId, movieId });
      if (!deletedReview) throw new Error('Review not found');
      return deletedReview;
    }
  }
}
};

module.exports=resolvers;
