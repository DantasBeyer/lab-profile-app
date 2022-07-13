const express = require("express");
const router = express.Router()
const User = require ("../models/User.model")


//PUT	/api/users	{ image }
router.put ("/", async(req,res,next) => {
    try {
        const id = req.session.currentUser._id;
        const image= req.body;
        const user = await User.findByIdAndUpdate (id,image, {new: true});
        return res.status (200).json(user)
    
    } catch (error) {
        next(error)
    }
});

//GET	/api/users
router.get ("/", async (req,res,next) => {
    try {
        const id = req.sesscion.currentUser._id;
        const user = await User.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        next(error);
    }
})

//POST	/api/upload	form-data with the image file
router.post("/upload", async (req,res,next) => {
    try {
        const {image} = req.body
        await User.create ({image})
        return res.status (200).json(image)
    } catch (error) {
        next (error)
    }
})

module.exports = router




