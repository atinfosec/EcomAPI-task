const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Comments = sequelize.define(
  "Comment",
  {
    fld_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fld_comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Comments;
