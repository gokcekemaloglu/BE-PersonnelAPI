"use strict"
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const { list, create, read, update, deleteDepartment, personnels } = require('../controllers/department')

router.route("/")
    .get(list)
    .post(create)
router.route("/:id")
    .get(read)
    .put(update)
    .patch(update)
    .delete(deleteDepartment)

router.get("/:id/personnels", personnels)
/* ------------------------------------------------------- */
module.exports = router