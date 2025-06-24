const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String, required: true

    },
    role:
    {
        type: String,
        enum: ['Admin', 'User', 'Moderator'],
        default: 'User'
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    },
    created:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String,
    }
},
{
    timestamps:true
}
);

// Hash password before saving
userSchema.pre('save', async function (next) {

   
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
