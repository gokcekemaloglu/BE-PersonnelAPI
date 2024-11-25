"use strict"

const passwordEncrypt = require("../helpers/passwordEncrypt")
const Personnel = require("../models/personnel")

/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

module.exports = {
    
    login: async (req, res) => {

        // console.log(req.body)
        const {email, password} = req.body

        if (email && password) {

            const user = await Personnel.findOne({email})

            if (user) {

                // console.log(user)
                if (user.password === passwordEncrypt(password)) {

                    req.session.id = user._id
                    req.session.password = user.password

                    if (req.body.rememberMe == "true") {
                        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 2
                    }

                    res.status(200).send({
                        error: false,
                        message: "Login success",
                        user
                    })                    
                } else {
                    res.errorStatusCode = 401
                    throw new Error("Wrong Email or password!")
                }                
            } else {
                res.errorStatusCode = 401
                throw new Error("Wrong Email or password!")
            }

            
        } else {
            res.errorStatusCode = 401
            throw new Error("Email and password required!")
        }
    },

    logout: async (req, res) => {

        req.session = null
        res.send({
            error: false,
            message: "Logout success"
        })
    },



}
