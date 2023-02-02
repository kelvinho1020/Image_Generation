import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

import axios from "axios";
import sharp from "sharp";
import { encode } from "blurhash";



dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.route("/").get(async(req, res) => {
  try {
    console.log("get post");
    const page = req.query.p || 0
    const postsPerPage = req.query.s ? 0 : 10;
    const filterString = req.query.s || "";

    const posts = await Post.find({prompt: {$regex : filterString}}).skip(page * postsPerPage).limit(postsPerPage).sort({_id: -1});

    console.log(posts);

    res.status(200).json({ success: true, data: posts });

  } catch(err) {
    console.log("====== error ======")
    console.log(err);
    res.status(500).json({ success: false, message: err});
  }
});

router.route("/").post(async(req, res) => {
  try {
    const { name, prompt, photo, hash } = req.body;
    console.log("post post")
    const photoUrl = await cloudinary.uploader.upload(photo);
    
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
      hash
    })
    
    res.status(201).json({ success: true, data: newPost });
  } catch(err) {
    console.log("====== error ======")
    console.log(err);
    res.status(500).json({success: false, message: err});
  }
});

export default router;