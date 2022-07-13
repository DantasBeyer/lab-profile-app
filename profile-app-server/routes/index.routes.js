const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require ("./auth.routes")
router.use("/auth", authRoutes)

const usersRoutes = require ("./users.routes")
router.use("/users", usersRoutes)


module.exports = router;
