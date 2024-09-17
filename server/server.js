require('dotenv').config(); // To use environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql'); // For GraphQL
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schemas/schema'); // GraphQL schema
const resolvers = require('./schemas/resolvers'); // GraphQL resolvers
const movieRoutes = require('./routes/movieRoutes'); // API routes for Simkl


const app = express(); // Initialize Express

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });

// API Routes
app.use('/api/moviesRoutes', movieRoutes); // Movie routes for Simkl API integration
app.use('/api/auth', authRoutes);    // Authentication routes (if implemented)

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
  schema, // Import the GraphQL schema
  rootValue: resolvers, // Import the resolvers
  graphiql: true, // Enables GraphiQL tool for testing GraphQL
}));

// Define Port
const PORT = process.env.PORT || 4000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
});