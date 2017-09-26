/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(15),
      allowNull: false
    },
    addressid: {
      type: DataTypes.CHAR(36),
      allowNull: true
    },
    phoneno: {
      type: DataTypes.INTEGER(16),
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
    tableName: 'customer'
  });
};
