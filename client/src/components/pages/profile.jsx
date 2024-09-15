// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService'; // Service for authentication
import MovieService from '../services/MovieService'; // Service for fetching user-specific movies

const Profile = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      // Fetch movies in the user's watchlist
      MovieService.getUserMovies(currentUser._id)
        .then((res) => setMovies(res))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!user) return <p>You must be logged in to see this page.</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <h3>Your Watchlist</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
