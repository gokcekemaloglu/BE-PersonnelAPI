"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Middlewares:
app.use(express.json())
require('express-async-errors')

// Session-Cookies
const session = require('cookie-session');

app.use(session({
    secret: process.env.SECRET_KEY,
}))
/* ------------------------------------------------------- */

// LOGGER

app.use(require("./src/middlewares/logger"))

    /* ------------------------------------------ */

// JSON:
app.use('/documents/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})


// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')

app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true }
}))

// Redoc
const redoc = require('redoc-express')
app.use('/documents/redoc', redoc({ specUrl: '/documents/json', title:'Redoc UI' }))

    /* ------------------------------------------------------- */

// Authentication
app.use(require("./src/middlewares/authentication"))

// Query Handler:
app.use(require('./src/middlewares/queryHandler'))

// DB connection:
require('./src/configs/dbConnection')

/* ------------------------------------------------------- */
// Routes:
app.all('/', (req, res) => {
    res.send({
        message: 'WELCOME TO PERSONNEL API',
        // isLogin: req.session.id ? true : false,
        // session: req.session
        isLogin: req.user ? true : false,
        user: req.user
    })
})

// Auth
app.use("/auth",  require("./src/routes/auth"))
// Token
app.use("/tokens",  require("./src/routes/token"))
// Departments
app.use("/departments", require("./src/routes/department"))
// Personnels
app.use("/personnels", require("./src/routes/personnel"))



// Not Found
app.use('*', (req, res) => {

    res.status(404).send({
        error: true,
        message: "This route is not found !"
    })
})


// Error Handler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
//! Syncronization : Run it only once.
// require('./src/helpers/sync')()
