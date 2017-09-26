/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    housenumber: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    area: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    pincode: {
      type: DataTypes.INTEGER(7),
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
    tableName: 'address'
  });
};
