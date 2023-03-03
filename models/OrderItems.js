const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const OrderItems = sequelize.define(
  "OrderItems",
  {
    fld_order_item_id: {
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
    createdAt: true,
    updatedAt: false,
    tableName: "order_items",
  }
);

module.exports = OrderItems;
