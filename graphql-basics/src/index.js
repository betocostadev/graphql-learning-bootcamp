import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
// Where we define all our operations that can be performed in our API
// Using ! after the name of the type definition means it can never return null
// Scalar Types: String, Boolean, Int, Float, ID
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    score: Float
  }
`

// Resolvers
// A set of functions
const resolvers = {
  Query: {
    id() {
      return 'xpto10'
    },
    name() {
      return 'Beto'
    },
    age() {
      return 34
    },
    employed() {
      return true
    },
    score() {
      return null
    }
  }
}

// GraphQL Server
const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})

const options = {
  port: 4000 // Default for Yoga is 4000
}

server.start(options, ({ port }) => {
  console.log(`GraphQL Yoga server started on ${process.arch} ${process.platform}.`)
  console.log(`Open the playground at http://localhost:${port}`)
})
