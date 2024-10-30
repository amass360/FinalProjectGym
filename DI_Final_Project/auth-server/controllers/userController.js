const userModel = require('../models/userModels.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    registerUser: async (req,res) => {
        const {password, email} = req.body;
        const userInfo = {password, email}

        try {
            const user = await userModel.createUser(userInfo);
            res.status(201).json({
                message:'User registered successfully',
                user,
            });
        } catch (error) {
            console.log(error);
            if(error.code == 23505){
                return res.status(200).json({message:'Email already exists'})
            }
            res.status(5000).json({message:'internal server error'})
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await userModel.getUserByEmail(email)

            if(!user){
                return res.status(404).json({message: "user not found...."});
            }

            const passwordMatch = await bcrypt.compare(password + "",user.password);

            if(!passwordMatch) {
                return res.status(401).json({message:'Authentication failed'});
            }
            /** generate token */
            const accessToken = jwt.sign(
                {userid:req.userid,email:req.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'60s'}
            )

            /** set token in httpOnly cookie */
            res.cookie('token',accessToken,{
                httpOnly: true,
                maxAge: 60 * 1000
                //maxAge can only receive milliseconds
            })

            res.json({
                message: "Login successfully",
                user: { userid: user.id, email:user.email },
                accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'internal server error'});
        }
    },
    getUsers: async(req,res) => {
        try {
            const users = await userModel.getUsers();
            res.json(users)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'internal server error'});
        }
    },
    verifyAuth: (req,res) => {
        res.sendStatus(200)
    },
    logoutUser: (req,res) => {
        res.clearCookie('token');
        req.cookies.token = null;
        req.headers['x-access-token'] = null
        delete req.cookies.token;
        console.log(req.cookies);
        
        res.sendStatus(200);
    },
};