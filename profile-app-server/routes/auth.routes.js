const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated")

router.post("/signup", async (req, res, next) => {
	const { username, password, campus, course } = req.body
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "We need some informations to work with here!" })
	}

	try {
		const foundUser = await User.findOne({ username })
		if (foundUser) {
			return res.status(409).json({ message: "There's another one of you!" })
		}
		const salt = bcrypt.genSaltSync(10)
		const hashedPass = bcrypt.hashSync(password, salt)

		await User.create({
			username,
			password: hashedPass,
      campus,
      course
		})
		return res.status(201).json({ message: "All good" })
	} catch (error) {
		next(error)
	}
})

router.post("/login", async (req, res, next) => {
	const { username, password } = req.body
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "We need some informations to work with here!" })
	}

	try {
		const foundUser = await User.findOne({ username })
		if (!foundUser) {
			return res.status(400).json({ message: "You're not youself." })
		}
		const goodPass = bcrypt.compareSync(password, foundUser.password)

		if (goodPass) {
			const user = foundUser.toObject()
			delete user.password
			const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
				algorithm: "HS256",
				expiresIn: "1d",
			})

			res.status(200).json(authToken)
		} else {
			res.status(400).json({ message: "Did you do some typos ?" })
		}
	} catch (error) {
		next(error)
	}
})

router.put("/user", isAuthenticated, async (req, res, next) => {
	try {
		const { image } = req.body;
	 const images = await User.findByIdAndUpdate(id, { image }, { new: true });
		return res.status(200).json(images)
	} catch (error) {
		next(error)
	}
})
router.get("/verify", isAuthenticated, (req, res) => {
	res.status(200).json(req.payload)
})
router.get("/user", isAuthenticated, (req, res) => {
	res.status(200).json(req.payload)
})




module.exports = router;