const { Router } = require("express");
const router = Router();

const authRoutes = require("./authRoutes");
const messageRoutes = require("./messageRoutes");

router.use(authRoutes);
router.use(messageRoutes);


module.exports = router;
