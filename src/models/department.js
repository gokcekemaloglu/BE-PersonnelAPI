"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const {Schema, model} = require("mongoose")

const DepartmentSchema = new Schema({
    // _id
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    collection: "departments",
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = model("Department", DepartmentSchema)