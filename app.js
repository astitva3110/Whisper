const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require('./model/schema.js');
const resolvers = require('./model/resolvers.js');
const connectdb = require('./util/database');
const auth = require('./routes/auth');
const user = require('./routes/user');
const post = require('./routes/post');

const app = express();

async function startApolloServer() {
  connectdb();
  app.use(express.json());
  app.use(cookieParser());
  app.use(auth);
  app.use(user);
  app.use(post);
  app.use(helmet());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.status(200).send('home page for Social media app');
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running `);
  });
}

startApolloServer().catch(error => console.error(error));
