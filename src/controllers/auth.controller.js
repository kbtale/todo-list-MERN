import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json({ message: "The email is already in use" });

        const pwdHash = await bcrypt.hash(password, 12)

        const newUser = new User({
            username,
            email,
            password: pwdHash
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})
        
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false
        })

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })
    } catch(error) {
        res.status(500).json({message: error.message})
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).json({message: "User not found"})

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({message: "Incorrect password"})

        const token = await createAccessToken({id: userFound._id})
        
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false
        })

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
        
    } catch(error) {
        res.status(500).json({message: error.message})
    }    
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Token is not valid" });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "User not found" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.userId)
    if (!userFound) return res.status(400).json({message: "User not found"})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}
