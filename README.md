# Project-3
A full-stack movie application built using Node.js, React, MongoDB, Express, and GraphQL. This app allows users to browse, search, and manage movies, with a GraphQL API for querying and managing movie data, and a React frontend for an interactive user experience.

# Table of Contents
Features
Technologies
Installation
Usage
API Documentation
Screenshots
Deployment
License

# Features
User authentication (sign up, log in)
Browse and search for movies
Add, edit, and delete movie entries
Favorite and rate movies
Responsive design for desktop and mobile
Secure and efficient GraphQL API for querying and managing movie data

# Technologies
Frontend:
React
CSS/Styled Components
Apollo Client (GraphQL)

# Backend:
Node.js
Express.js
MongoDB with Mongoose (NoSQL database)
GraphQL with express-graphql
JWT Authentication
CORS

# Deployment:
Frontend:Netlify
Backend: Render
Database: MongoDB Atlas

# Installation
Prerequisites
Node.js (v14 or later)
MongoDB (local or Atlas)
npm 

# Backend Setup (Node/Express/MongoDB)
1. Clone the repository:cloning to the github
2. Install server dependencies:npm install
3. Create a .env file in the server directory and add the following environment variables:
env
give the api key in this file
4. Start the server:npm start

# Frontend Setup (React)
1. Navigate to the client directory:
cd ../client

2. Install frontend dependencies:
npm install

3. Start the React development server:
npm start

4. The app should now be running at http://localhost:3000

# Usage
1. Backend
Ensure MongoDB is running (or you're connected to MongoDB Atlas).
The server will run on http://localhost:3000, and GraphQL Playground will be available at http://localhost:3000/graphql.

2. Frontend
The React client will run on http://localhost:3000.
You can interact with the movie API through the frontend UI.

3. API Documentation
The app uses GraphQL API for interacting with movie data. Here's a guide on how to use the API.

4. GraphQL Endpoints
The GraphQL API is available at /graphql. Use GraphQL queries and mutations to interact with the API.

# Sample Queries and Mutations
1. Query Movies
To fetch a list of all movies:
query {
  movies {
    _id
    title
    director
    releaseDate
    genre
    rating
  }
}

2. Query Movie by ID
To fetch a single movie by ID:
query($id: ID!) {
  movie(id: $id) {
    _id
    title
    director
    releaseDate
    genre
    rating
  }
}

3. Add a New Movie
To add a new movie (requires authentication):
mutation {
  addMovie(
    title: "Inception",
    director: "Christopher Nolan",
    releaseDate: "2010-07-16",
    genre: "Science Fiction",
    rating: 8.8
  ) {
    _id
    title
    director
    releaseDate
    genre
    rating
  }
}

4. Update Movie
To update an existing movie:
mutation($id: ID!) {
  updateMovie(
    id: $id,
    title: "Inception Updated"
  ) {
    _id
    title
    director
    releaseDate
    genre
    rating
  }
}

5. Delete Movie
To delete a movie:
mutation($id: ID!) {
  deleteMovie(id: $id) {
    message
  }
}

# Authentication
1. Sign up and log in are handled using JSON Web Tokens (JWT).
2. After logging in, pass the JWT in the Authorization header for authenticated routes:
Authorization: Bearer <your-token>

# Deployment
The app can be deployed using services like Netlify (frontend). 

# Deploying on Netlify (Frontend)
Create an account on Netlify.
Follow the deployment instructions to link your GitHub repo and deploy the React frontend.

# License
This project is licensed under the MIT License.

This README.md covers all the essential aspects of your movie app, including API details for working with GraphQL. Adjust the content to match your actual app's structure and deployment configurations.