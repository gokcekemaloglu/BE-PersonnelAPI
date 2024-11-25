"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel")

module.exports = {
    list: async (req, res) => {

        const result = await res.getModelList(Personnel)

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Personnel),
            result
        })
    },
    create: async (req, res) => {
        const result = await Personnel.create(req.body)
        res.status(201).send({
            error: false,
            result
        })
    },
    read: async (req, res) => {
        // console.log(req.params)
        
        const result = await Personnel.findById(req.params.id)
        res.status(200).send({
            error: false,
            result
        })
    },
    update: async (req, res) => {
        const result = await Personnel.updateOne({_id: req.params.id}, req.body, {runValidators: true})
        res.status(202).send({
            error: false,
            new: await Personnel.findById(req.params.id),
            result
        })
    },
    deletePersonnel: async (req, res) => {
        const result = await Personnel.deleteOne({_id: req.params.id})
        // console.log(result)
        
        res.status(result.deletedCount ? 204 : 404).send({
            error: !(result.deletedCount),
            result
        })
    },
}
