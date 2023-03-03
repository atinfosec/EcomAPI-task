const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const CartItems = require("./CartItems");
const OrderItems = require("./OrderItems");
const Comments = require("./Comments");

const Product = sequelize.define(
  "Product",
  {
    fld_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fld_product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fld_product_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fld_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fld_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fld_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Product.hasMany(CartItems);
CartItems.belongsTo(Product);

Product.hasMany(OrderItems);
OrderItems.belongsTo(Product);

Product.hasMany(Comments);
Comments.belongsTo(Product);

module.exports = Product;
