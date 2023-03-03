const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/User");
const CartHeader = require("../models/CartHeader");
const sendToken = require("../utils/sendToken");

exports.createUser = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;
  const contact = req.body.contact;
  const address = req.body.address;

  const ifUserExist = await User.findOne({
    where: {
      fld_username: username,
    },
  });

  if (ifUserExist) {
    return next(new ErrorHandler("User already exist", 400));
  }

  const hashedpwd = await bcrypt.hash(password, 12);

  // creating new user
  const newUser = await User.create({
    fld_username: username,
    fld_email: email,
    fld_firstname: firstname,
    fld_lastname: lastname,
    fld_password: hashedpwd,
    fld_contact: contact,
    fld_address: address,
  });

  if (!newUser) {
    return next(new ErrorHandler("User not created !!!", 400));
  }

  //creating cart for user
  await CartHeader.create({
    UserFldUserId: newUser.fld_user_id,
  });

  res.status(200).json({
    message: "User created successfully",
  });
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return next(new ErrorHandler("Enter a username or password !!!"));
  }

  const user = await User.findOne({ where: { fld_username: username } });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.fld_password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httponly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.getUser = async (req, res, next) => {
  // console.log(`${req.user.CartHeader.fld_cart_id}`);
  res.status(200).json({
    user: req.user,
  });
};
