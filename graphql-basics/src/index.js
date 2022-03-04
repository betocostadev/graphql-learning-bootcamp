import { createServer } from '@graphql-yoga/node'
import { dbUsers, dbPosts, dbComments } from './fakeDB'

// GraphQL Scalar types: String, Boolean, Numbers (Int, Float), ID
// Non-Scalar types: Arrays, Objects

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
`
// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return dbUsers
      }

      return dbUsers.filter((user) => {
        return (
          user.name.toLowerCase().includes(args.query.toLowerCase()) ||
          user.email.toLowerCase().includes(args.query.toLowerCase())
        )
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return dbPosts
      }

      return dbPosts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        )
      })
    },
    me() {
      return {
        id: '0010',
        name: 'Beto',
        email: 'beto@example.com',
      }
    },
    post() {
      return {
        id: '02110',
        title: 'The post title',
        body: 'This is the post body, can you see it?',
        published: true,
      }
    },
  },
  // Post below to use a relational query
  Post: {
    author(parent, args, ctx, info) {
      return dbUsers.find((user) => user.id === parent.author)
    },
  },
  // Same as the Post above. When graphql gets to the posts: [Post!]! field of the User query, it will run the function below.
  User: {
    posts(parent, args, ctx, info) {
      return dbPosts.filter((post) => post.author === parent.id)
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
