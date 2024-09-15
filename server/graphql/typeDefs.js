const typeDefs = `
type User {
_id:ID
firstName: String
lastName: String
email: String
}

type Watchlist{
name: String
}

type toWatchList{
name: String
}

type WatchedList{
name: String
}

type topRatedMovies{
name: String
}

 type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
   updateUser(firstName: String, lastName: String, email: String, password: String): User
   addWatchlist(name: String): Watchlist
   updatetoWatchList(name: String): toWatchList
   updateWatchedList(name: String): WatchedList
   updatetopRatedMovies(name: String): topRatedMovies
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;