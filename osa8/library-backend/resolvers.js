const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      authorCount: async () => await Author.collection.countDocuments(),
      bookCount: async () => await Book.collection.countDocuments(),
      allAuthors: async () => await Author.find({}),  //.populate('books'), NEED TO RESET DATABASE FOR THIS
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
          if (!author.books) {return 0}
          else return author.books.length
          //return await Book.find({ author: author.id }).countDocuments()
      }
    },
    Mutation: {
      addBook: async (root, args, context) =>  {
        //this is very very ugly 
        // I have no idea why i have to keep defining author again
        //at least it works

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
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            const author3 = await Author.findOne({ name: args.author })
            author3.books = [book._id]
            author3.save()
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
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          const author4 = await Author.findOne({ name: args.author })
          author4.books = author1.books.concat(book)
          await author4.save()
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers