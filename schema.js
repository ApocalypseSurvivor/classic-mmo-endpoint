const typeDefs = `

  type AuthPayload {
    token: String
  }

  type User {
    id: ID!
    name: String!
    hash: String!
  }

  type Query {
    hello: String
    beans(token: String): String
  }

  type Mutation {
    signIn(username: String!, password: String!): AuthPayload
    signUp(username: String!, password: String!, email: String!): AuthPayload
  }

`;

export default typeDefs;
