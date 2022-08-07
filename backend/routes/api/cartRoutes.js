const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  removeItemFromCart,
  getCartItems,
  getUserCart,
  deleteCart,
} = require("../../controllers/cartContoller");
const { verifyAuth } = require("../../middleware/authMiddleware");
/**
 * @desc    Get all the elements in the cart
 * @route   GET /api/cart/
 * @access  private
 */
router.get("/", verifyAuth, getCartItems);
/**
 * @desc    Add an item to the cart
 * @route   PUT /api/cart/add
 *  @access  private
 */
router.put("/add", verifyAuth, addItemToCart);
/**
 * @desc    Remove an item from the cart
 * @route   PUT /api/cart/remove
 * @access  private
 */
router.put("/remove", verifyAuth, removeItemFromCart);

/**
 * @Desc get user`s cart
 * @route GET /api/cart/:id/user
 * @access Private
 * note: this is a route for the user to see its cart
 * not sure if it is necessary to have this route
 */
router.get("/:id/user", verifyAuth, getUserCart);

/**
 * @desc    Delete user's cart
 * @route   PUT /api/cart/delete
 * @access  private
 */
 router.put("/delete", verifyAuth, deleteCart);

module.exports = router;
