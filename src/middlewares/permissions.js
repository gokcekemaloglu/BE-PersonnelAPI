"use strict"
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

// Permission Control Middleware:

module.exports = {
    isLogin: (req, res, next) => {
        if (req.user && req.user.isActive) next()
        else {
            res.errorStatusCode = 403
            throw new Error("No permission: You must login.")
        }
    },
    isAdmin: (req, res, next) => {
        // console.log("isAdmin run!")
        if (req.user && req.user.isActive && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error("No permission: You must login and to be an Admin.")
        }
    },
    isAdminOrLead: (req, res, next) => {
        if (req.user && req.user.isActive && (req.user.isAdmin || (req.user.isLead && req.user.departmentId == departmentId))) next()
        else {
            res.errorStatusCode = 403
            throw new Error("No permission: You must login and to be an Admin or a Department Lead (own).")
        }
    }
}

