// Since we are not using a DB here, there is the demo data below
// Demo user data
const users = [
  { id: '1', name: 'Beto', email: 'beto@example.com', age: 36 },
  { id: '2', name: 'Andrew', email: 'ajdrew@example.com', age: 31 },
  { id: '3', name: 'Ox', email: 'oxitona@example.com', age: 36 },
  { id: '4', name: 'Carolina', email: 'carol@pucc.com', age: 30 },
  { id: '5', name: 'Antonio', email: 'tonho@example.com', age: 40 },
]

const posts = [
  { id: '43', title: 'Testing graphql', body: 'This is some text', published: true, author: '1' },
  {
    id: '65',
    title: 'GraphQL basics',
    body: 'What about learning some GraphQL?',
    published: true,
    author: '1',
  },
  { id: '83', title: 'Graphql queries', body: 'This is some text', published: false, author: '2' },
  { id: '33', title: 'React now', body: 'This is some text', published: true, author: '3' },
  {
    id: '35',
    title: 'React native',
    body: 'In this post we are going to learn React Native',
    published: true,
    author: '2',
  },
  {
    id: '30',
    title: 'Leave my job?',
    body: 'In this post Ill tell why I believe I should quit my job.',
    published: true,
    author: '4',
  },
]

const comments = [
  { id: 432, author: '2', post: '43', text: 'Great article' },
  { id: 321, author: '1', post: '65', text: 'Great I liked it a lot' },
  { id: 329, author: '4', post: '33', text: 'Hard for me' },
  { id: 632, author: '1', post: '43', text: 'Where can I found more?' },
  { id: 132, author: '3', post: '65', text: 'This is my comment' },
  { id: 872, author: '4', post: '43', text: 'Great article!2' },
  { id: 872, author: '1', post: '35', text: 'Nice to see an article about React Native' },
]

export { users, posts, comments }
