const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const CartItems = require("./CartItems");

const CartHeader = sequelize.define(
  "CartHeader",
  {
    fld_cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    tableName: "cart_header",
    timestamps: true,
  }
);

CartHeader.hasMany(CartItems);
CartItems.belongsTo(CartHeader);

module.exports = CartHeader;
