/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    numberofitems: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    deliveryaddressid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    deliveryphoneno: {
      type: DataTypes.INTEGER(16),
      allowNull: false
    },
    deliverydate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ordereddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalamount: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    modeofpaymet: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
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
    tableName: 'order'
  });
};
