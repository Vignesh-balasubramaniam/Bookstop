/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    bookid: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    customerid: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'cart'
  });
};
