const User = require("../models/User");
const Product = require("../models/Product");
const CartHeader = require("../models/CartHeader");

exports.seedUsers = async (req, res) => {
  const Users = require("./Users");
  const created = await User.bulkCreate(Users);
  if (!created) {
    res.status(400).json({
      message: "Users not created!!!",
    });
  }

  const newUserId = created.map((user) => {
    return {
      UserFldUserId: user.fld_user_id,
    };
  });

  // creating cart for new sample users
  await CartHeader.bulkCreate(newUserId);

  res.status(200).json({
    message: "Users created!!!",
  });
};

exports.seedProducts = async (req, res) => {
  const Products = require("./Products");
  const created = await Product.bulkCreate(Products);
  if (!created) {
    res.status(400).json({
      message: "Products not created!!!",
    });
  }

  res.status(200).json({
    message: "Products created!!!",
  });
};
