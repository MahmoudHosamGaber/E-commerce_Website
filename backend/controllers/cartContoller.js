const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Cart = require("../model/cartModel");
const Product = require("../model/productModel");
const CartItem = require("../model/cartItemModel");
const User = require("../model/userModel");

// Create cart utility function
const createCart = asyncHandler(async (id) => {
    return Cart.create({
        userId: id,
        items: new Array(),
    });
});

// @desc    Get all the elements in the cart
// @route   GET /api/cart/
// @access  private
const getCartItems = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await createCart(userId);
    }

    res.json(cart.items);
});

// @desc    Add an item to the cart
// @route   PUT /api/cart/add
// @access  private
//first step is to find the cart
const addItemToCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    // you have to check if the product still exists

    const product = await Product.findOne({
        _id: productId,
        quantityInStock: { $gte: quantity },
    });

    if (!product) {
        res.status(400);
        throw new Error("Product doesn't exist");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await createCart(userId);
    }

    /*
  const productInCart = await cart.items.filter((item) => item.productId !== productId);
   if(!productInCart){
    res.status(400);
    throw new Error("Product already exist in cart");
   };
   */

    if (
        !product.quantityInStock ||
        product.quantityInStock < parseInt(quantity)
    ) {
        res.status(400);
        throw new Error(
            "The quantity requested is greater than the quantity in stock"
        );
    }

    const cartItem = await CartItem.create({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        daysTillDelivery: product.daysTillDelivery,
        image: product.mainImage,
    });

    // If the cart item already exists in the cart update it
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    cart.items.push(cartItem);
    await cart.save();

    res.json(cart.items);
});

// @desc    Remove an item from the cart
// @route   PUT /api/cart/remove
// @access  private
const removeItemFromCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        res.status(400);
        throw new Error(
            "Can't remove a product from a cart that doesn't exist"
        );
    }
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();
    res.json(productId);
});

/**
 * @Desc get user`s cart
 * @route GET /api/cart/:id/user
 * @access Private
 * note: this is a route for the user to see its cart
 * not sure if it is necessary to have this route
 */
const getUserCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        res.status(400);
        throw new Error("Cart doesn't exist");
    }
    res.json(cart);
});


// @desc    Remove an item from the cart
// @route   PUT /api/cart/delete
// @access  private
const deleteCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        res.status(400);
        throw new Error(
            "Can't remove cart items from a cart that doesn't exist"
        );
    }
    cart.items = [];
    await cart.save();
    res.json(cart);
});


module.exports = {
    addItemToCart,
    removeItemFromCart,
    getCartItems,
    getUserCart,
    deleteCart,
};
