const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const express = require('express')
const http = require('http')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const cors = require('cors')
const { useServer } = require('graphql-ws/use/ws') //had to remove /lib/ 
const { WebSocketServer } = require('ws')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ' + MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('connection failed: ' + error.message )
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path:'/'
  })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()
  
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
          auth.substring(7), process.env.SECRET
          )
          const currentUser = await User
          .findById(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )
  const PORT = 4000
  httpServer.listen(PORT, () => 
    console.log('Server is running on http://localhost:4000')
  )
}
start()



