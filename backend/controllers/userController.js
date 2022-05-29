const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../model/userModel");

const { db } = require("../model/userModel");
const res = require("express/lib/response");

const login = asyncHandler(async (req, res) => {
  res.status(200).render("login");
});

const register = asyncHandler(async (req, res) => {
  res.status(200).render("Register");
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  // res.json({up:user.password, p: password, res: (await bcrypt.compare(password, user.password))})
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// user logout
const logouUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/')
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  let { username, newPassword, password, email } = req.body;

  if (!username && !newPassword && !password && !email) {
    res.status(400);
    throw new Error("No fields to update");
  }

  if (username) {
    let updatedUser = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else if (email) {
    if (user.password === password) {
      let updatedUser = await User.findByIdAndUpdate(
        id,
        { email },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(400);
      throw new Error("Wrong password");
    }
  } else if (newPassword) {
    if (user.password === password) {
      let updatedUser = await User.findByIdAndUpdate(
        id,
        {
          password: newPassword,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(400);
      throw new Error("Wrong Password");
    }
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id, function (err) {
    if (err) {
      res.json({ msg: err });
    } else {
      res.json({ msg: "Successful deletion" });
    }
  });
});

function randomStr(len, arr) {
  var ans = "";
  for (var i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
}

module.exports = {
  updateUser,
  login,
  register,
  loginUser,
  // insertRandomUsers,
  // getAllUsers,
  deleteUser,
  logouUser
};
/**
 * Delete these functions
 * 
 const getAllUsers = (req, res) => {
  User.find({}, function (err, users) {
    var userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.json(userMap);
  });
};
const insertRandomUsers = async (req, res) => {
  //generating users for testing purpose

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("aaa", salt);

  for (let i = 0; i < 5; i++) {
    const name = randomStr(4, "abcdefghijklmnopqrstuvwxyz");
    await User.create({
      username: `${name}${i}`,
      email: `${name}${i}@email.com`,
      password: hashedPassword,
    });
  }
  res.json({ msg: "done" });
};
 */