const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

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

  type Query {
    authorCount: Int
    bookCount: Int
    allAuthors: [Author]
    allBooks(author: String, genre: String): [Book]
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
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
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
    addBook: async (root, args) =>  {
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        try {
          const author = new Author({ name: args.author })
          await author.save()
          } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      try {
      const book = new Book({...args, author: author.id })
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
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      //authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return author
    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})