const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

function shuffleString(length = 8) {
    const chars = '123456789ujjwal';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}



const registerUser = async (req, res) => {
    // const { username, password, role } = req.body;
    const { name, email, password } = req.body;

    console.log(name, email, password)

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).json({ message: "User already registered.." })
        }
        //generating userId
        let userId;
        let isUnique = false;

        while (!isUnique) {
            userId = shuffleString(8); // e.g., "A1b2C3d4"
            const foundUser = await User.findOne({ userId });
            if (!foundUser) {
                isUnique = true;
            }
        }
        console.log('new user id: ',userId)

        const user = await User.create({ userId, name, email, password });
        const token = generateToken(user._id);
        res.set('Authorization', `Bearer ${token}`);
        res.status(201).json({
            id: user._id,
            username: user.username,
            role: user.role,
            token: token,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        res.set('Authorization', `Bearer ${token}`);
        res.json({
            id: user._id,
            username: user.username,
            role: user.role,
            token: token,
            msg: "Logged in successfully"
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
};

const logoutUser = (req, res) => {
    res.set('Authorization', '');
    res.json({ message: 'Logged out successfully' });
};


const updateUser = async(req,resp)=>{
    // console.log('user object:',req.body);
    const name = req.body.user.name;
    const role = req.body.user.role;
    const status = req.body.user.status;
    const Id = req.body.user._id;
    console.log(name,role,status);
    const isUpdate = await User.findOneAndUpdate({_id:Id},{$set:{name,Id,role,status}},{new:true});
    
    if(isUpdate){
        console.log("update sucessfull:",isUpdate);
        return resp.status(200).json({message:"success"});
        
    }   

    resp.status(404).json({message:"User not found"});
}

module.exports = { registerUser, loginUser, getUsers, logoutUser,updateUser };
