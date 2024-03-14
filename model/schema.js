const { gql } = require('apollo-server-express');
const User = require('../model/user');
const Post = require('../model/Post');
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    appName: String
    password: String!
    profile_picture: String
    followers: [User]
    followings: [User]
    posts: [Post]
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: ID!
    name: User!
    text: String!
    createdAt: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createPost(name: ID!, text: String!): Post!
  }
`;module.exports=typeDefs;