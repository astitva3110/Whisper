const express=require('express');
const User=require('../model/user');


//get user info

exports.getuser=async(req,res)=>{
    const userId=req.params;
    try{
      const user=await User.findById(userId);
      if(!user){
        res.status(404).json({message:'User is not found'});
      }
      res.status(200).json({message:"User is found "})
    }
    catch(err){
      console.error(err);

    }
}

//code to update the user data

exports.updateUserData=async(req,res)=>{
    const userId=req.params;
    const {update}=req.body;
   try{
   const user =await User.findById(userId);
   if (!user){
    res.status(404).json({message:"user is not matched"});
   }
   Object.assign(user,update);
    await user.save();
    res.status(200).json({message:"data is updated in database"})
   }
   catch(err){
       console.error(err);
   }
} 

//code to follow the user

exports.follow=async(req,res)=>{
   const currentUser=req.params.user_id;
   const {_id}=req.body;
   try{
    if(currentUser===_id){
        res.status(500).json({message:"User can't folllow itself"})
    }
    const user=await User.findById(currentUser);
    const followUser=await User.findById(_id);
    if(!user||!followUser){
        res.status(404).json({message:"User is not  found"});
    }
    if(followUser.following.includes(currentUser)){
        res.status(500).json({message:"user is already follow "})
    }
     followUser.following.push(currentUser);
      user.follower.push(_id);

      await followUser.save();
      await user.save();
    
    res.status(200).json({message:" you followed the other user"})

}
   catch(err){
    console.error(err);
   }
}



//code to unfollow the user

exports.postUnfollow = async (req, res) => {
    const currentUser = req.params.user_id;
    const { _id } = req.body;

    try {
        if (currentUser === _id) {
            return res.status(500).json({ message: "User can't follow itself" });
        }

        const unfollow = await User.findById(currentUser);
        const user = await User.findById(_id);

        if (!user || !unfollow) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.following.includes(currentUser)) {
            return res.status(500).json({ message: "User is not present" });
        }

        user.following.pull(currentUser);
        unfollow.follower.pull(_id);

        await unfollow.save();
        await user.save();

        return res.status(200).json({ message: "user unfollowed the other user" });
    } catch (err) {
        console.error(err);

        return res.status(500).json({ message: "internal server error" });
    }
};



//code for searching of user


exports.getSearch=async(req,res)=>{
    const {query}=req.params;
    try{
        const user=await User.find({name:{$regex:new RegExp(query,'i')}})
        res.status(200).json(user);
    }
    catch(err){
            console.error(err);
            res.status(500).json({message:"internal server error"});
           }
   
}

