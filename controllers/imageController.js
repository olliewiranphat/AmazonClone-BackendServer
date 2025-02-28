const cloudinary = require('../config/cloudinary')
const TryCatch = require("../utils/TryCatch");

exports.addproductImage = TryCatch(async (req, res) => {
    // console.log('req.body', req.body);

    const resPic = await cloudinary.uploader.upload(req.body.productImage, { // Keep Image files on Cloudinary, in DB just keep URL Link
        folder: "ProductImage",
        public_id: Date.now(),
        resource_type: 'auto'
    })
    console.log('resPic', resPic); //Link Images that are kept on Cloudinary
    res.status(200).json({ message: "SUCCESS", results: resPic }) //send to Frontend
})
