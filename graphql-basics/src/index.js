import { createServer } from '@graphql-yoga/node'

// GraphQL Scalar types: String, Boolean, Numbers (Int, Float), ID
// Non-Scalar types: Arrays, objects

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`
// Resolvers
const resolvers = {
  Query: {
    id() {
      return 'aksoe-93203'
    },
    name() {
      return 'Beto Costa'
    },
    age() {
      return 35
    },
    employed() {
      return true
    },
    gpa() {
      return null
    },
  },
}

// Create your server
const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
})

const options = {
  port: 4000, // Default for Yoga is 4000
}

server.start(options, ({ port }) => {
  console.log(`GraphQL Yoga server started on ${process.arch} ${process.platform}.`)
  console.log(`Open the playground at http://localhost:${port}`)
})
