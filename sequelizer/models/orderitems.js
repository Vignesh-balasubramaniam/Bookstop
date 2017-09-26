/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderitems', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    customerid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'Id'
      }
    },
    orderid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    bookid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER(2),
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
    tableName: 'orderitems'
  });
};
