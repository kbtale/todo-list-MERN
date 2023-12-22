import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {username, email, password} = req.body
    console.log(req.body)

    const pwdHash = await bcrypt.hash(password, 12)

    try {
        const newUser = new User({
            username,
            email,
            password: pwdHash
        })
        const user = await newUser.save()
        const token = await createAccessToken({id: user._id})
        res.cookie('token', token)
        res.json(user)
    } catch(error) {
        console.log("The user wasn't saved properly: ", error)
        res.status(500).json({message: error.message})
    }

};
export const login = async (req, res) => {
    const {uom, password} = req.body

    try {
        const userLogged = await User.findOne({
            $or: [ {username: uom}, {email: uom}]
        })

        if (!userLogged) return res.status(400).json({message: "User not found"})

        const validated = await bcrypt.compare(password, userLogged.password)

        if (!validated) return res.status(400).json({message: "Wrong password"})

        const token = await createAccessToken({id: userLogged._id})
        res.cookie('token', token)
        console.log(token)
        res.json({user: userLogged, token: token})
        
    } catch(error) {
        console.log("The user wasn't saved properly: ", error)
        res.status(500).json({message: error.message})
    }    
};
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}
export const profile = async (req, res) => {
    const user = await User.findById(req.userId)

    if (!user) return res.status(400).json({Message: "User not found"})

    res.json(user)
}
