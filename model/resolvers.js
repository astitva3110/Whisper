const User = require('../model/user');
const Post = require('../model/Post');
const resolvers = {
    Query: {
      posts: () => Post.find({}),
      post: (_, { id }) => Post.findById(id),
      users: () => User.find({}),
      user: (_, { id }) => User.findById(id),
    },
    Mutation: {
        createPost: async (_, { name, text }) => {
            try {
              const user = await User.findById(name);
              if (!user) {
                console.log('User not found');
              }
      
              const post = new Post({ name: user, text });
              await post.save();
      
              
              user.posts.push(post);
              await user.save();
      
              return post;
            } catch (err) {
              console.error(err.message);
            }
          },
          createUser: async (_, { name, email, password }) => {
            try {
              const user = new User({ name, email, password });
              await user.save();
              return user;
            } catch (err) {
              console.error(err.message);
            }
          },
        },
      };
      module.exports=resolvers;