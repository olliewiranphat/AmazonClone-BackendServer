const prisma = require('../models')
const createError = require('../utils/createError')
const TryCatch = require('../utils/TryCatch')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { clerkClient } = require('@clerk/express')

/// Check isEamil or isPhonenumber?? : for using find user @Uniqe in data
const checkEmailorPhone = (identity) => {
    let identityKEY = ""
    if (/^[0-9]{10,15}$/.test(identity)) {
        identityKEY = 'phoneNumber'
    }
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identity)) {
        identityKEY = 'email'
    }
    if (!identityKEY) {
        createError(400, 'only email or phone number')
    }
    return identityKEY
}


///// API Register create new User
exports.userRegister = async (req, res, next) => {
    try {
        console.log("req.body", req.body);
        for (const key in req.body) {
            // console.log(key);
            if (!req.body[key]) {
                createError(400, "Please fill all data")
            }
        }

        const identityKEY = checkEmailorPhone(req.body.identity) //email or phoneNumber
        ///// Check Duplicate User:
        const dupUser = await prisma.user.findUnique({
            where: { [identityKEY]: req.body.identity }
        })
        if (dupUser) {
            createError(400, `Already exist this ${identityKEY}`)
        }
        // console.log(identityKEY);
        const { identity, ...userInfo } = req.body
        // console.log('userInfo', userInfo);
        ///// Create new User:
        const newUser = await prisma.user.create({
            data: { [identityKEY]: identity, ...userInfo }
        })
        console.log(newUser);


        res.status(200).json({ status: "SUCCESS", message: "Register already", newUser })
    } catch (error) {
        next(error)
    }
}

////// API Login validate User in DB and Generate TOKEN
exports.userSignin = TryCatch(async (req, res) => {
    console.log('req.body', req.body);
    ///// Check User registered into DB?? :
    const identityKEY = checkEmailorPhone(req.body.identity)
    console.log('identityKEY', identityKEY);
    ///// Find in DB:
    const userData = await prisma.user.findUnique({
        where: { [identityKEY]: req.body.identity }
    })
    if (!userData) {
        createError(404, "Not found User, Please to Register!")
    }
    ///// findRegisterd OK : Generate Token sending to USER
    // console.log('findRegisterd', findRegisterd);
    // console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);

    const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })

    res.status(200).json({ status: "SUCCESS", message: "Login already", token, userData })
})

///// API Update User data : /user/upadte-account
exports.userCreateUpdateDB = TryCatch(async (req, res) => {

    // console.log('req.body', req.body); //get new user data to update
    const { firstName, lastName, email, phoneNumber, birthDay, gender, role, imageUrl } = req.body
    // console.log('role', role);

    // console.log(req.user);
    const { id } = req.user
    console.log('req.user.id', id);
    ///// Add role in User data CLERK names Key  publicMetadata
    await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: { role } // role: value of role from req.body
    })

    const updateUserData = await prisma.user.upsert({
        where: { clerkID: id },
        create: {
            ///// Transform "Date" (req.body) to DateTime Object before using Prisma, Prisma receive only DateTime
            firstName, lastName, email, phoneNumber, birthday: new Date(birthDay), gender, role, clerkID: id, imageUrl
        },
        update: {
            firstName, lastName, email, phoneNumber, birthday: new Date(birthDay), gender, role, imageUrl
        }
    })
    // console.log('updateUserData', updateUserData);

    res.status(200).json({ status: "SUCCESS", message: "Updated already!", updateUserData })
})

exports.userUpdateImageAccount = TryCatch(async (req, res) => {
    const results = await cloudinary.uploader.upload(req.body.images, { // Keep Image files on Cloudinary, in DB just keep URL Link
        folder: "ProductImage",
        public_id: Date.now(),
        resource_type: 'auto'
    })
    res.status(200).json({ message: "SUCCESS, Add Images at Cloudinary!", results }) //send to Frontend
})

exports.deleteUser = TryCatch(async (req, res) => {
    console.log('req.user', req.user); //from authorization
    const { id } = req.user
    ///// Delete User Account at Clerk database :
    await clerkClient.users.deleteUser(id)

    const findUserDB = await prisma.user.findFirst({ where: { clerkID: "12adb" } })
    if (!findUserDB) {
        return res.status(200).json({ status: "SUCCESS", message: "No have user in DB, delete just Clerk" })
    } else {
        // await prisma.user.delete({ where: { clerkID: id } })
    }


    ////// DELETE User at Clerk???
    res.status(200).json({ status: "SUCCESS", message: "Delete already!" })
})


///// API Access Order-History after Login : JOIN User, ProductOnOrder
exports.userOrderHistory = TryCatch(async (req, res) => {
    // console.log('userData', req.user);
    ///// Operation get OrderHistory from DB : table ProductOnOrder ********

    res.status(200).json({ status: "SUCCESS", message: "Access Order-History already!" }) //Send Order-History data back
})


///// API Access Cart USER after Login : JOIN User, ProductOnCart
exports.userCart = TryCatch(async (req, res) => {


    res.status(200).json({ status: "SUCCESS", message: "Access Cart already!" }) //Send Cart data back
})