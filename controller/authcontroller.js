const express=require('express');
const User=require('../model/user');
const router=express.Router();
const jwt=require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const connectdb=require('../util/database');
const bcrypt=require('bcrypt');
require('dotenv').config();

connectdb()


router.use(fileupload({
    useTempFiles: true
  }));
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });  
///post request for login page
exports.postLogin=async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(user){
    const confirmPassword=await bcrypt.compare(req.body.password,user.password);
    if(confirmPassword){
        const token=jwt.sign({_id:user._id},process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRE})
        res.cookie("token",token)
        res.status(200).json({message:'user is login'})
    }
    else{
        res.status(400).json({message:'password is incorrect'});
    }
    }
    else{
        res.status(404).json({message:'User is not found'});
    }
}


//// post request for logout the user 
exports.postLogout=async(req,res)=>{
    try{
        res.clearCookie(token,{sameSite:"none",secure:true}).status(200).json({message:'user is logout'});
    }
    catch(err){
        console.error(err);
    }
}



///post request for Signup
exports.postSignup=async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hass=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            password:hass,
        })
        await newUser.save();
        res.status(200).json(newUser);
    }
    catch(err){
        console.error(err);
    }
}
exports.profilePhoto=async(req,res)=>{
    const userId=req.params.user_id;
    const imageFile=req.files.image;
    try{
    const user=await User.findById(userId);
    const imageResult = await cloudinary.uploader.upload(imageFile.tempFilePath); 

    user.profile_picture=imageResult.secure_url
    await user.save();
    res.status(200).json({message:"Profile picture is updated"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

