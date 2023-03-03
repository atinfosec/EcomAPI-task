const jwt = require("jsonwebtoken");

module.exports = function (user, res) {
  const token = jwt.sign(
    {
      username: user.fld_username,
      user_id: user.fld_user_id,
      role: user.fld_role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 1000),
    httponly: true,
  };

  res.status(200).cookie("token", token, options).json({
    message: "Successfully logged in",
    username: user.fld_username,
    token,
  });
};
