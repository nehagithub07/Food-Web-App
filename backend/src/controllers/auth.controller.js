const userModel = require("./models/user.model");
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require("react");

async function registerUser(req, res) {
    const { fullName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcyrpt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email, 
        password:hashedPassword
    })
    const token = jwt.sign({
        id: user._id, 
    }, "986a185b110e91fec25ae43cd64e6ae1")
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName 
        }
    })
}