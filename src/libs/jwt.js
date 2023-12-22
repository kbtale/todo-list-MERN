import {SKEY} from '../config.js'
import jwt from 'jsonwebtoken'

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            SKEY,
            {
                expiresIn: "1d"
            },
            (error, token) => {
                if(error){
                    reject(error)
                    console.log("failed")
                }
                
                console.log("Token created successfully: ", token)
                resolve(token)
            }
        )
    })
    
}