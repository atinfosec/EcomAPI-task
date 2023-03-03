const CartItems = require("../models/CartItems");
const OrderHeader = require("../models/OrderHeader");
const OrderItems = require("../models/OrderItems");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");

exports.placeOrder = async (req, res) => {
  const cartItems = await CartItems.findAll({
    where: {
      CartHeaderFldCartId: req.user.CartHeader.fld_cart_id,
    },
    include: {
      model: Product,
    },
    attributes: ["fld_quantity", "ProductFldProductId"],
  }); // fetching items in user's cart

  if (!cartItems) {
    return next(new ErrorHandler("Cart is empty", 400));
  }

  let totalOrderAmount = 0;
  cartItems.map((item) => {
    totalOrderAmount += item.fld_quantity * item.Product.fld_price;
  }); // calculating total order amount

  if (true) {
    // after payment has been done
    const newOrder = await OrderHeader.create({
      fld_order_amount: totalOrderAmount,
      UserFldUserId: req.user.fld_user_id,
    });

    if (!newOrder) {
      return next(new ErrorHandler("Order not placed"));
    }

    const orderItemArray = cartItems.map((item) => {
      return {
        OrderHeaderFldOrderId: newOrder.fld_order_id,
        ProductFldProductId: item.ProductFldProductId,
        fld_quantity: item.fld_quantity,
      };
    });

    // pushing user's cart items to order items
    await OrderItems.bulkCreate(orderItemArray);
    await CartItems.destroy({
      where: {
        CartHeaderFldCartId: req.user.CartHeader.fld_cart_id,
      },
    }); // making cart empty

    res.status(200).json({
      message: "Order placed successfully",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  const orders = await OrderHeader.findAll({
    where: {
      UserFldUserId: req.user.fld_user_id,
    },
    attributes: ["fld_order_id", "fld_order_amount"],
  });

  if (!orders) {
    return next(new ErrorHandler("No orders placed by you", 200));
  }

  res.status(200).json({
    orders,
  });
};

exports.getOrderDetails = async (req, res) => {
  const orderid = req.body.orderid;
  const orderDetail = await OrderHeader.findAll({
    where: {
      UserFldUserId: req.user.fld_user_id,
      fld_order_id: orderid,
    },
    include: {
      model: OrderItems,
      include: {
        model: Product,
      },
    },
  });

  if (!orderDetail) {
    return next(new ErrorHandler("No items placed with this order id", 400));
  }

  res.status(200).json({
    orderdetail: orderDetail,
  });
};

exports.updateOrderStatus = async (req, res, next) => {
  const orderid = req.body.orderid;
  const status = req.body.orderstatus;

  try {
    const statusUpdated = await OrderHeader.update(
      {
        fld_order_status: status,
      },
      {
        where: {
          fld_order_id: orderid,
        },
      }
    );
  } catch (e) {
    return next(new ErrorHandler("Input valid values", 403));
  }

  res.status(200).json({
    message: "Order status updated successfully",
  });
};
