const Books = require('../models/Books');
const jwt = require('jsonwebtoken');

const bookStore = async (req, resp) => {
    const pages = req.body.pages;
    console.log('page details', pages);
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        resp.status(404).json({ message: "auth not found" });
    }
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded.id;
        const newBook = new Books({
            pages: pages,
            user: user
        })

        await newBook.save();
        console.log('newbook status', newBook);
        if (newBook) {
            resp.status(200).json({ message: "book published successfully" });
        }

    } catch (err) {

        resp.status(500).json('server error');
    }
}

const listBooks = async (req, resp) => {
    try {
        const books = await Books.find();
        if (books) {
            resp.status(201).json(books);
        }else{
            resp.status(404).json({message:"Data not found"});
        }
    }catch(err){
         resp.status(500).json({message:"server error..."})
    }
    
}


module.exports = { bookStore, listBooks };