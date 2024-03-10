const express=require('express');
const helmet=require('helmet');
const cookieParser = require('cookie-parser');
const app=express();

const connectdb=require('./util/database');
const auth=require('./routes/auth');
const user=require('./routes/user');
const post=require('./routes/post');




connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use(user);
app.use(post);
app.use(helmet())
app.get('/',(req,res)=>{
    res.status(500).send('home page')
})

app.listen(8080,()=>{
    console.log('server is running 8080');
})