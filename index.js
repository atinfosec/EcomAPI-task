require("dotenv").config();
const sequelize = require("./config/dbConnection");
const app = require("./app");
const port = 8000;

// Models
const User = require("./models/User");
const Cart = require("./models/CartHeader");
const Product = require("./models/Product");

sequelize
  .authenticate()
  .then(() => {
    console.log(`DB connection Successful`);
    sequelize
      .sync()
      .then(() => {
        console.log(`Model Synced`);
      })
      .catch((err) => {
        console.log(`Model Not synced!!`);
      });
    app.listen(port, () => {
      console.log(`Web server started on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
