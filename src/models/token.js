"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const {Schema, model} = require("mongoose")

const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Personnel",
        required: true,
        index: true
    },
    token: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    }
}, {
    collection: "tokens",
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = model("Token", TokenSchema)