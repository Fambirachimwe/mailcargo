import "dotenv/config.js";
import express from 'express';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const router = express.Router();





/**
 * Create User account
 * 
 * login the user , access and authorization keys to the present
 * delete user
 *  
**/

// Create account
router.post('/register', (req, res, next) => {
    const { username, email, password, phoneNumber, address } = req.body

    bcrypt.hash(password, 10, function (err, hash) {  // has the password
        // Store hash in your password DB.

        // console.log(hash)
        new User({
            username: username,
            email: email,
            password: hash,
            phoneNumber: phoneNumber,
            address: address
        }).save()
            .then(data => {
                res.json({
                    message: "User Account Created",
                    user: data
                })
            }).catch(error => {

                if (error.code === 11000) {
                    res.send("Email address provided already in use")
                } else {
                    res.send(error)
                }

            })
    });


});


router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    // find the user in the database 

    User.findOne({ email: email }).then(user => {
        if (user) {
            // console.log(user)

            bcrypt.compare(password, user.password).then(result => {
                // if true send a jwt access and refresh token to the user


                if (result) {

                    const accessToken = jwt.sign({
                        email: email,
                        _id: user._id
                    }, process.env.accessTokenSecret, { expiresIn: '1h' });

                    const refressToken = jwt.sign({
                        email: email,
                        _id: user._id
                    }, process.env.refreshTokenSecret, { expiresIn: '5h' });

                    // return the tokens to the users

                    return res.status(200).json({
                        token: accessToken,
                        refreshToken: refressToken,
                        status: "Logged in"
                    })



                } else {
                    res.status(401).send("Invalid Username or Password")
                }
            });

        } else {
            res.send("Email Provided not found")
        }
    })



})


// refresh the token

router.post('/refresh', (req, res) => {

    // refresh the damn token
    const { refreshToken } = req.body
    // if refresh token exists

    // verify the refresh token first 
    jwt.verify(refreshToken, process.env.refreshTokenSecret, function (err, decoded) {

        // console.log(decoded)
        if (err) {
            res.status(404).send(err)
        }

        if (decoded) {
            const newAccessToken = jwt.sign({
                email: decoded.email,
                _id: decoded._id
            }, process.env.accessTokenSecret, { expiresIn: '1h' });

            const newRefressToken = jwt.sign({
                email: decoded.email,
                _id: decoded._id
            }, process.env.refreshTokenSecret, { expiresIn: '5h' });

            const response = {
                "token": newAccessToken,
                refreshToken: newRefressToken
            }

            res.status(200).json(response);

        } else {
            res.status(404).send('Invalid request')
        }
    });

});


export default router;