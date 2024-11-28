"use strict"
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel")
const passwordEncrypt = require("../helpers/passwordEncrypt")
// Token 
const Token = require("../models/token")

module.exports = {

    login: async (req, res) => {

        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })

            if (user) {

                if (user.isActive) {

                    /* TOKEN */

                    let tokenData = await Token.findOne({ userId: user._id })
                    console.log("TokenData-->",tokenData)                    

                    if (!tokenData) {
                        tokenData = await Token.create({
                            userId: user._id,
                            token: passwordEncrypt(user._id + Date.now())
                        })
                    }
                    res.status(201).send({
                        error: false,
                        token: tokenData.token,
                        user
                    })
                } else {
                    res.errorStatusCode = 401
                    throw new Error("This user is not active.")
                }
            } else {
                res.errorStatusCode = 401
                throw new Error("Wrong username or password.")
            }

        } else {
            res.errorStatusCode = 401
            throw new Error("Please enter username and password.")
        }

    },

    logout: async (req, res) => {

        const data = req.user ? await Token.deleteOne({ userId: req.user._id }) : null

        res.status(200).send({
            error: false,
            message: 'Logout Success.',
            data
        })
    },
}


// Session

// module.exports = {
    
//     login: async (req, res) => {

//         // console.log(req.body)
//         const {email, password} = req.body

//         if (email && password) {

//             const user = await Personnel.findOne({email})

//             if (user) {

//                 // console.log(user)
//                 if (user.password === passwordEncrypt(password)) {

//                     req.session.id = user._id
//                     req.session.password = user.password

//                     if (req.body.rememberMe == "true") {
//                         req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 2
//                     }

//                     res.status(200).send({
//                         error: false,
//                         message: "Login success",
//                         user
//                     })                    
//                 } else {
//                     res.errorStatusCode = 401
//                     throw new Error("Wrong Email or password!")
//                 }                
//             } else {
//                 res.errorStatusCode = 401
//                 throw new Error("Wrong Email or password!")
//             }

            
//         } else {
//             res.errorStatusCode = 401
//             throw new Error("Email and password required!")
//         }
//     },

//     logout: async (req, res) => {

//         req.session = null
//         res.send({
//             error: false,
//             message: "Logout success"
//         })
//     },



// }
