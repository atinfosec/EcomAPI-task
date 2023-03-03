const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const OrderItems = require("./OrderItems");

const OrderHeader = sequelize.define(
  "OrderHeader",
  {
    fld_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fld_order_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fld_order_status: {
      type: DataTypes.STRING,
      defaultValue: "Processing",
      validate: {
        isAlpha: true,
        isIn: [["Processing", "Shipped", "Delivered"]],
      },
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    tableName: "order_header",
  }
);

OrderHeader.hasMany(OrderItems);
OrderItems.belongsTo(OrderHeader);

module.exports = OrderHeader;
