const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const authCheck = require('../middlewares/authCheck');
const jwt = require('jsonwebtoken');
const tokenize = require('../utils/tokenizer');



const login = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (!userExists) {
            return res.status(404).send("User does not exist")
        }
        const passwordMatches = await bcrypt.compare(req.body.password, userExists.password)
        if (!passwordMatches) {
            return res.status(401).send("wrong password or email address")
        }
        
        const expiresInMs = 36000000 * 1  // 10 hr = 36000000 ms
        if (userExists && passwordMatches) {
            const token = tokenize(userExists.username, userExists.email, expiresInMs)
            res.cookie('token', token, { httpOnly: true, maxAge: expiresInMs, sameSite: 'None', secure: true })
            // console.log(`token : ${token}`)
            console.log("\nUser logged in successfully.\n")
            return res.status(200).json("User logged in !")     //? todo: redirect dashboard
            
        } else {
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            return res.status(400).json("Invalid user  OR  wrong username-password ")
        }
    } catch (e) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        return res.status(500).json({ message: e.message })
    }
}

const register = async (req, res) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    try {
        if (
            req.body.name && req.body.name.length < 20 &&
            req.body.email && emailRegex.test(req.body.email) &&
            req.body.password && req.body.password.length > 6 && req.body.password.length < 20
        ) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await User.create({
                ...req.body,
                password: hashedPassword,
            })
            console.log("User created !!")
            res.status(200).json("User created !")
        }
        else {
            console.log("\nRejected user creation, input criteria not followed !\n")
            return res.status(401).send({ message: "Rejected user creation, input criteria not followed !" })
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.status(200).json({ message: 'Logged out successfully !' })
    } catch (err) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.status(400).json({ message: "Failed to logout !" })
    }
}

const dashboard =  async (req, res) => {
    User.findOne().then(users => res.json(users)).catch( err => res.json(err))
}







module.exports = { register, login, logout , dashboard}