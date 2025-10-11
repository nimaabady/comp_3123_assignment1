const express = require('express')
const crypto = require('crypto')
const mongoose = require('mongoose');
const userRouter = express.Router()

const CONN_STRING = "mongodb+srv://nimaabady_2:9B8pXSQ9sJt1ZmX5@cluster0.q3vew1a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    created_at: Date,
    updated_at: Date,
});

const User = mongoose.model("User", userSchema);

//didnt add id as its auto added by mongo
userRouter.post('/signup', (req, res) => {
    const { username, email, password } = req.body
    hashPwd = crypto.createHash('sha1').update(password).digest('hex');
    User.create({username: username, email: email, password: hashPwd})
        .then(user => {
            console.log("User created: ", user.username)
            res.status(201).json({
                "message": "User created successfully.",
                "user_id": user._id
            })
        })
        .catch(err => {
            console.log("Error creating user: ", err)
            res.status(500).json({
                "error": "Failed to sign up user"
            })
        })

})

userRouter.post('/login', (req, res) => {
    const { email, password } = req.body
    hashPwd = crypto.createHash('sha1').update(password).digest('hex');
    User.findOne({email: email, password: hashPwd})
        .then(user => {
            if(user.password == hashPwd) {
                console.log("User logged in: ", user.email)
                res.status(200).json({
                    "message": "Login successful"
                })
            }
        })
        .catch(err => {
            console.log("Couldnt log in user: ", err)
            res.status(500).json({
                "error": "email or password incorrect"
            })
        })

})



module.exports = userRouter