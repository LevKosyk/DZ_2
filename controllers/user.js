const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const errorHandler = require('../utils/errorHandle')
const jwt = require('jsonwebtoken')
module.exports.login  = async (req, res) =>{
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user) {
        const isRulePassw = bcrypt.compareSync(req.body.password, user.password)
        if (condition) {
            const token = jwt.sign({
                email: user.email,
                userId: user.id
            }, keys.jwtKey, {expiresIn: 60*60*2})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else{
            errorHandler(res, 401, 'not found user')
        }
    }
    else{
        errorHandler(res, 404, 'not found user')
    }
}
module.exports.register  = async (req, res) =>{
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    if (!user) {
        const salt = bcrypt.genSaltSync(777)
        const passw = bcrypt.hashSync(req.body.password, salt)
        const newUser = await User.create({email: req.body.email, password: passw});
        try {
            await newUser.save()
            res.status(201).json(newUser)
            
        } catch (e) {
            errorHandler(res, 500, 'error')
        }
    }
    else{
        errorHandler(res, 500, 'error')
    }
}