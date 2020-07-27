import { GraphQLServer } from 'graphql-yoga'

// Since we are not using a DB here, there is the demo data below
// Demo user data
const users = [
  { id: '1', name: 'Beto', email: 'beto@example.com', age: 34 },
  { id: '2', name: 'Andrew', email: 'ajdrew@example.com', age: 30 },
  { id: '3', name: 'Ox', email: 'oxitona@example.com' },
  { id: '4', name: 'Antonio', email: 'tonho@example.com' },
]

const posts = [
  { id: '43', title: 'Testing graphql', body: 'This is some text', published: true, author: '1' },
  { id: '65', title: 'GraphQL basics', body: 'What about learning some GraphQL?', published: true, author: '1' },
  { id: '83', title: 'Graphql queries', body: 'This is some text', published: false, author: '2' },
  { id: '33', title: 'React now', body: 'This is some text', published: true, author: '3'},
  { id: '35', title: 'React native', body: 'In this post we are going to learn React Native', published: true, author: '2'},
]

const comments = [
  { id: 432, author: '2', post: '43', text: 'Great article'},
  { id: 321, author: '1', post: '65', text: 'Great I liked it a lot'},
  { id: 329, author: '4', post: '33', text: 'Hard for me'},
  { id: 632, author: '1', post: '43', text: 'Where can I found more?'},
  { id: 132, author: '3', post: '65', text: 'This is my comment'},
  { id: 872, author: '4', post: '43', text: 'Great article!2'},
  { id: 872, author: '1', post: '35', text: 'Nice to see an article about React Native'},
]


// Type definitions (schema)
// Where we define all our operations that can be performed in our API
// Using ! after the name of the type definition means it can never return null
// Scalar Types: String, Boolean, Int, Float, ID
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
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
    title: String
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers
// A set of functions
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      console.log(args)
      if (!args.query) {
        return users
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }
      return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },

    me() {
      return {
        id: 'x90210',
        name: 'Beto Costa',
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
    },

    comments(parent, args, ctx, info) {
      return comments
    }
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
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
