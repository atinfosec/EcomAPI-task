const CartItems = require("../models/CartItems");
const Comments = require("../models/Comments");
const Product = require("../models/Product");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createProduct = async (req, res, next) => {
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const stock = req.body.stock;

  const newProduct = await Product.create({
    fld_product_name: name,
    fld_product_title: title,
    fld_description: description,
    fld_price: price,
    fld_stock: stock,
  });

  if (!newProduct) {
    return next(new ErrorHandler("Product not created", 400));
  }

  res.status(200).json({
    message: "Product Created successfully",
    product: newProduct,
  });
};

exports.updateProduct = async (req, res, next) => {
  const productid = req.body.productid;
  const name = req.body.name;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const stock = req.body.stock;

  const updatedProduct = await Product.update(
    {
      fld_product_name: name,
      fld_product_title: title,
      fld_description: description,
      fld_price: price,
      fld_stock: stock,
    },
    {
      where: {
        fld_product_id: productid,
      },
    }
  );

  if (!updatedProduct) {
    return next(new ErrorHandler("Product not updated", 400));
  }

  res.status(200).json({
    message: "Product updated successfully",
  });
};

exports.deleteProduct = async (req, res, next) => {
  const productid = req.body.productid;
  const product = await Product.findOne({
    where: { fld_product_id: productid },
  });

  const deletedProduct = await product.destroy();
  if (!deletedProduct) {
    return next(new ErrorHandler("Product not deleted!!!", 400));
  }
  res.status(200).json({
    message: "Product deleted successfully",
  });
};

exports.fetchAllProducts = async (req, res, next) => {
  const products = await Product.findAll();
  if (!products) {
    return next(new ErrorHandler("Products not available", 400));
  }
  res.status(200).json({
    message: "Products fetched",
    products,
  });
};

exports.fetchProductById = async (req, res, next) => {
  const productid = req.params.productid;
  const product = await Product.findByPk(productid, {
    include: [
      {
        model: Comments,
        attributes: ["fld_comment_id", "fld_comment"],
        include: [
          {
            model: User,
            attributes: ["fld_username"],
          },
        ],
      },
    ],
  });

  if (!product) {
    return next(new ErrorHandler("Product not available", 400));
  }
  res.status(200).json({
    message: "Product fetched",
    product,
  });
};

exports.addComment = async (req, res, next) => {
  const productid = req.body.productid;
  const comment = req.body.comment;

  const newComment = await Comments.create({
    fld_comment: comment,
    UserFldUserId: req.user.fld_user_id,
    ProductFldProductId: productid,
  });

  if (!newComment) {
    return next(new ErrorHandler("Comment not added", 400));
  }

  res.status(200).json({
    message: "Comment added",
  });
};

exports.deleteComment = async (req, res, next) => {
  const commentid = req.body.commentid;

  const commentDeleted = await Comments.destroy({
    where: {
      fld_comment_id: commentid,
      UserFldUserId: req.user.fld_user_id,
    },
  });

  if (!commentDeleted) {
    return next(new ErrorHandler("Comment not deleted", 400));
  }

  res.status(200).json({
    message: "Comment deleted",
  });
};

exports.updateComment = async (req, res, next) => {
  const commentid = req.body.commentid;
  const updatedComment = req.body.updatedcomment;

  const newComment = await Comments.update(
    {
      fld_comment: updatedComment,
    },
    {
      where: {
        fld_comment_id: commentid,
        UserFldUserId: req.user.fld_user_id,
      },
    }
  );

  if (!newComment) {
    return next(new ErrorHandler("Comment not updated", 400));
  }

  res.status(200).json({
    message: "Comment updated",
  });
};

exports.addToCart = async (req, res, next) => {
  const productid = req.body.productid;
  let quantity = req.body.quantity;

  const ifProductInCart = await CartItems.findOne({
    where: {
      CartHeaderFldCartId: req.user.CartHeader.fld_cart_id,
      ProductFldProductId: productid,
    },
  });

  if (ifProductInCart) {
    //updating if item already in cart
    quantity += ifProductInCart.fld_quantity;
    ifProductInCart.fld_quantity = quantity;
    await ifProductInCart.save();
  } else {
    const cartItem = await CartItems.create({
      fld_quantity: quantity,
      CartHeaderFldCartId: req.user.CartHeader.fld_cart_id, // logged in user has its own cart ID
      ProductFldProductId: productid,
    });
    if (!cartItem) {
      return next(new ErrorHandler("Item not added to cart", 400));
    }
  }

  res.status(200).json({
    message: "Cart Updated",
  });
};

exports.deleteItemFromCart = async (req, res, next) => {
  const productid = req.body.productid;
  const cartItem = await CartItems.findOne({
    where: {
      CartHeaderFldCartId: req.user.CartHeader.fld_cart_id,
      ProductFldProductId: productid,
    },
  });

  if (!cartItem) {
    return next(new ErrorHandler("Item not present in cart", 400));
  }

  const ifDeleted = await cartItem.destroy();
  if (!ifDeleted) {
    return next(new ErrorHandler("Item not deleted", 400));
  }

  console.log(ifDeleted.toJSON());

  res.status(200).json({
    message: "Item deleted",
  });
};

exports.fetchUserCart = async (req, res, next) => {
  const cartItems = await CartItems.findAll({
    where: {
      CartHeaderFldCartId: req.user.CartHeader.fld_cart_id,
    },
    include: {
      model: Product,
    },
  });

  if (!cartItems) {
    return next(new ErrorHandler("No items in cart", 200));
  }

  res.status(200).json({
    cartItems,
  });
};
