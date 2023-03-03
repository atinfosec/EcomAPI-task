const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.get(
  "/placeorder",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  orderController.placeOrder
);

router.get(
  "/getorderlist",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  orderController.getUserOrders
);

router.post(
  "/getorderdetail",
  isAuthenticatedUser,
  authorizeRoles("customer"),
  orderController.getOrderDetails
);

router.post(
  "/updateorderstatus",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.updateOrderStatus
);

module.exports = router;
