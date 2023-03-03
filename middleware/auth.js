const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CartHeader = require("../models/CartHeader");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findOne({
    where: { fld_user_id: decodedData.user_id },
    attributes: { exclude: ["fld_password"] },
    include: {
      model: CartHeader,
      attributes: ["fld_cart_id"],
    },
  });
  next();
};

exports.authorizeRoles = (checkRole) => {
  return (req, res, next) => {
    if (req.user.fld_role !== checkRole) {
      return next(new ErrorHandler("You are not authorized", 403));
    }
    next();
  };
};
