const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    collections: [Collection]
    watchlist: [String]
    toWatchList: [String]
    watchedList: [String]
  }

  type Collection {
    _id: ID!
    userId: ID!
    name: String!
    movies: [String]
    isPublic: Boolean
  }

  type Query {
    getUser(userId: ID!): User
    getCollections(userId: ID!): [Collection]
  }

  type Mutation {
    addUser(username: String!, password: String!): User
    createCollection(userId: ID!, name: String!, movies: [String]): Collection
    editCollection(collectionId: ID!, name: String!, movies: [String]): Collection
    deleteCollection(collectionId: ID!): String
  }
`;

module.exports = typeDefs;
