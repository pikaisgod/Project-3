require('dotenv').config(); // To use environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql'); // For GraphQL
const schema = require('./graphql/schema'); // GraphQL schema
const resolvers = require('./graphql/resolvers'); // GraphQL resolvers
const movieRoutes = require('./routes/movie'); // API routes for Simkl
const authRoutes = require('./routes/auth'); // Authentication routes (if any)

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

// API Routes
app.use('/api/movies', movieRoutes); // Movie routes for Simkl API integration
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
