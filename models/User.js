const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const CartHeader = require("./CartHeader");
const Comments = require("./Comments");
const OrderHeader = require("./OrderHeader");

const User = sequelize.define(
  "User",
  {
    fld_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fld_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    fld_username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    fld_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fld_lastname: {
      type: DataTypes.STRING,
    },
    fld_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fld_contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fld_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fld_role: {
      type: DataTypes.STRING,
      defaultValue: "customer",
      validate: {
        isAlpha: true,
        isIn: [["customer", "admin"]],
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasOne(CartHeader, {
  // User will have only one Cart
  constraints: false,
  onDelete: "CASCADE",
});
CartHeader.belongsTo(User);

User.hasMany(OrderHeader); // User can have many orders
OrderHeader.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);

module.exports = User;
