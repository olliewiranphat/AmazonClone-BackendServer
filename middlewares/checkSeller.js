const createError = require("../utils/createError");
const TryCatch = require("../utils/TryCatch");
const jwt = require('jsonwebtoken')
const { clerkClient } = require('@clerk/express')

module.exports = TryCatch(async (req, res, next) => {
    console.log('req.user#ChechSeller', req.user);

    const { publicMetadata: { role } } = req.user
    console.log('role#checkSeller', role);
    if (role !== "SELLER") {
        return createError(401, "Denied, Only Seller pass")
    }


    next() //next to Controller/next MW
})
