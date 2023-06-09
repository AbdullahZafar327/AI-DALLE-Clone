import express from 'express'
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary'
import Post from '../mongoDb/models/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

//get all posts
router.route('/').get(async(req,res)=>{
  try {
    const posts = await Post.find({})

    res.status(200).json({success:true,data:posts})
    
  } catch (error) {
    res.status(500).json({success:false,message:error})
    
  }
})

//create new post
router.route('/').post(async(req,res)=>{

    const {name,prompt,photo} = req.body;

    try {
        const PhotoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name,
            prompt,
            photo:PhotoUrl.url
        })
        
        res.status(200).json({success:true,data:newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
})

export default router;