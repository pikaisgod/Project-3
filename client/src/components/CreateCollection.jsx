// CreateCollection.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateCollection = ({ userId, onCollectionCreated }) => {
  const [name, setName] = useState('');
  const [movies, setMovies] = useState('');

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        '/graphql',
        {
          query: `
            mutation {
              createCollection(userId: "${userId}", name: "${name}", movies: ["${movies.split(',').join('","')}"]) {
                _id
                name
                movies
              }
            }
          `,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName('');
      setMovies('');
      onCollectionCreated(response.data.data.createCollection);
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <form onSubmit={handleCreateCollection}>
      <div>
        <label>Collection Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Movies</label>
        <input type="text" value={movies} onChange={(e) => setMovies(e.target.value)} required />
      </div>

      <button type="submit">Create Collection</button>
    </form>
  );
};

export default CreateCollection;
