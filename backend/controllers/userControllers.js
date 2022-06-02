const asyncHandler = require('express-async-handler');
const User = require('../models/usermodel');
const generateToken = require('../config/generateToken');

const registerUser = async(req,res) => {
    const {name,email,password,pic}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields.");
    }

    //read about the mongodb query findone
    const userExists = await User.findOne({ email });

    if (userExists){
        res.status(400);
        throw new Error("User already exists .");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });    

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("failed user creation");
    }

}

const authUser = asyncHandler(async (req,res)=> {
    const {email,password}=req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic:user.pic,
            token: generateToken(user._id)
        });
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

module.exports = {registerUser, authUser};