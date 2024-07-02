const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require('./model/schema');
const resolvers = require('./model/resolvers');
const connectdb = require('./util/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const chatRoutes = require('./routes/chat');
const messageingRoutes = require('./routes/messageing');

const app = express();

async function startApolloServer() {
  // Connect to the database
  connectdb();

  // Middleware setup
  app.use(express.json());
  app.use(cookieParser());
  app.use(helmet());

  // Route setup
  app.use('/auth', authRoutes);
  app.use('/user', userRoutes);
  app.use('/post', postRoutes);
  app.use('/comment', commentRoutes);
  app.use('/chat', chatRoutes);
  app.use('/message', messageingRoutes);

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  // Home route
  app.get('/', (req, res) => {
    res.status(200).send('Home page for Social Media App');
  });

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Start Apollo Server and catch any errors
startApolloServer().catch(error => console.error(error));
