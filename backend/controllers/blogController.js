const Blogs = require('../models/Blog');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config();


const viewBlogs = async (req, resp) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        resp.status(401).json({ message: "no auth found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded.id
        const existsUserBlog = await Blogs.find({user});
        // console.log(existsUserBlog)
        if (!existsUserBlog) {
            console.log('no user blog present...')
            return resp.status(404).json({ message: "No user blogs exits" });

        }

        resp.status(201).json(existsUserBlog);

        

        
    } catch (err) {
        resp.status(401).json({message:"Invalid token"})
    }


    // const allBlogs = await Blogs.find();
    // resp.json(allBlogs)


}

//set the multer for image upload






const postBlogs = async (req, resp) => {
    const { title, desc } = req.body;
    // const imageUrl = req.file? req.file.path : '';
    console.log('title:', title)
    // console.log('file path: ',imageUrl);
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        resp.status(404).json({ message: "auth not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const dummyUserId = decoded.id;
        console.log('user id: ', dummyUserId);
        const newBlog = await Blogs.create({
            title: title,
            desc: desc,
            image: req.file ? `uploads/${req.file.filename}` : null,
            user: dummyUserId


        })
        if (newBlog) {
            resp.status(200).json({ message: "blog created" })
        }

    } catch (err) {
        resp.status(401).json({ message: "Invalid token" })
    }

}

const getAllBlogs = async (req,resp)=>{
    const blogs = await Blogs.find();
    resp.json(blogs)
}

module.exports = { viewBlogs, postBlogs,getAllBlogs };