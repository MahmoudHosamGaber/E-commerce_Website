const express = require("express");
const router = express.Router();
const {
  updateUser,
  login,
  register,
  loginUser,
  insertRandomUsers,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

router.get("/login", login);
router.get("/register", register);

router.post("/login", loginUser);
router.post("/randome", insertRandomUsers);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

router.put("/:id", updateUser);
module.exports = router;
