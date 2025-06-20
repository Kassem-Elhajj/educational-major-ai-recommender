const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try{
        const {username, hashed_password} = req.body

        if(!username || !hashed_password)
            return res.json({status: 'failed', message: 'All fields are required!'})

        existinguserName = await User.findOne({
            where : {
                username : username
            }
        })

        if(hashed_password.length < 8)
            return res.json({status: 'failed', message: 'hashed_password should be greater or equal to 8'})

        if(existinguserName)
            return res.json({status: 'failed', message: 'username is unvalid!'})

        const salt = await bcrypt.genSalt(10)
        const hashed_hashedPassword = await bcrypt.hash(hashed_password, salt)

        const user = await User.create({
            username: username,
            hashed_password: hashed_hashedPassword
        })

        const jwtSecretKey = process.env.jwtSecretKey

        const data = {
            time : Date(),
            userId: user.id
        }

        const token = jwt.sign(data, jwtSecretKey)

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,  // Set to true if using HTTPS
            maxAge: 60 * 60 * 1000 // 1 hour expiry
        });

        res.json({status: 'ok', message: `User has been created with a username ${user.username}`, token: token})

    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

const verifyUser = async (req, res) => {
    try{
        const jwtSecretKey = process.env.jwtSecretKey

        const token = req.cookies.jwt;

        if (!token) {
            return res.json({ status: 'failed', message: 'Access denied: No token provided' });
        }

        jwt.verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                return res.json({ status: 'failed', message: 'Invalid or expired token' });
        }

        res.json({status: 'ok', token : decoded})

    });

    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

const login = async (req, res) => {
    try{
        const {username, hashed_password} = req.body

        if(!username || !hashed_password)
            return res.json({status: 'failed', message: 'all fields are required!'})

        existingUser = await User.findOne({where: {username}})

        if(!existingUser)
            return res.json({status: 'failed', message: 'User doesnt exist!'})

        hashed_isPasswordCorrect = await bcrypt.compare(hashed_password, existingUser.hashed_password)
        if(!hashed_isPasswordCorrect)
            return res.json({status: 'failed', message: 'hashed_password is wrong!'})


        const jwtSecretKey = process.env.jwtSecretKey

        const data = {
            time : Date(),
            userId: existingUser.id
        }

        const token = jwt.sign(data, jwtSecretKey)

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,  // Set to true if using HTTPS
            maxAge: 60 * 60 * 1000 // 1 hour expiry
        });

        res.json({ status: 'ok', message: 'Logged in successfully', token: token });
    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

const logout = async (req, res) => {
    try{
        userInfo = req.user     //From the middleware
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })

        res.json({status: 'ok', message: 'user has logout', userInfo: userInfo})
    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = parseInt(req.params.id)
        const userIdFromToken = req.user.userId        //From the middleware

        if(userId !== userIdFromToken)
            return res.json({status: 'failed', message: 'you dont have the authorization to delete this account'})

        const user = await User.findByPk(userId)
        if(!user)
            return res.json({status: 'failed', message: 'user does not exist!'})

        await User.destroy({ where: {id : userId} })

        res.cookie('jwt', '', {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })

        res.json({status: 'ok', message: `user with username ${user.username} has been deleted!`})

    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

module.exports = {
    register,
    verifyUser,
    login,
    logout,
    deleteUser
}