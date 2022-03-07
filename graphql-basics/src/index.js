import { createServer } from '@graphql-yoga/node'
import { dbUsers, dbPosts, dbComments } from './fakeDB'

// GraphQL Scalar types: String, Boolean, Numbers (Int, Float), ID
// Non-Scalar types: Arrays, Objects

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
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
    comments(parent, args, ctx, info) {
      return !args.query
        ? dbComments
        : dbComments.filter((comment) =>
            comment.text.toLowerCase().includes(args.query.toLowerCase())
          )
    },
    me() {
      return {
        id: '0010',
        name: 'Beto',
        email: 'beto@example.com',
      }
    },
  },
  // The Post below uses a relational query - Below are non-scalar types (custom types)
  Post: {
    author(parent, args, ctx, info) {
      return dbUsers.find((user) => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return dbComments.filter((comment) => comment.post === parent.id)
    },
  },
  // Same as the Post above. When graphql gets to the posts: [Post!]! field of the User query, it will run the function below.
  // And the same will happen when it gets to comments: [Comment!]! of the User query
  User: {
    posts(parent, args, ctx, info) {
      return dbPosts.filter((post) => post.author === parent.id)
    },
    comments(parent, args, ctx, info) {
      return dbComments.filter((comment) => comment.author === parent.id)
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return dbUsers.find((user) => user.id === parent.author)
    },
    post(parent, args, ctx, info) {
      return dbPosts.find((post) => post.id === parent.post)
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
