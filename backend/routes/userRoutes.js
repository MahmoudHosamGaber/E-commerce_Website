const express = require("express");
const router = express.Router();
const { updateUser, login, register} = require("../controllers/userController");

router.get('/login', login)
router.get('/register', register)

router.put("/:id", updateUser);
module.exports = router;
