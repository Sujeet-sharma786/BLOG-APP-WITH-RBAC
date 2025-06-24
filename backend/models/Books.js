const mongoose = require('mongoose');



const pageSchema = new mongoose.Schema({
   title:{type:String,required:true},
   content:{type:String,required:true},
   
},
)

const BooksSchema = new mongoose.Schema({
    pages:[pageSchema],
    user:{type:mongoose.Schema.Types.ObjectId,required:true}
},
{
    timestamps:true
}
)


const Books = mongoose.model('Books',BooksSchema);

module.exports = Books;