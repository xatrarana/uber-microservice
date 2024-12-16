const userModel = require('../models/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

module.exports.register = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        const user = new UserService.userRegister(name,email,password);

        if(!user) {
            return res.status(400).json({message:"Error while creating a user!. Please try again later."})
        } 

        res.cookie('token', user)
        return res.status(201).json({message:"User created"})
        
    } catch (error) {
        
        return res.status(500).json({message: "Something went wrong.", error})
    }
}