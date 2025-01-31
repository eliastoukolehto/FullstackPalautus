const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ' + MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('connection failed: ' + error.message )
  })


const typeDefs = `
  type Author {
    name: String
    born: String
    id: String
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }

  type Token {
  value: String!
  }

  type Query {
    authorCount: Int
    bookCount: Int
    allAuthors: [Author]
    allBooks(author: String, genre: String): [Book]
    me: User
  }

  type Mutation {
    addBook(
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book

    editAuthor(
      name: String
      setBornTo: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => { return context.currentUser },
    allBooks: async (root, args) => {
        const author = await Author.findOne({ name: args.author })
        const filter = {}
        if (args.author){
          if (!author) { 
            throw new GraphQLError('Searching books failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author
              }
            })
          }
            filter.author = author.id
        } if (args.genre) {
          filter.genres = args.genre
        } 
        return await Book.find(filter).populate('author')
        
        }
  },
  Author: {
    bookCount: async (author) => {
        return await Book.find({ author: author.id }).countDocuments()
        //return books.filter((b) => b.author === person.name).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) =>  {
      //this is very ugly but it fixes an annoying bug i had
      currentUser = context.currentUser
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized', {
          extensions: {          
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author1 = await Author.findOne({ name: args.author })
      if (!author1) {
        const author2 = new Author({ name: args.author })
        try {
          await author2.save()
          } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
        try {
          const book = new Book({...args, author: author2 })
          await book.save()
          return book
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
      } else {
        try {
        const book = new Book({...args, author: author1 })
        await book.save()
        return book
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Unauthorized', {
          extensions: {          
            code: 'BAD_USER_INPUT',
          }
        })
      }
      if (!author) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          }
        })
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})

      try {
        return user.save()
      } catch (error) {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'salasana' ) {
        throw new GraphQLError('login failed', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const tokenArgs = {
        username: user.username,
        id: user._id
      }

      encryptedUser = jwt.sign(tokenArgs, process.env.SECRET)
      return { value: encryptedUser }

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser } //couldn't get this to work TODO
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})