const router = require("express").Router()
const async = require("hbs/lib/async")
const User = require ("../models/User.model")

router.post ("/signup", async (req,res,next) => {
    const {username,password,campus,course} = req.body
        if (!username || !password) {
            return res
                .status(400)
                .json ({message: "username and password are incorrect"})
        }
        try {
            const foundUser = await User.findOne({username})
            if(foundUser) {
                return res.status(409).json ({message: "this username already exists"})
            }
            const hashedPass = bcrypt.hashSync(password, salt)
            const salt = bcrypt.hashSync(password,salt)

            await User.create({
                username,
                password: hashedPass,
                campus,
                course
            })

            return res.status (201).json ({message: "Signup successful"})    
        } catch (error) {
            next(error)
        }
});

router.post ("/login", async (req,res,next) =>{
    const {username,password} = req.body
    if(!username || !password) {
        return res
            .status (400)
            .json ({message: "username and password are incorrect"})
    }
    try {
        const foundUser = await User.findOne({username})
            if (!foundUser){
                return res.status (400).json({message: "There's no user with that username"})
            }
        } catch (error) {
            next(error)
        }
    
})

module.export = router
