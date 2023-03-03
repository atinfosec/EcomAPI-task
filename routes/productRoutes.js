const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

router.post(
  "/createproduct",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);

router.post(
  "/updateproduct",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);

router.post(
  "/deleteproduct",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
);

router.get("/products", productController.fetchAllProducts);
router.get("/getproduct/:productid", productController.fetchProductById);
router.post(
  "/addcomment",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  productController.addComment
);

router.post(
  "/updatecomment",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  productController.updateComment
);

router.post(
  "/deletecomment",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  productController.deleteComment
);

router.post(
  "/addtocart",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  productController.addToCart
);

router.get(
  "/getcart",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  productController.fetchUserCart
);

router.post(
  "/deletefromcart",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  productController.deleteItemFromCart
);

module.exports = router;
