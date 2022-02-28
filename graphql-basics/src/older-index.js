import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
// Where we define all our operations that can be performed in our API
// Using ! after the name of the type definition means it can never return null
// Scalar Types: String, Boolean, Int, Float, ID
const typeDefs = `
  type Query {
    greeting(name: String, lastname: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    fullname: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String
    body: String!
    published: Boolean!
  }
`

// Resolvers
// A set of functions
const resolvers = {
  Query: {
    // greeting(parent, args, ctx, info)
    greeting(parent, args, ctx, info) {
      // console.log(args)
      if (args.name && args.lastname) {
        return `Hello, ${args.name} ${args.lastname}`
      } else if (args.lastname) {
        return `Hello, ${args.lastname}`
      } else if (args.name) {
        return `Hello, ${args.name}`
      } else return 'Hello annonymous'
    },

    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0
      }
      return args.numbers.reduce((acc, curr) => {
        return acc + curr
      }, 0)
    },

    grades(parent, args, ctx, info) {
      return [99, 69, 91]
    },

    me() {
      return {
        id: 'x90210',
        fullname: 'Beto Costa',
        email: 'beto@example.com',
        age: 34
      }
    },

    post() {
      return {
        id: '123',
        title: 'Post title',
        body: 'Post body',
        published: true
      }
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
