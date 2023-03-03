const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const CartItems = sequelize.define(
  "CartItems",
  {
    fld_cart_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fld_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "cart_items",
  }
);

module.exports = CartItems;
