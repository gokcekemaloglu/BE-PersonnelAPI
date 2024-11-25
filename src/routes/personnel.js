"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const { list, create, read, update, deletePersonnel } = require('../controllers/personnel')

router.route("/")
    .get(list)
    .post(create)
router.route("/:id")
    .get(read)
    .put(update)
    .patch(update)
    .delete(deletePersonnel)

/* ------------------------------------------------------- */
module.exports = router