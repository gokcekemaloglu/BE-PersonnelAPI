"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department = require("../models/department")


module.exports = {
    list: async (req, res) => {
        /*
        #swagger.tags = ["Departments"]
        #swagger.summary = "List Departments"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
        */

        const result = await res.getModelList(Department)

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Department),
            result
        })
    },
    create: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Create Department"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department'
                }
            }
        */
        const result = await Department.create(req.body)
        res.status(201).send({
            error: false,
            result
        })
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ["Departments"]
            #swagger.summary = "Get Single Department"
        */
        // console.log(req.params)
        
        const result = await Department.findById(req.params.id)
        res.status(200).send({
            error: false,
            result
        })
    },
    update: async (req, res) => {
        /*
        #swagger.tags = ["Departments"]
        #swagger.summary = "Update Department"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Department'
            }
        }
        */
        const result = await Department.updateOne({_id: req.params.id}, req.body, {runValidators: true})
        res.status(202).send({
            error: false,
            new: await Department.findById(req.params.id),
            result
        })
    },
    deleteDepartment: async (req, res) => {
        /*
        #swagger.tags = ["Departments"]
        #swagger.summary = "Delete Department"
        */
        const result = await Department.deleteOne({_id: req.params.id})
        // console.log(result)
        
        res.status(result.deletedCount ? 204 : 404).send({
            error: !(result.deletedCount),
            result
        })
    },
    personnels: async (req, res) => {
        /*
        #swagger.tags = ["Departments"]
        #swagger.summary = "Get Personnels of Department"
        */
        const Personnel = require("../models/personnel")
        // const result = await Personnel.find({departmentId: req.params.id}).populate("departmentId")
        const result = await res.getModelList(Personnel, {departmentId: req.params.id}, "departmentId")
        res.status(202).send({
            error: false,
            // detail: await res.getModelListDetails(Personnel),
            result
        })
    }

}
