'use strict'

const express = require('express');
const router = express.Router();
const {Users} = require("./models/index")
const bcrypt = require('bcrypt');
const basicMid = require('./middleware/basic');
const bearerMid = require('./middleware/bearer');

router.post('/signup', signUpFunction);
router.post('/signin',basicMid, signInFunction);
router.get('/user',bearerMid,userFunction);


async function signUpFunction(req, res) {
    let { username, password, role } = req.body;
    
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        
        const newUser = await Users.create({
            username: username,
            password: hashedPassword,
            role:role
        })
        res.status(201).json(newUser);
    } catch (error) {
        res.status(403).json(`${error} signup function`)
    }
}

function signInFunction(req,res) {
    res.status(200).json(req.user)    
}

async function userFunction(req,res) {
    res.status(200).json(req.user)
    
}
module.exports = router